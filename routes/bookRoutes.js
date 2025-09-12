import express from 'express';
import { getBooks, addBook, updateBook, deleteBook } from '../controllers/bookController.js';
import adminAuth from '../middleware/adminAuth.js';
const router = express.Router();

// Public: Get all books
router.get('/', getBooks);

// Admin: Add, update, delete books (to be protected)
router.post('/', adminAuth, addBook);
router.put('/:id', adminAuth, updateBook);
router.delete('/:id', adminAuth, deleteBook);

export default router;
