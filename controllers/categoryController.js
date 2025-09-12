import Category from '../models/Category.js';
import Post from '../models/Post.js';

// @desc    Get all categories (Admin)
// @route   GET /api/admin/categories
// @access  Private (Admin)
export const getAdminCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sortBy = 'sortOrder', sortOrder = 'asc', status = 'all' } = req.query;

    // Build filter query
    const filter = {};

    if (search) {
      filter.$or = [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
    }

    if (status !== 'all') {
      filter.isActive = status === 'active';
    }

    // Build sort query
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get categories with pagination
    const categories = await Category.find(filter)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    // Get total count for pagination
    const total = await Category.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        categories,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    console.error('Get admin categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories',
    });
  }
};

// @desc    Get single category (Admin)
// @route   GET /api/admin/categories/:id
// @access  Private (Admin)
export const getAdminCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // Get recent posts in this category
    const recentPosts = await Post.find({
      category: category._id,
      isPublished: true,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title slug viewCount downloadCount createdAt')
      .populate('createdBy', 'name');

    res.status(200).json({
      success: true,
      data: {
        category,
        recentPosts,
      },
    });
  } catch (error) {
    console.error('Get admin category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching category',
    });
  }
};

// @desc    Create new category
// @route   POST /api/admin/categories
// @access  Private (Admin)
export const createCategory = async (req, res) => {
  try {
    const { name, description, icon, color, sortOrder } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required',
      });
    }

    // Check if category with same name already exists
    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category with this name already exists',
      });
    }

    // Create category
    const category = await Category.create({
      name,
      description: description || '',
      icon: icon || '📚',
      color: color || '#3B82F6',
      sortOrder: sortOrder || 0,
      createdBy: req.user.id,
    });

    // Populate creator info
    await category.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { category },
    });
  } catch (error) {
    console.error('Create category error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Category with this name or slug already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating category',
    });
  }
};

// @desc    Update category
// @route   PUT /api/admin/categories/:id
// @access  Private (Admin)
export const updateCategory = async (req, res) => {
  try {
    const { name, description, icon, color, sortOrder, isActive } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // Check if new name conflicts with existing category
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({
        _id: { $ne: req.params.id },
        name: { $regex: new RegExp(`^${name}$`, 'i') },
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: 'Category with this name already exists',
        });
      }
    }

    // Update fields
    if (name) category.name = name;
    if (description !== undefined) category.description = description;
    if (icon) category.icon = icon;
    if (color) category.color = color;
    if (sortOrder !== undefined) category.sortOrder = sortOrder;
    if (isActive !== undefined) category.isActive = isActive;

    category.updatedBy = req.user.id;

    await category.save();

    // Populate user info
    await category.populate(['createdBy', 'updatedBy'], 'name email');

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: { category },
    });
  } catch (error) {
    console.error('Update category error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Category with this name or slug already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating category',
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/admin/categories/:id
// @access  Private (Admin)
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // Check if category has posts
    const postCount = await Post.countDocuments({
      category: category._id,
    });

    if (postCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. It has ${postCount} post(s). Please move or delete posts first.`,
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting category',
    });
  }
};

// @desc    Bulk update category order
// @route   PUT /api/admin/categories/reorder
// @access  Private (Admin)
export const reorderCategories = async (req, res) => {
  try {
    const { categories } = req.body;

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Categories array is required',
      });
    }

    // Update sort order for each category
    const updatePromises = categories.map(({ id, sortOrder }, index) => {
      return Category.findByIdAndUpdate(
        id,
        {
          sortOrder: sortOrder !== undefined ? sortOrder : index,
          updatedBy: req.user.id,
        },
        { new: true }
      );
    });

    await Promise.all(updatePromises);

    res.status(200).json({
      success: true,
      message: 'Categories reordered successfully',
    });
  } catch (error) {
    console.error('Reorder categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while reordering categories',
    });
  }
};

// @desc    Get public categories (for frontend)
// @route   GET /api/categories
// @access  Public
export const getPublicCategories = async (req, res) => {
  try {
    const { includePostCount = true } = req.query;

    const categories = await Category.find({ isActive: true })
      .sort({ sortOrder: 1, name: 1 })
      .select('name slug description icon color postCount');

    // Optionally update post counts in real-time
    if (includePostCount === 'realtime') {
      for (const category of categories) {
        const postCount = await Post.countDocuments({
          category: category._id,
          isPublished: true,
        });
        category.postCount = postCount;
      }
    }

    res.status(200).json({
      success: true,
      data: { categories },
    });
  } catch (error) {
    console.error('Get public categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories',
    });
  }
};

// @desc    Get category by slug (for frontend)
// @route   GET /api/categories/:slug
// @access  Public
export const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
      isActive: true,
    }).select('name slug description icon color postCount');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { category },
    });
  } catch (error) {
    console.error('Get category by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching category',
    });
  }
};

export default {
  getAdminCategories,
  getAdminCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
  getPublicCategories,
  getCategoryBySlug,
};
