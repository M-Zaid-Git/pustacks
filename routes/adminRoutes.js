import express from 'express';
import {
  adminLogin,
  getAdminProfile,
  updateAdminProfile,
  getDashboardStats,
  getActivityLog,
  setupInitialAdmin,
} from '../controllers/adminController.js';
import {
  getAdminCategories,
  getAdminCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
} from '../controllers/categoryController.js';
import {
  getAdminPosts,
  getAdminPost,
  createPost,
  updatePost,
  deletePost,
  togglePublishStatus,
  toggleFeaturedStatus,
  bulkUpdatePosts,
} from '../controllers/postController.js';
import { adminAuth, superAdminAuth, adminRateLimit, auditLog } from '../middleware/adminMiddleware.js';

const router = express.Router();

// ==========================================
// AUTH ROUTES
// ==========================================

// @route   POST /api/admin/setup
// @desc    Setup initial admin (only when no admin exists)
// @access  Public
router.post('/setup', setupInitialAdmin);

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', adminLogin);

// @route   GET /api/admin/profile
// @desc    Get admin profile
// @access  Private (Admin)
router.get('/profile', adminAuth, getAdminProfile);

// @route   PUT /api/admin/profile
// @desc    Update admin profile
// @access  Private (Admin)
router.put('/profile', adminAuth, auditLog('UPDATE_PROFILE'), updateAdminProfile);

// ==========================================
// DASHBOARD ROUTES
// ==========================================

// @route   GET /api/admin/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private (Admin)
router.get('/dashboard/stats', adminAuth, getDashboardStats);

// @route   GET /api/admin/activity
// @desc    Get admin activity log
// @access  Private (Admin)
router.get('/activity', adminAuth, getActivityLog);

// ==========================================
// CATEGORY MANAGEMENT ROUTES
// ==========================================

// @route   GET /api/admin/categories
// @desc    Get all categories for admin
// @access  Private (Admin)
router.get('/categories', adminAuth, getAdminCategories);

// @route   GET /api/admin/categories/:id
// @desc    Get single category for admin
// @access  Private (Admin)
router.get('/categories/:id', adminAuth, getAdminCategory);

// @route   POST /api/admin/categories
// @desc    Create new category
// @access  Private (Admin)
router.post(
  '/categories',
  adminAuth,
  adminRateLimit(50, 15 * 60 * 1000), // 50 requests per 15 minutes
  auditLog('CREATE_CATEGORY'),
  createCategory
);

// @route   PUT /api/admin/categories/:id
// @desc    Update category
// @access  Private (Admin)
router.put(
  '/categories/:id',
  adminAuth,
  adminRateLimit(100, 15 * 60 * 1000), // 100 requests per 15 minutes
  auditLog('UPDATE_CATEGORY'),
  updateCategory
);

// @route   DELETE /api/admin/categories/:id
// @desc    Delete category
// @access  Private (Admin)
router.delete('/categories/:id', adminAuth, auditLog('DELETE_CATEGORY'), deleteCategory);

// @route   PUT /api/admin/categories/reorder
// @desc    Reorder categories
// @access  Private (Admin)
router.put('/categories/reorder', adminAuth, auditLog('REORDER_CATEGORIES'), reorderCategories);

// ==========================================
// POST MANAGEMENT ROUTES
// ==========================================

// @route   GET /api/admin/posts
// @desc    Get all posts for admin
// @access  Private (Admin)
router.get('/posts', adminAuth, getAdminPosts);

// @route   GET /api/admin/posts/:id
// @desc    Get single post for admin
// @access  Private (Admin)
router.get('/posts/:id', adminAuth, getAdminPost);

// @route   POST /api/admin/posts
// @desc    Create new post
// @access  Private (Admin)
router.post(
  '/posts',
  adminAuth,
  adminRateLimit(100, 15 * 60 * 1000), // 100 requests per 15 minutes
  auditLog('CREATE_POST'),
  createPost
);

// @route   PUT /api/admin/posts/:id
// @desc    Update post
// @access  Private (Admin)
router.put(
  '/posts/:id',
  adminAuth,
  adminRateLimit(200, 15 * 60 * 1000), // 200 requests per 15 minutes
  auditLog('UPDATE_POST'),
  updatePost
);

// @route   DELETE /api/admin/posts/:id
// @desc    Delete post
// @access  Private (Admin)
router.delete('/posts/:id', adminAuth, auditLog('DELETE_POST'), deletePost);

// @route   PUT /api/admin/posts/:id/publish
// @desc    Toggle post publish status
// @access  Private (Admin)
router.put('/posts/:id/publish', adminAuth, auditLog('TOGGLE_POST_PUBLISH'), togglePublishStatus);

// @route   PUT /api/admin/posts/:id/feature
// @desc    Toggle post featured status
// @access  Private (Admin)
router.put('/posts/:id/feature', adminAuth, auditLog('TOGGLE_POST_FEATURE'), toggleFeaturedStatus);

// @route   PUT /api/admin/posts/bulk
// @desc    Bulk actions on posts
// @access  Private (Admin)
router.put('/posts/bulk', adminAuth, auditLog('BULK_UPDATE_POSTS'), bulkUpdatePosts);

// ==========================================
// SUPER ADMIN ONLY ROUTES
// ==========================================

// @route   GET /api/admin/users
// @desc    Get all users (future implementation)
// @access  Private (Super Admin)
router.get('/users', superAdminAuth, (req, res) => {
  res.status(501).json({
    success: false,
    message: 'User management not implemented yet',
  });
});

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role (future implementation)
// @access  Private (Super Admin)
router.put('/users/:id/role', superAdminAuth, (req, res) => {
  res.status(501).json({
    success: false,
    message: 'User role management not implemented yet',
  });
});

// ==========================================
// HEALTH CHECK
// ==========================================

// @route   GET /api/admin/health
// @desc    Admin panel health check
// @access  Private (Admin)
router.get('/health', adminAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin panel is healthy',
    data: {
      timestamp: new Date().toISOString(),
      admin: {
        id: req.user.id,
        name: req.user.name,
        role: req.user.role,
      },
    },
  });
});

export default router;
