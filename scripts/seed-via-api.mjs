import fs from 'fs';
import path from 'path';

const ADMIN_KEY = process.env.ADMIN_PASSWORD || process.env.ADMIN_KEY;
const API_URL = process.env.API_URL || 'http://localhost:5000/api/books';
const DATA_PATH = process.env.NUCES_LOCAL_PATH || path.resolve(path.dirname(new URL(import.meta.url).pathname), './nucesBooks.local.json');

if (!ADMIN_KEY) {
  console.error('❌ ADMIN_PASSWORD (or ADMIN_KEY) env variable is required to seed via API.');
  process.exit(1);
}

if (!fs.existsSync(DATA_PATH)) {
  console.error(`❌ Data file not found at ${DATA_PATH}. Set NUCES_LOCAL_PATH to override.`);
  process.exit(1);
}

const items = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

async function postJson(url, data) {
  const u = new URL(url);
  const isHttps = u.protocol === 'https:';
  const mod = isHttps ? await import('https') : await import('http');
  const body = JSON.stringify(data);
  const options = {
    hostname: u.hostname,
    port: u.port || (isHttps ? 443 : 80),
    path: u.pathname + (u.search || ''),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      'x-admin-key': ADMIN_KEY,
    },
  };
  return new Promise((resolve, reject) => {
    const req = mod.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, data });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function toBook(item) {
  const title = item?.volumeInfo?.title?.trim();
  const description = item?.volumeInfo?.description || 'No description provided.';
  const category = Array.isArray(item?.volumeInfo?.categories) && item.volumeInfo.categories.length
    ? String(item.volumeInfo.categories[0])
    : 'General';
  const driveUrl = item.downloadLink || item.solutionLink || item.solutionLink2 || '';
  if (!title || !driveUrl) return null;
  return { title, description, category, driveUrl };
}

(async () => {
  const mapped = items.map(toBook).filter(Boolean);
  console.log(`🚀 Seeding ${mapped.length} books via API -> ${API_URL}`);
  let ok = 0, fail = 0;
  for (const b of mapped) {
    try {
      await postJson(API_URL, b);
      ok++;
    } catch (e) {
      fail++;
      console.error('Seed failed for', b.title, e.message);
    }
  }
  console.log(`✅ Done. Success: ${ok}, Failed: ${fail}`);
  process.exit(fail ? 1 : 0);
})().catch((e) => {
  console.error('Unexpected error:', e);
  process.exit(1);
});
