import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const MASTER_PATH = path.join(ROOT, 'data', 'nucesBooks.local.json');
const FOLDER_DIR = path.join(ROOT, 'data', 'books');

function readJson(p) {
  try {
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    console.error('Failed to read JSON', p, e.message);
  }
  return null;
}

function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

function normalizeDriveLink(u) {
  if (!u) return '';
  try {
    const outer = new URL(u);
    if (outer.hostname.includes('google.') && outer.pathname.startsWith('/search')) {
      const inner = outer.searchParams.get('q');
      if (inner) return inner;
    }
  } catch {}
  return u;
}

function mapFolderItem(obj) {
  if (!obj || typeof obj !== 'object') return null;
  const title = (obj.title || '').trim();
  const driveUrl = normalizeDriveLink(obj.driveUrl || obj.link || '');
  if (!title || !driveUrl) return null;
  return {
    title,
    author: obj.author || undefined,
    driveUrl,
    category: obj.category || undefined,
    description: obj.description || undefined,
    cover: obj.cover || undefined,
  };
}

function asArray(x) {
  return Array.isArray(x) ? x : [];
}

(function main() {
  const master = readJson(MASTER_PATH);
  if (!master) {
    console.error('Master file not found:', MASTER_PATH);
    process.exit(1);
  }
  let raw = [];
  let cmsItems = [];
  if (Array.isArray(master)) {
    // legacy format -> wrap
    raw = master;
    cmsItems = [];
  } else if (master && typeof master === 'object') {
    raw = asArray(master.raw);
    cmsItems = asArray(master.cmsItems);
  }

  const existingMap = new Map();
  for (const it of cmsItems) {
    const key = normalizeDriveLink(it?.driveUrl || it?.link || '');
    if (!key) continue;
    existingMap.set(key, { ...it });
  }

  const entries = fs.existsSync(FOLDER_DIR)
    ? fs.readdirSync(FOLDER_DIR, { withFileTypes: true }).filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.json'))
    : [];

  let added = 0;
  let updated = 0;
  for (const e of entries) {
    const p = path.join(FOLDER_DIR, e.name);
    const obj = readJson(p);
    const mapped = mapFolderItem(obj);
    if (!mapped) continue;
    const key = normalizeDriveLink(mapped.driveUrl);
    if (!existingMap.has(key)) {
      existingMap.set(key, mapped);
      added += 1;
    } else {
      const current = existingMap.get(key);
      const merged = {
        driveUrl: key,
        title: current.title || mapped.title,
        author: current.author || mapped.author,
        category: current.category || mapped.category,
        description: current.description || mapped.description,
        cover: current.cover || mapped.cover,
      };
      // detect meaningful change
      const changed = ['title','author','category','description','cover'].some((f) => (current?.[f] || '') !== (merged?.[f] || ''));
      if (changed) updated += 1;
      existingMap.set(key, merged);
    }
  }

  const newCmsItems = Array.from(existingMap.values()).sort((a, b) => String(a.title||'').localeCompare(String(b.title||'')));
  const out = { raw, cmsItems: newCmsItems };
  writeJson(MASTER_PATH, out);

  console.log(`Migration complete. Added: ${added}, updated: ${updated}, total cmsItems: ${newCmsItems.length}`);
})();
