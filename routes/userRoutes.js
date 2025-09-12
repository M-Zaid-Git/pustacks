import express from 'express';
import { protect, optionalAuth, authorize } from '../middleware/authMiddleware.js';
import { uploadProfileImage, uploadMaterial, handleUploadError } from '../middleware/uploadMiddleware.js';
import { register, login, getCurrentUser, forgotPassword, resetPassword } from '../controllers/authController.js';
import {
  updateProfile,
  getProfile,
  getUserUploads,
  getUserDownloads,
  getUserBookmarks,
  toggleBookmark,
  changePassword,
} from '../controllers/userController.js';

const router = express.Router();

// Auth routes
router.post('/auth/register', uploadProfileImage, handleUploadError, register);
router.post('/auth/login', login);
router.get('/auth/me', protect, getCurrentUser);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);
router.post('/auth/change-password', protect, changePassword);

// User routes
router.get('/users/profile', protect, getProfile);
router.put('/users/profile', protect, uploadProfileImage, handleUploadError, updateProfile);
router.get('/users/uploads', protect, getUserUploads);
router.get('/users/downloads', protect, getUserDownloads);
router.get('/users/bookmarks', protect, getUserBookmarks);
router.post('/users/bookmarks/:materialId', protect, toggleBookmark);

export default router;
