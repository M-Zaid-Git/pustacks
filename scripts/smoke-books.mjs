import { getBooksFromSource } from '../server-utils/booksSource.js';

const force = process.argv.includes('--force');

try {
  const books = await getBooksFromSource(force);
  const total = books.length;
  const bySource = books.reduce((acc, b) => {
    acc[b.source] = (acc[b.source] || 0) + 1;
    return acc;
  }, {});
  const sample = books.slice(0, 5).map((b) => ({ title: b.title, category: b.category, source: b.source, driveUrl: b.driveUrl }));
  const cmsSample = books
    .filter((b) => String(b.source || '').includes('cms'))
    .slice(0, 5)
    .map((b) => ({ title: b.title, category: b.category, source: b.source, driveUrl: b.driveUrl }));

  console.log(JSON.stringify({ total, bySource, sample, cmsSample }, null, 2));
} catch (err) {
  console.error('Smoke test failed:', err);
  process.exit(1);
}
