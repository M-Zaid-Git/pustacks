import https from 'https';
import fs from 'fs';
import path from 'path';
// import vm from 'vm'; // NO LONGER NEEDED
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Book from '../models/Book.js';

dotenv.config();

// 🌟 FIX A: Use the RAW URL for your file and add the cache-buster 🌟
const FILE_TO_READ = 'data/nucesBooks.local.json';
const REPO_OWNER = 'M-Zaid-Git';
const REPO_NAME = 'pustacks';
const REPO_BRANCH = 'main';

// Generate a unique timestamp to force GitHub's CDN to get the latest file
const CACHE_BUSTER = new Date().getTime();
const RAW_URL_BASE = 'https://raw.githubusercontent.com/M-Zaid-Git/pustacks/main/data/nucesBooks.local.json';
const RAW_URL = `${RAW_URL_BASE}?v=${CACHE_BUSTER}`; 

const LOCAL_FALLBACK = process.env.NUCES_LOCAL_PATH || path.resolve(path.dirname(new URL(import.meta.url).pathname), './nucesBooks.local.json');

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch ${url} - status ${res.statusCode}`));
          res.resume();
          return;
        }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

// ⚠️ DELETED: The 'extractArray' function is no longer needed 
//             because we are reading a JSON file directly.

function pickBestLink(item) {
  return item.downloadLink || item.solutionLink || item.solutionLink2 || '';
}

function normalizeCategory(item) {
  const cats = item?.volumeInfo?.categories;
  if (Array.isArray(cats) && cats.length) return String(cats[0]);
  return 'General';
}

async function run() {
  let raw;
  try {
    console.log('🔎 Fetching updated books from YOUR repo...');
    
    const text = await fetchText(RAW_URL);
    // 🌟 New: Directly parse the content as JSON 
    raw = JSON.parse(text); 
    
  } catch (e) {
    console.warn('🌐 Remote fetch failed, falling back to local dataset:', e.message);
    if (!fs.existsSync(LOCAL_FALLBACK)) {
      throw new Error(`Local fallback not found at ${LOCAL_FALLBACK}. Set NUCES_LOCAL_PATH or create the file.`);
    }
    const text = fs.readFileSync(LOCAL_FALLBACK, 'utf8');
    raw = JSON.parse(text);
  }
  
  // Ensure we have an array, even if empty
  if (!Array.isArray(raw)) {
      console.error("Fetched data is not an array, defaulting to empty list.");
      raw = [];
  }
  
  const mapped = raw
    .map((it) => {
      const title = it?.volumeInfo?.title?.trim();
      const link = pickBestLink(it);
      if (!title || !link) return null;
      return {
        title,
        description: it?.volumeInfo?.description || 'No description provided.',
        category: normalizeCategory(it),
        driveUrl: link,
      };
    })
    .filter(Boolean);

  console.log(`📚 Parsed ${mapped.length} items; connecting to database...`);
  await connectDB();

  let upserts = 0;
  for (const b of mapped) {
    const filter = { title: b.title, driveUrl: b.driveUrl };
    const update = { $setOnInsert: { createdAt: new Date() }, $set: { description: b.description, category: b.category } };
    const options = { upsert: true, new: true };
    await Book.findOneAndUpdate(filter, update, options);
    upserts += 1;
  }
  console.log(`✅ Imported or updated ${upserts} books.`);
  process.exit(0);
}

run().catch((err) => {
  console.error('❌ Import failed:', err);
  process.exit(1);
});
