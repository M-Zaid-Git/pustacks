import { getBooksFromSource } from '../../server-utils/booksSource.js';

export async function handler(event, context) {
  try {
    const books = await getBooksFromSource();
    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*',
        'access-control-allow-headers': 'Content-Type, Authorization, x-admin-key',
        'access-control-allow-methods': 'GET, OPTIONS',
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
