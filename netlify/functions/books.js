import { getBooksFromSource } from '../../server-utils/booksSource.js';

export async function handler(event, context) {
  try {
    const url = new URL(event.rawUrl || `https://x/?${event.rawQueryString || ''}`);
    const force = url.searchParams.get('revalidate') === '1' || url.searchParams.get('force') === '1';
    const books = await getBooksFromSource(force);
    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*',
        'access-control-allow-headers': 'Content-Type, Authorization, x-admin-key',
        'access-control-allow-methods': 'GET, OPTIONS',
        ...(force ? { 'cache-control': 'no-store' } : { 'cache-control': 'max-age=30, public' }),
      },
      body: JSON.stringify(books),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch books' }),
    };
  }
}
