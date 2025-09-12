import Post from '../models/Post.js';
import Category from '../models/Category.js';

// @desc    Get all posts (Admin)
// @route   GET /api/admin/posts
// @access  Private (Admin)
export const getAdminPosts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      category = '',
      status = 'all',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      fileType = '',
      difficulty = '',
    } = req.query;

    // Build filter query
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (status !== 'all') {
      switch (status) {
        case 'published':
          filter.isPublished = true;
          break;
        case 'draft':
          filter.isPublished = false;
          break;
        case 'featured':
          filter.isFeatured = true;
          break;
      }
    }

    if (fileType) {
      filter.fileType = fileType;
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    // Build sort query
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get posts with pagination
    const posts = await Post.find(filter)
      .populate('category', 'name color')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    // Get total count for pagination
    const total = await Post.countDocuments(filter);

    // Get additional stats
    const stats = await Post.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$viewCount' },
          totalDownloads: { $sum: '$downloadCount' },
          avgViews: { $avg: '$viewCount' },
          avgDownloads: { $avg: '$downloadCount' },
        },
      },
    ]);

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
        stats: stats[0] || {
          totalViews: 0,
          totalDownloads: 0,
          avgViews: 0,
          avgDownloads: 0,
        },
      },
    });
  } catch (error) {
    console.error('Get admin posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching posts',
    });
  }
};

// @desc    Get single post (Admin)
// @route   GET /api/admin/posts/:id
// @access  Private (Admin)
export const getAdminPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('category', 'name color')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { post },
    });
  } catch (error) {
    console.error('Get admin post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching post',
    });
  }
};

// @desc    Create new post
// @route   POST /api/admin/posts
// @access  Private (Admin)
export const createPost = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      googleDriveLink,
      fileType,
      fileSize,
      fileSizeBytes,
      thumbnailUrl,
      tags,
      difficulty,
      subject,
      semester,
      author,
      edition,
      language,
      isPublished = true,
      isFeatured = false,
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !googleDriveLink || !fileType) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, category, Google Drive link, and file type are required',
      });
    }

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category',
      });
    }

    // Extract file ID and create direct download link
    const fileId = Post.extractFileId(googleDriveLink);
    if (!fileId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Google Drive link format',
      });
    }

    // Create post
    const post = await Post.create({
      title,
      description,
      category,
      googleDriveLink,
      fileId,
      directDownloadLink: Post.generateDirectDownloadLink(fileId),
      fileType: fileType.toLowerCase(),
      fileSize: fileSize || 'Unknown',
      fileSizeBytes: fileSizeBytes || 0,
      thumbnailUrl: thumbnailUrl || '/placeholder-book.svg',
      tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
      difficulty,
      subject,
      semester,
      author,
      edition,
      language: language || 'English',
      isPublished,
      isFeatured,
      createdBy: req.user.id,
    });

    // Populate related data
    await post.populate([
      { path: 'category', select: 'name color' },
      { path: 'createdBy', select: 'name email' },
    ]);

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: { post },
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating post',
    });
  }
};

// @desc    Update post
// @route   PUT /api/admin/posts/:id
// @access  Private (Admin)
export const updatePost = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      googleDriveLink,
      fileType,
      fileSize,
      fileSizeBytes,
      thumbnailUrl,
      tags,
      difficulty,
      subject,
      semester,
      author,
      edition,
      language,
      isPublished,
      isFeatured,
    } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Verify category if provided
    if (category && category !== post.category.toString()) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category',
        });
      }
    }

    // Handle Google Drive link update
    if (googleDriveLink && googleDriveLink !== post.googleDriveLink) {
      const fileId = Post.extractFileId(googleDriveLink);
      if (!fileId) {
        return res.status(400).json({
          success: false,
          message: 'Invalid Google Drive link format',
        });
      }
      post.fileId = fileId;
      post.directDownloadLink = Post.generateDirectDownloadLink(fileId);
      post.googleDriveLink = googleDriveLink;
    }

    // Update fields
    if (title) post.title = title;
    if (description) post.description = description;
    if (category) post.category = category;
    if (fileType) post.fileType = fileType.toLowerCase();
    if (fileSize !== undefined) post.fileSize = fileSize;
    if (fileSizeBytes !== undefined) post.fileSizeBytes = fileSizeBytes;
    if (thumbnailUrl !== undefined) post.thumbnailUrl = thumbnailUrl;
    if (tags !== undefined) post.tags = Array.isArray(tags) ? tags : tags ? [tags] : [];
    if (difficulty) post.difficulty = difficulty;
    if (subject !== undefined) post.subject = subject;
    if (semester !== undefined) post.semester = semester;
    if (author !== undefined) post.author = author;
    if (edition !== undefined) post.edition = edition;
    if (language) post.language = language;
    if (isPublished !== undefined) post.isPublished = isPublished;
    if (isFeatured !== undefined) post.isFeatured = isFeatured;

    post.updatedBy = req.user.id;

    await post.save();

    // Populate related data
    await post.populate([
      { path: 'category', select: 'name color' },
      { path: 'createdBy', select: 'name email' },
      { path: 'updatedBy', select: 'name email' },
    ]);

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: { post },
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating post',
    });
  }
};

// @desc    Delete post
// @route   DELETE /api/admin/posts/:id
// @access  Private (Admin)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting post',
    });
  }
};

// @desc    Toggle post publish status
// @route   PUT /api/admin/posts/:id/publish
// @access  Private (Admin)
export const togglePublishStatus = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    post.isPublished = !post.isPublished;
    post.publishedAt = post.isPublished ? new Date() : null;
    post.updatedBy = req.user.id;

    await post.save();

    res.status(200).json({
      success: true,
      message: `Post ${post.isPublished ? 'published' : 'unpublished'} successfully`,
      data: {
        post: {
          id: post._id,
          isPublished: post.isPublished,
          publishedAt: post.publishedAt,
        },
      },
    });
  } catch (error) {
    console.error('Toggle publish status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating publish status',
    });
  }
};

// @desc    Toggle post featured status
// @route   PUT /api/admin/posts/:id/feature
// @access  Private (Admin)
export const toggleFeaturedStatus = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    await post.toggleFeatured();
    post.updatedBy = req.user.id;
    await post.save();

    res.status(200).json({
      success: true,
      message: `Post ${post.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: {
        post: {
          id: post._id,
          isFeatured: post.isFeatured,
          featuredAt: post.featuredAt,
        },
      },
    });
  } catch (error) {
    console.error('Toggle featured status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating featured status',
    });
  }
};

// @desc    Bulk actions on posts
// @route   PUT /api/admin/posts/bulk
// @access  Private (Admin)
export const bulkUpdatePosts = async (req, res) => {
  try {
    const { postIds, action, value } = req.body;

    if (!Array.isArray(postIds) || postIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Post IDs array is required',
      });
    }

    if (!action) {
      return res.status(400).json({
        success: false,
        message: 'Action is required',
      });
    }

    let updateData = { updatedBy: req.user.id };

    switch (action) {
      case 'publish':
        updateData.isPublished = true;
        updateData.publishedAt = new Date();
        break;
      case 'unpublish':
        updateData.isPublished = false;
        updateData.publishedAt = null;
        break;
      case 'feature':
        updateData.isFeatured = true;
        updateData.featuredAt = new Date();
        break;
      case 'unfeature':
        updateData.isFeatured = false;
        updateData.featuredAt = null;
        break;
      case 'category':
        if (!value) {
          return res.status(400).json({
            success: false,
            message: 'Category value is required for category update',
          });
        }
        updateData.category = value;
        break;
      case 'delete':
        await Post.deleteMany({ _id: { $in: postIds } });
        return res.status(200).json({
          success: true,
          message: `${postIds.length} post(s) deleted successfully`,
        });
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action',
        });
    }

    const result = await Post.updateMany({ _id: { $in: postIds } }, updateData);

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} post(s) updated successfully`,
      data: { modifiedCount: result.modifiedCount },
    });
  } catch (error) {
    console.error('Bulk update posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while performing bulk update',
    });
  }
};

export default {
  getAdminPosts,
  getAdminPost,
  createPost,
  updatePost,
  deletePost,
  togglePublishStatus,
  toggleFeaturedStatus,
  bulkUpdatePosts,
};
