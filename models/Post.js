import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Post description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    googleDriveLink: {
      type: String,
      required: [true, 'Google Drive link is required'],
      validate: {
        validator: function (v) {
          // Validate various Google Drive URL formats
          const drivePatterns = [
            /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/view/,
            /^https:\/\/drive\.google\.com\/open\?id=[a-zA-Z0-9_-]+/,
            /^https:\/\/docs\.google\.com\/(document|spreadsheets|presentation)\/d\/[a-zA-Z0-9_-]+/,
            /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+/,
          ];
          return drivePatterns.some((pattern) => pattern.test(v));
        },
        message: 'Please provide a valid Google Drive share link',
      },
    },
    directDownloadLink: {
      type: String, // Processed direct download link
    },
    fileId: {
      type: String, // Extracted Google Drive file ID
    },
    fileType: {
      type: String,
      required: [true, 'File type is required'],
      enum: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xlsx', 'txt', 'zip', 'rar', 'mp4', 'avi', 'jpg', 'png'],
      lowercase: true,
    },
    fileSize: {
      type: String, // Human-readable size like "2.5 MB"
      default: 'Unknown',
    },
    fileSizeBytes: {
      type: Number, // Size in bytes for sorting/filtering
      default: 0,
    },
    thumbnailUrl: {
      type: String,
      default: '/placeholder-book.svg',
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [100, 'Subject cannot exceed 100 characters'],
    },
    semester: {
      type: Number,
      min: 1,
      max: 8,
    },
    author: {
      type: String,
      trim: true,
      maxlength: [100, 'Author name cannot exceed 100 characters'],
    },
    edition: {
      type: String,
      trim: true,
      maxlength: [50, 'Edition cannot exceed 50 characters'],
    },
    language: {
      type: String,
      default: 'English',
      trim: true,
    },
    // Analytics fields
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    downloadCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    likeCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Status fields
    isPublished: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false, // Admin verified content
    },
    // Dates
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    featuredAt: {
      type: Date,
    },
    // User tracking
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
postSchema.index({ slug: 1 });
postSchema.index({ category: 1, isPublished: 1 });
postSchema.index({ isPublished: 1, publishedAt: -1 });
postSchema.index({ isFeatured: 1, publishedAt: -1 });
postSchema.index({ tags: 1 });
postSchema.index({ fileType: 1 });
postSchema.index({ difficulty: 1 });
postSchema.index({ title: 'text', description: 'text', tags: 'text' }); // Text search

// Static method to extract Google Drive file ID
postSchema.statics.extractFileId = function (driveLink) {
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)\//, // /file/d/FILE_ID/view
    /[?&]id=([a-zA-Z0-9_-]+)/, // ?id=FILE_ID or &id=FILE_ID
    /\/d\/([a-zA-Z0-9_-]+)/, // /d/FILE_ID (docs, sheets, slides)
  ];

  for (const pattern of patterns) {
    const match = driveLink.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
};

// Static method to generate direct download link
postSchema.statics.generateDirectDownloadLink = function (fileId) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

// Instance method to generate URL-friendly slug
postSchema.methods.generateSlug = function () {
  const baseSlug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();

  // Add timestamp to ensure uniqueness
  this.slug = `${baseSlug}-${Date.now()}`;
};

// Instance method to increment view count
postSchema.methods.incrementView = async function () {
  this.viewCount += 1;
  await this.save();
  return this;
};

// Instance method to increment download count
postSchema.methods.incrementDownload = async function () {
  this.downloadCount += 1;
  await this.save();
  return this;
};

// Instance method to toggle featured status
postSchema.methods.toggleFeatured = async function () {
  this.isFeatured = !this.isFeatured;
  this.featuredAt = this.isFeatured ? new Date() : null;
  await this.save();
  return this;
};

// Pre-save middleware
postSchema.pre('save', function (next) {
  // Auto-generate slug if not provided
  if (!this.slug && this.name) {
    this.generateSlug();
  }

  // Extract file ID from Google Drive link
  if (this.googleDriveLink && !this.fileId) {
    this.fileId = this.constructor.extractFileId(this.googleDriveLink);
  }

  // Generate direct download link
  if (this.fileId && !this.directDownloadLink) {
    this.directDownloadLink = this.constructor.generateDirectDownloadLink(this.fileId);
  }

  // Set published date
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  // Set featured date
  if (this.isFeatured && !this.featuredAt) {
    this.featuredAt = new Date();
  }

  next();
});

// Post-save middleware to update category post count
postSchema.post('save', async function () {
  try {
    const Category = mongoose.model('Category');
    const postCount = await this.constructor.countDocuments({
      category: this.category,
      isPublished: true,
    });

    await Category.findByIdAndUpdate(this.category, { postCount }, { new: false });
  } catch (error) {
    console.error('Error updating category post count:', error);
  }
});

// Post-remove middleware to update category post count
postSchema.post('remove', async function () {
  try {
    const Category = mongoose.model('Category');
    const postCount = await this.constructor.countDocuments({
      category: this.category,
      isPublished: true,
    });

    await Category.findByIdAndUpdate(this.category, { postCount }, { new: false });
  } catch (error) {
    console.error('Error updating category post count after deletion:', error);
  }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
