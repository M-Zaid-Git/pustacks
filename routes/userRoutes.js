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
// User Routes for ZESHO Educational Platform
import express from 'express';
import { User, Material, Activity, Notification } from '../models/index.js';
import { auth } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { cloudinary } from '../config/cloudinary.js';

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('uploads', 'title category createdAt views downloads')
      .populate('bookmarks.materialId', 'title category owner createdAt');

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, university, department, year, preferences } = req.body;

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (university) updateData.university = university.trim();
    if (department) updateData.department = department.trim();
    if (year) updateData.year = year;
    if (preferences) updateData.preferences = { ...req.user.preferences, ...preferences };

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );

    // Log activity
    await Activity.create({
      userId: req.user._id,
      action: 'update_profile',
      targetType: 'user',
      targetId: req.user._id,
      details: { updatedFields: Object.keys(updateData) }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while updating profile'
    });
  }
});

// @route   GET /api/users/dashboard-stats
// @desc    Get user dashboard statistics
// @access  Private
router.get('/dashboard-stats', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user with populated data
    const user = await User.findById(userId);

    // Get user's materials count
    const uploadsCount = await Material.countDocuments({ owner: userId });

    // Get user's downloads count
    const downloadsCount = user.downloads.length;

    // Get user's bookmarks count
    const bookmarksCount = user.bookmarks.length;

    // Get recent activity
    const recentActivity = await Activity.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('targetId', 'title name');

    // Calculate level based on points
    const getLevel = (points) => {
      if (points < 500) return 'Beginner';
      if (points < 1500) return 'Intermediate';
      if (points < 3000) return 'Advanced';
      if (points < 5000) return 'Expert';
      return 'Master';
    };

    // Calculate level progress
    const getLevelProgress = (points) => {
      const levels = [
        { name: 'Beginner', min: 0, max: 500 },
        { name: 'Intermediate', min: 500, max: 1500 },
        { name: 'Advanced', min: 1500, max: 3000 },
        { name: 'Expert', min: 3000, max: 5000 },
        { name: 'Master', min: 5000, max: Infinity }
      ];

      const currentLevel = levels.find(level => points >= level.min && points < level.max);
      if (!currentLevel) return { progress: 100, nextLevel: null };

      if (currentLevel.name === 'Master') {
        return { progress: 100, nextLevel: null };
      }

      const progress = ((points - currentLevel.min) / (currentLevel.max - currentLevel.min)) * 100;
      const nextLevelIndex = levels.findIndex(level => level.name === currentLevel.name) + 1;
      const nextLevel = levels[nextLevelIndex];

      return {
        progress: Math.min(progress, 100),
        nextLevel: nextLevel ? nextLevel.name : null,
        pointsToNext: nextLevel ? nextLevel.min - points : 0
      };
    };

    const levelInfo = getLevelProgress(user.points);
    const currentLevel = getLevel(user.points);

    // Get weekly stats
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weeklyActivity = await Activity.find({
      userId,
      createdAt: { $gte: weekAgo }
    });

    const weeklyStats = {
      uploads: weeklyActivity.filter(a => a.action === 'upload').length,
      downloads: weeklyActivity.filter(a => a.action === 'download').length,
      bookmarks: weeklyActivity.filter(a => a.action === 'bookmark').length,
      points: weeklyActivity.reduce((sum, a) => sum + (a.points || 0), 0)
    };

    // Get study goals progress
    const studyGoals = user.currentGoals.map(goal => ({
      ...goal.toObject(),
      daysLeft: Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))
    }));

    res.json({
      success: true,
      stats: {
        // User info
        name: user.name,
        level: currentLevel,
        points: user.points,
        streak: user.streak,
        levelProgress: levelInfo,

        // Content stats
        uploads: uploadsCount,
        downloads: downloadsCount,
        bookmarks: bookmarksCount,

        // Weekly stats
        weeklyStats,

        // Study goals
        studyGoals,

        // Recent activity
        recentActivity: recentActivity.slice(0, 5),

        // Badges
        badges: user.badges.slice(-3) // Last 3 badges
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching dashboard stats'
    });
  }
});

// @route   GET /api/users/activity
// @desc    Get user activity feed
// @access  Private
router.get('/activity', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const activities = await Activity.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('targetId', 'title name');

    const total = await Activity.countDocuments({ userId: req.user._id });

    res.json({
      success: true,
      activities,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get activity error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching activity'
    });
  }
});

// @route   PUT /api/users/study-goals
// @desc    Update user study goals
// @access  Private
router.put('/study-goals', auth, async (req, res) => {
  try {
    const { goals } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { currentGoals: goals },
      { new: true, runValidators: true }
    );

    // Log activity
    await Activity.create({
      userId: req.user._id,
      action: 'update_goals',
      targetType: 'user',
      targetId: req.user._id,
      points: 10,
      details: { goalsCount: goals.length }
    });

    res.json({
      success: true,
      message: 'Study goals updated successfully',
      goals: user.currentGoals
    });
  } catch (error) {
    console.error('Update study goals error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while updating study goals'
    });
  }
});

// @route   GET /api/users/analytics
// @desc    Get user analytics
// @access  Private
router.get('/analytics', auth, async (req, res) => {
  try {
    const period = req.query.period || '7d';
    const userId = req.user._id;

    // Calculate date range
    const getDaysFromPeriod = (period) => {
      switch (period) {
        case '7d': return 7;
        case '30d': return 30;
        case '90d': return 90;
        case '1y': return 365;
        default: return 7;
      }
    };

    const days = getDaysFromPeriod(period);
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    // Get activity data
    const activities = await Activity.find({
      userId,
      createdAt: { $gte: startDate }
    }).sort({ createdAt: 1 });

    // Group activities by day
    const dailyActivity = {};
    const categories = ['upload', 'download', 'bookmark', 'comment'];

    // Initialize all days
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      const dayKey = date.toISOString().split('T')[0];
      dailyActivity[dayKey] = {
        date: dayKey,
        upload: 0,
        download: 0,
        bookmark: 0,
        comment: 0,
        points: 0
      };
    }

    // Fill in actual activity data
    activities.forEach(activity => {
      const dayKey = activity.createdAt.toISOString().split('T')[0];
      if (dailyActivity[dayKey]) {
        if (categories.includes(activity.action)) {
          dailyActivity[dayKey][activity.action]++;
        }
        dailyActivity[dayKey].points += activity.points || 0;
      }
    });

    // Get user materials analytics
    const userMaterials = await Material.find({ owner: userId });
    const materialAnalytics = {
      totalViews: userMaterials.reduce((sum, m) => sum + m.views, 0),
      totalDownloads: userMaterials.reduce((sum, m) => sum + m.downloads, 0),
      averageRating: userMaterials.length > 0 
        ? userMaterials.reduce((sum, m) => sum + m.averageRating, 0) / userMaterials.length 
        : 0,
      topMaterials: userMaterials
        .sort((a, b) => b.views - a.views)
        .slice(0, 5)
        .map(m => ({
          title: m.title,
          views: m.views,
          downloads: m.downloads,
          rating: m.averageRating
        }))
    };

    // Category breakdown
    const categoryBreakdown = userMaterials.reduce((acc, material) => {
      acc[material.category] = (acc[material.category] || 0) + 1;
      return acc;
    }, {});

    res.json({
      success: true,
      analytics: {
        period,
        dailyActivity: Object.values(dailyActivity),
        materialAnalytics,
        categoryBreakdown,
        summary: {
          totalActivities: activities.length,
          totalPoints: activities.reduce((sum, a) => sum + (a.points || 0), 0),
          avgDailyActivity: activities.length / days
        }
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching analytics'
    });
  }
});

// @route   GET /api/users/leaderboard
// @desc    Get user leaderboard
// @access  Private
router.get('/leaderboard', auth, async (req, res) => {
  try {
    const period = req.query.period || 'all';
    
    // Get top users by points
    const topUsers = await User.find({})
      .sort({ points: -1 })
      .limit(50)
      .select('name university points level badges profileImage');

    // Get current user rank
    const userRank = await User.countDocuments({ points: { $gt: req.user.points } }) + 1;

    res.json({
      success: true,
      leaderboard: topUsers.map((user, index) => ({
        rank: index + 1,
        ...user.toObject()
      })),
      userRank
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching leaderboard'
    });
  }
});

export default router;
router.get('/users/uploads', protect, getUserUploads);
router.get('/users/downloads', protect, getUserDownloads);
router.get('/users/bookmarks', protect, getUserBookmarks);
router.post('/users/bookmarks/:materialId', protect, toggleBookmark);

export default router;
