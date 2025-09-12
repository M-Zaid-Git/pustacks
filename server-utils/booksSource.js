import https from 'https';
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

// Using local dataset exclusively per project requirement
// const RAW_URL = 'https://raw.githubusercontent.com/iMuhammadWali/Book-Finding-App/main/data/nucesBooks.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FALLBACK_JSON = path.resolve(__dirname, '../data/nucesBooks.local.json');
const CUSTOM_JSON = path.resolve(__dirname, '../data/customBooks.json');
const CMS_BOOKS_DIR = path.resolve(__dirname, '../data/books');

let CACHE = { ts: 0, data: [] };
const TTL_MS = 30 * 1000; // 30 seconds for quicker updates

// Subject classification based on title keywords
const SUBJECTS = [
  { label: 'Programming Fundamentals', keys: [/programming fundamentals/i, /how to program/i, /c\+\+/i, /deitel/i] },
  { label: 'Computer Networks', keys: [/computer networks?/i, /data communications?/i, /networking/i] },
  { label: 'Applied Physics', keys: [/applied physics/i, /fundamentals of physics/i, /physics/i] },
  { label: 'OOPs', keys: [/object[- ]?oriented/i, /\boop\b/i, /c\+\+/i, /java/i] },
  { label: 'Ideology & Constitution of Pakistan', keys: [/ideology/i, /constitution of pakistan/i, /pakistan studies/i] },
  { label: "Qur'an", keys: [/qur'?an/i, /quran/i] },
  { label: 'DLD', keys: [/digital logic/i, /logics? and computer design/i, /dld/i] },
  { label: 'ICT', keys: [/information and communication technology/i, /\bict\b/i] },
  { label: 'Operating Systems', keys: [/operating systems?/i] },
  { label: 'Discrete Mathematics', keys: [/discrete mathematics?/i] },
  { label: 'Calculus', keys: [/calculus/i] },
  { label: 'Linear Algebra', keys: [/linear algebra/i] },
  { label: 'Probability & Statistics', keys: [/probability/i, /statistics/i] },
  { label: 'Database Systems', keys: [/database systems?/i] },
];

function classifySubject(title) {
  if (!title) return null;
  for (const s of SUBJECTS) {
    if (s.keys.some((rx) => rx.test(title))) return s.label;
  }
  return null;
}

// Remote fetch disabled; operating from local JSON only.

function normalizeCover(possibleUrl) {
  if (!possibleUrl || typeof possibleUrl !== 'string') return '';
  // Ignore relative thumbnails like "/defaultNucesCover.png" that won't exist here
  if (possibleUrl.startsWith('/')) return '';
  return possibleUrl;
}

function normalizeDriveShareLink(possibleUrl) {
  if (!possibleUrl) return '';
  try {
    // If it's a Google search URL containing the target in q=...
    const outer = new URL(possibleUrl);
    if (outer.hostname.includes('google.') && outer.pathname.startsWith('/search')) {
      const inner = outer.searchParams.get('q');
      if (inner) return inner;
    }
  } catch {}
  return possibleUrl;
}

function idFromUrl(url) {
  try {
    return crypto.createHash('sha1').update(String(url)).digest('hex');
  } catch {
    return 'id_' + encodeURIComponent(String(url || ''));
  }
}

function mapItem(it, source = 'remote') {
  const title = it?.volumeInfo?.title?.trim();
  const description = it?.volumeInfo?.description || 'No description provided.';
  const categories = Array.isArray(it?.volumeInfo?.categories) ? it.volumeInfo.categories : [];
  const detected = classifySubject(title);
  const category = detected || (categories.length ? String(categories[0]) : 'General');
  const rawUrl = it.downloadLink || it.solutionLink || it.solutionLink2 || '';
  const driveUrl = normalizeDriveShareLink(rawUrl);
  if (!title || !driveUrl) return null;
  const author = it.author || it?.volumeInfo?.authors?.[0] || undefined;
  const cover = normalizeCover(it?.volumeInfo?.imageLinks?.thumbnail || it?.thumbnail);
  return { _id: idFromUrl(driveUrl), title, description, category, driveUrl, author, cover, source };
}

function readJsonSafe(p) {
  try {
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    }
    return null;
  } catch {
    return null;
  }
}

function readAllJsonInDir(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) return [];
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const files = entries.filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.json'));
    const items = [];
    for (const f of files) {
      const full = path.join(dirPath, f.name);
      try {
        const obj = JSON.parse(fs.readFileSync(full, 'utf8'));
        if (obj && typeof obj === 'object') items.push(obj);
      } catch {}
    }
    return items;
  } catch {
    return [];
  }
}

function dedupeBooks(list) {
  const seen = new Set();
  const result = [];
  for (const b of list) {
    const key = (b.driveUrl || '') + '|' + (b.title || '');
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(b);
  }
  return result;
}

export async function getBooksFromSource() {
  const now = Date.now();
  if (CACHE.data.length && now - CACHE.ts < TTL_MS) {
    return CACHE.data;
  }

  // Local JSON only
  const text = fs.readFileSync(FALLBACK_JSON, 'utf8');
  const raw = JSON.parse(text);
  const mappedLocal = raw.map((x) => mapItem(x, 'local')).filter(Boolean);
  const custom = readJsonSafe(CUSTOM_JSON) || [];
  const cmsItems = readAllJsonInDir(CMS_BOOKS_DIR);
  const mappedCustom = custom
    .map((c) => ({
      _id: idFromUrl(normalizeDriveShareLink(c.link || c.driveUrl)),
      title: c.title?.trim(),
      author: c.author,
      driveUrl: normalizeDriveShareLink(c.link || c.driveUrl),
      description: c.description || 'Added resource',
      category: classifySubject(c.title) || c.category || 'General',
      cover: normalizeCover(c.cover),
      source: 'custom',
    }))
    .filter((b) => b.title && b.driveUrl);
  const mappedCms = cmsItems
    .map((c) => ({
      _id: idFromUrl(normalizeDriveShareLink(c.driveUrl || c.link)),
      title: c.title?.trim(),
      author: c.author,
      driveUrl: normalizeDriveShareLink(c.driveUrl || c.link),
      description: c.description || 'CMS resource',
      category: classifySubject(c.title) || c.category || 'General',
      cover: normalizeCover(c.cover),
      source: 'cms',
    }))
    .filter((b) => b.title && b.driveUrl);

  const merged = dedupeBooks([...mappedLocal, ...mappedCustom, ...mappedCms]);
  CACHE = { ts: now, data: merged };
  return merged;
      // If fallback also fails, bubble up the original error
      throw e;
    }
  }
}
