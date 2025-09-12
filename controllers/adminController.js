import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Category from '../models/Category.js';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check if user exists and get password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if user is admin
    if (!['admin', 'super-admin'].includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.',
      });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: 'Admin login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private (Admin)
export const getAdminProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
          bio: user.bio,
          institution: user.institution,
          department: user.department,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile',
    });
  }
};

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private (Admin)
export const updateAdminProfile = async (req, res) => {
  try {
    const { name, bio, institution, department, profileImage } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update fields
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (institution !== undefined) user.institution = institution;
    if (department !== undefined) user.department = department;
    if (profileImage !== undefined) user.profileImage = profileImage;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
          bio: user.bio,
          institution: user.institution,
          department: user.department,
        },
      },
    });
  } catch (error) {
    console.error('Update admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile',
    });
  }
};

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard/stats
// @access  Private (Admin)
export const getDashboardStats = async (req, res) => {
  try {
    // Get various statistics
    const [
      totalPosts,
      publishedPosts,
      totalCategories,
      activeCategories,
      totalUsers,
      totalDownloads,
      totalViews,
      recentPosts,
      topCategories,
    ] = await Promise.all([
      Post.countDocuments(),
      Post.countDocuments({ isPublished: true }),
      Category.countDocuments(),
      Category.countDocuments({ isActive: true }),
      User.countDocuments(),
      Post.aggregate([{ $group: { _id: null, total: { $sum: '$downloadCount' } } }]),
      Post.aggregate([{ $group: { _id: null, total: { $sum: '$viewCount' } } }]),
      Post.find({ isPublished: true })
        .populate('category', 'name color')
        .populate('createdBy', 'name')
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title slug viewCount downloadCount createdAt'),
      Category.find({ isActive: true }).sort({ postCount: -1 }).limit(5).select('name postCount color icon'),
    ]);

    // Calculate growth percentages (mock data for now)
    const stats = {
      overview: {
        totalPosts,
        publishedPosts,
        draftPosts: totalPosts - publishedPosts,
        totalCategories,
        activeCategories,
        totalUsers,
        totalDownloads: totalDownloads[0]?.total || 0,
        totalViews: totalViews[0]?.total || 0,
      },
      growth: {
        postsGrowth: 12.5, // Mock percentage
        usersGrowth: 8.3,
        downloadsGrowth: 15.7,
        viewsGrowth: 22.1,
      },
      recent: {
        posts: recentPosts,
        categories: topCategories,
      },
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard stats',
    });
  }
};

// @desc    Get admin activity log
// @route   GET /api/admin/activity
// @access  Private (Admin)
export const getActivityLog = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    // For now, return recent posts and categories as activity
    // In production, you'd have a separate ActivityLog model
    const [recentPosts, recentCategories] = await Promise.all([
      Post.find()
        .populate('createdBy', 'name')
        .populate('category', 'name')
        .sort({ createdAt: -1 })
        .limit(parseInt(limit) / 2)
        .select('title createdAt createdBy category isPublished'),
      Category.find()
        .populate('createdBy', 'name')
        .sort({ createdAt: -1 })
        .limit(parseInt(limit) / 2)
        .select('name createdAt createdBy isActive'),
    ]);

    // Combine and sort activities
    const activities = [
      ...recentPosts.map((post) => ({
        type: 'post',
        action: 'created',
        title: post.title,
        user: post.createdBy?.name || 'Unknown',
        category: post.category?.name,
        status: post.isPublished ? 'published' : 'draft',
        createdAt: post.createdAt,
      })),
      ...recentCategories.map((category) => ({
        type: 'category',
        action: 'created',
        title: category.name,
        user: category.createdBy?.name || 'Unknown',
        status: category.isActive ? 'active' : 'inactive',
        createdAt: category.createdAt,
      })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      success: true,
      data: {
        activities: activities.slice(0, parseInt(limit)),
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: activities.length,
        },
      },
    });
  } catch (error) {
    console.error('Get activity log error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching activity log',
    });
  }
};

// @desc    Create initial admin user
// @route   POST /api/admin/setup
// @access  Public (Only when no admin exists)
export const setupInitialAdmin = async (req, res) => {
  try {
    // Check if any admin already exists
    const existingAdmin = await User.findOne({
      role: { $in: ['admin', 'super-admin'] },
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin user already exists',
      });
    }

    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin user
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'super-admin',
      bio: 'Platform Super Administrator',
      institution: 'ZESHO Platform',
    });

    // Create default categories
    await Category.createDefaultCategories(admin._id);

    // Generate token
    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      message: 'Initial admin setup completed successfully',
      data: {
        user: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Setup initial admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during admin setup',
    });
  }
};

export default {
  adminLogin,
  getAdminProfile,
  updateAdminProfile,
  getDashboardStats,
  getActivityLog,
  setupInitialAdmin,
};
