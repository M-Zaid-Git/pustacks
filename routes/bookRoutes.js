import express from 'express';
import { getBooks } from '../controllers/bookController.js';
const router = express.Router();

// Public: Get all books
router.get('/', getBooks);

// Note: Write endpoints are disabled in no-DB mode

export default router;
