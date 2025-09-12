import https from 'https';
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Book from '../models/Book.js';

dotenv.config();

const RAW_URL = 'https://raw.githubusercontent.com/iMuhammadWali/Book-Finding-App/main/data/nucesBooks.js';
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

function extractArray(jsCode) {
  // Replace ESM export with global assignment so we can eval in a sandbox
  const code = jsCode.replace(/export\s+default\s+NUCES_Books\s*;/, 'globalThis.NUCES_Books = NUCES_Books;');
  const sandbox = { globalThis: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { timeout: 2000 });
  const arr = sandbox.globalThis.NUCES_Books;
  if (!Array.isArray(arr)) throw new Error('NUCES_Books not found in fetched code');
  return arr;
}

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
    console.log('🔎 Fetching NUCES books from external repo...');
    const js = await fetchText(RAW_URL);
    raw = extractArray(js);
  } catch (e) {
    console.warn('🌐 Remote fetch failed, falling back to local dataset:', e.message);
    if (!fs.existsSync(LOCAL_FALLBACK)) {
      throw new Error(`Local fallback not found at ${LOCAL_FALLBACK}. Set NUCES_LOCAL_PATH or create the file.`);
    }
    const text = fs.readFileSync(LOCAL_FALLBACK, 'utf8');
    raw = JSON.parse(text);
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
