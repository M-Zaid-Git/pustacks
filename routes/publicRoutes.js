import express from 'express';
import { getPublicCategories, getCategoryBySlug } from '../controllers/categoryController.js';
import Post from '../models/Post.js';
import Category from '../models/Category.js';

const router = express.Router();

// ==========================================
// PUBLIC CATEGORY ROUTES
// ==========================================

// @route   GET /api/categories
// @desc    Get all active categories
// @access  Public
router.get('/categories', getPublicCategories);

// @route   GET /api/categories/:slug
// @desc    Get category by slug
// @access  Public
router.get('/categories/:slug', getCategoryBySlug);

// ==========================================
// PUBLIC POST ROUTES
// ==========================================

// @route   GET /api/posts
// @desc    Get published posts with filters
// @access  Public
router.get('/posts', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = '',
      category = '',
      fileType = '',
      difficulty = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      featured = false,
    } = req.query;

    // Build filter query
    const filter = { isPublished: true };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      // Handle both category ID and slug
      if (category.length === 24) {
        filter.category = category;
      } else {
        const categoryDoc = await Category.findOne({ slug: category });
        if (categoryDoc) {
          filter.category = categoryDoc._id;
        }
      }
    }

    if (fileType) {
      filter.fileType = fileType;
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    // Build sort query
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get posts with pagination
    const posts = await Post.find(filter)
      .populate('category', 'name slug color icon')
      .populate('createdBy', 'name')
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-updatedBy -verifiedBy'); // Exclude admin fields

    // Get total count for pagination
    const total = await Post.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        posts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching posts',
    });
  }
});

// @route   GET /api/posts/featured
// @desc    Get featured posts
// @access  Public
router.get('/posts/featured', async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const posts = await Post.find({
      isPublished: true,
      isFeatured: true,
    })
      .populate('category', 'name slug color icon')
      .populate('createdBy', 'name')
      .sort({ featuredAt: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .select('-updatedBy -verifiedBy');

    res.status(200).json({
      success: true,
      data: { posts },
    });
  } catch (error) {
    console.error('Get featured posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching featured posts',
    });
  }
});

// @route   GET /api/posts/recent
// @desc    Get recent posts
// @access  Public
router.get('/posts/recent', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const posts = await Post.find({ isPublished: true })
      .populate('category', 'name slug color icon')
      .populate('createdBy', 'name')
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .select('-updatedBy -verifiedBy');

    res.status(200).json({
      success: true,
      data: { posts },
    });
  } catch (error) {
    console.error('Get recent posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching recent posts',
    });
  }
});

// @route   GET /api/posts/popular
// @desc    Get popular posts (by downloads/views)
// @access  Public
router.get('/posts/popular', async (req, res) => {
  try {
    const { limit = 10, sortBy = 'downloadCount' } = req.query;

    const sortField = ['downloadCount', 'viewCount'].includes(sortBy) ? sortBy : 'downloadCount';

    const posts = await Post.find({ isPublished: true })
      .populate('category', 'name slug color icon')
      .populate('createdBy', 'name')
      .sort({ [sortField]: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .select('-updatedBy -verifiedBy');

    res.status(200).json({
      success: true,
      data: { posts },
    });
  } catch (error) {
    console.error('Get popular posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching popular posts',
    });
  }
});

// @route   GET /api/posts/category/:slug
// @desc    Get posts by category slug
// @access  Public
router.get('/posts/category/:slug', async (req, res) => {
  try {
    const { page = 1, limit = 12, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    // Find category by slug
    const category = await Category.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // Build sort query
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get posts in this category
    const posts = await Post.find({
      category: category._id,
      isPublished: true,
    })
      .populate('category', 'name slug color icon')
      .populate('createdBy', 'name')
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-updatedBy -verifiedBy');

    // Get total count for pagination
    const total = await Post.countDocuments({
      category: category._id,
      isPublished: true,
    });

    res.status(200).json({
      success: true,
      data: {
        category: {
          name: category.name,
          slug: category.slug,
          description: category.description,
          icon: category.icon,
          color: category.color,
        },
        posts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    console.error('Get posts by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching posts by category',
    });
  }
});

// @route   GET /api/posts/:id
// @desc    Get single post by ID
// @access  Public
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      isPublished: true,
    })
      .populate('category', 'name slug color icon')
      .populate('createdBy', 'name profileImage')
      .select('-updatedBy -verifiedBy');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Get related posts from same category
    const relatedPosts = await Post.find({
      category: post.category._id,
      _id: { $ne: post._id },
      isPublished: true,
    })
      .populate('category', 'name slug color')
      .sort({ createdAt: -1 })
      .limit(4)
      .select('title slug thumbnailUrl viewCount downloadCount createdAt');

    res.status(200).json({
      success: true,
      data: {
        post,
        relatedPosts,
      },
    });
  } catch (error) {
    console.error('Get post by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching post',
    });
  }
});

// @route   PUT /api/posts/:id/view
// @desc    Increment post view count
// @access  Public
router.put('/posts/:id/view', async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, isPublished: true },
      { $inc: { viewCount: 1 } },
      { new: true }
    ).select('viewCount');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { viewCount: post.viewCount },
    });
  } catch (error) {
    console.error('Increment view count error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating view count',
    });
  }
});

// @route   PUT /api/posts/:id/download
// @desc    Increment post download count
// @access  Public
router.put('/posts/:id/download', async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, isPublished: true },
      { $inc: { downloadCount: 1 } },
      { new: true }
    ).select('downloadCount directDownloadLink');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        downloadCount: post.downloadCount,
        downloadLink: post.directDownloadLink,
      },
    });
  } catch (error) {
    console.error('Increment download count error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating download count',
    });
  }
});

// @route   GET /api/search
// @desc    Search posts and categories
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q: query, type = 'all', limit = 10 } = req.query;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const searchRegex = new RegExp(query, 'i');
    const results = {};

    if (type === 'all' || type === 'posts') {
      const posts = await Post.find({
        isPublished: true,
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { tags: { $in: [searchRegex] } },
          { author: searchRegex },
        ],
      })
        .populate('category', 'name slug color')
        .sort({ downloadCount: -1, viewCount: -1 })
        .limit(parseInt(limit))
        .select('title slug description thumbnailUrl viewCount downloadCount');

      results.posts = posts;
    }

    if (type === 'all' || type === 'categories') {
      const categories = await Category.find({
        isActive: true,
        $or: [{ name: searchRegex }, { description: searchRegex }],
      })
        .sort({ postCount: -1 })
        .limit(parseInt(limit))
        .select('name slug description icon color postCount');

      results.categories = categories;
    }

    res.status(200).json({
      success: true,
      data: {
        query,
        results,
        totalResults: (results.posts?.length || 0) + (results.categories?.length || 0),
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching',
    });
  }
});

export default router;
