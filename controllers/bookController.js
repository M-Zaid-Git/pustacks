import { getBooksFromSource } from '../server-utils/booksSource.js';

// Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await getBooksFromSource();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// Add a new book
export const addBook = async (req, res) => {
  return res.status(501).json({ error: 'Write API disabled in no-DB mode' });
};

// Update a book
export const updateBook = async (req, res) => {
  return res.status(501).json({ error: 'Write API disabled in no-DB mode' });
};

// Delete a book
export const deleteBook = async (req, res) => {
  return res.status(501).json({ error: 'Write API disabled in no-DB mode' });
};
