import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
      maxlength: [50, 'Category name cannot exceed 50 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Category slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'],
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    icon: {
      type: String,
      default: 'book', // Icon class name or emoji
      trim: true,
    },
    color: {
      type: String,
      default: '#3B82F6', // Hex color code for UI theming
      match: [/^#[0-9A-Fa-f]{6}$/, 'Please provide a valid hex color code'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0, // For custom ordering in UI
    },
    postCount: {
      type: Number,
      default: 0, // Denormalized field for quick access
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
categorySchema.index({ slug: 1 });
categorySchema.index({ isActive: 1, sortOrder: 1 });
categorySchema.index({ name: 'text', description: 'text' }); // Text search

// Static method to create default categories
categorySchema.statics.createDefaultCategories = async function (adminId) {
  const defaultCategories = [
    {
      name: 'Programming Fundamentals',
      slug: 'programming-fundamentals',
      description: 'Basic programming concepts, algorithms, and fundamental programming languages',
      icon: '💻',
      color: '#10B981',
      sortOrder: 1,
      createdBy: adminId,
    },
    {
      name: 'Computer Networks',
      slug: 'computer-networks',
      description: 'CN, networking protocols, network security, and communication systems',
      icon: '🌐',
      color: '#3B82F6',
      sortOrder: 2,
      createdBy: adminId,
    },
    {
      name: 'Object Oriented Programming',
      slug: 'object-oriented-programming',
      description: 'OOP concepts, design patterns, inheritance, polymorphism, and implementation',
      icon: '🧱',
      color: '#8B5CF6',
      sortOrder: 3,
      createdBy: adminId,
    },
    {
      name: 'Ideology',
      slug: 'ideology',
      description: 'Pakistan Studies, Islamic Studies, Ethics, and related ideological subjects',
      icon: '📚',
      color: '#F59E0B',
      sortOrder: 4,
      createdBy: adminId,
    },
    {
      name: 'Applied Physics',
      slug: 'applied-physics',
      description: 'Physics concepts, applications, quantum mechanics, and engineering physics',
      icon: '⚛️',
      color: '#EF4444',
      sortOrder: 5,
      createdBy: adminId,
    },
  ];

  try {
    // Check if categories already exist
    const existingCount = await this.countDocuments();
    if (existingCount === 0) {
      await this.insertMany(defaultCategories);
      console.log('✅ Default categories created successfully');
      return defaultCategories;
    } else {
      console.log('ℹ️ Categories already exist, skipping default creation');
      return await this.find().sort({ sortOrder: 1 });
    }
  } catch (error) {
    console.error('❌ Error creating default categories:', error);
    throw error;
  }
};

// Instance method to generate URL-friendly slug from name
categorySchema.methods.generateSlug = function () {
  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Pre-save middleware
categorySchema.pre('save', function (next) {
  // Auto-generate slug if not provided
  if (!this.slug && this.name) {
    this.generateSlug();
  }

  // Ensure slug is lowercase
  if (this.slug) {
    this.slug = this.slug.toLowerCase();
  }

  next();
});

// Post-save middleware to update post count
categorySchema.post('save', async function () {
  try {
    const Post = mongoose.model('Post');
    const postCount = await Post.countDocuments({
      category: this._id,
      isPublished: true,
    });

    // Update post count without triggering middleware
    await this.constructor.findByIdAndUpdate(this._id, { postCount }, { new: false });
  } catch (error) {
    console.error('Error updating category post count:', error);
  }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
