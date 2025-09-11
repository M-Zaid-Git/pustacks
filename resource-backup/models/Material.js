import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    fileUrl: {
      type: String,
      required: [true, 'File URL is required'],
    },
    thumbnailUrl: {
      type: String,
      default: '', // Default thumbnail image
    },
    fileType: {
      type: String,
      required: [true, 'File type is required'],
      enum: ['pdf', 'doc', 'ppt', 'image', 'video', 'other'],
    },
    fileSize: {
      type: Number, // in bytes
      required: [true, 'File size is required'],
    },
    originalFileName: {
      type: String,
      required: [true, 'Original file name is required'],
    },
    publicId: {
      type: String, // Cloudinary public ID
      default: '',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['notes', 'assignments', 'exams', 'books', 'papers', 'presentations', 'coding', 'tutorials', 'other'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    bookmarks: {
      type: Number,
      default: 0,
    },
    visibility: {
      type: String,
      enum: ['public', 'private', 'restricted'],
      default: 'public',
    },
    allowedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

// Create indexes for searching
materialSchema.index({ title: 'text', description: 'text', tags: 'text', subject: 'text' });

// Virtual for file size formatted
materialSchema.virtual('formattedSize').get(function () {
  const bytes = this.fileSize;
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB';
  else return (bytes / 1073741824).toFixed(2) + ' GB';
});

// Virtual for time since upload
materialSchema.virtual('timeAgo').get(function () {
  const now = new Date();
  const uploadTime = this.createdAt;
  const diffTime = Math.abs(now - uploadTime);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      if (diffMinutes === 0) {
        return 'Just now';
      }
      return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
    }
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  }
  if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  }
  if (diffDays < 30) {
    const diffWeeks = Math.floor(diffDays / 7);
    return `${diffWeeks} week${diffWeeks === 1 ? '' : 's'} ago`;
  }
  if (diffDays < 365) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
  }
  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears} year${diffYears === 1 ? '' : 's'} ago`;
});

// Set JSON options
materialSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    // Don't expose sensitive information
    return ret;
  },
});

const Material = mongoose.models.Material || mongoose.model('Material', materialSchema);

export default Material;
