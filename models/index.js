// Database Models Index for ZESHO Educational Platform
import mongoose from 'mongoose';

// Enhanced User Schema with Dashboard Features
const userSchema = new mongoose.Schema(
  {
    // Basic Information
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    profileImage: { type: String, default: '' },

    // Educational Information
    university: { type: String, default: 'ZESHO Tech University' },
    department: { type: String, default: '' },
    year: { type: String, enum: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'], default: 'Freshman' },
    studentId: { type: String, unique: true, sparse: true },

    // Gamification & Progress
    points: { type: Number, default: 0 },
    level: { type: String, default: 'Beginner' },
    streak: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: Date.now },
    badges: [
      {
        name: String,
        description: String,
        earnedAt: { type: Date, default: Date.now },
        icon: String,
      },
    ],

    // Learning Analytics
    studyHours: { type: Number, default: 0 },
    completedCourses: [
      {
        courseId: String,
        courseName: String,
        completedAt: Date,
        grade: String,
      },
    ],
    currentGoals: [
      {
        title: String,
        progress: { type: Number, default: 0 },
        deadline: Date,
        priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
        category: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // Activity Tracking
    uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }],
    downloads: [
      {
        materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Material' },
        downloadedAt: { type: Date, default: Date.now },
      },
    ],
    bookmarks: [
      {
        materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Material' },
        bookmarkedAt: { type: Date, default: Date.now },
      },
    ],

    // Social Features
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    studyGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudyGroup' }],

    // Preferences
    preferences: {
      notifications: { type: Boolean, default: true },
      publicProfile: { type: Boolean, default: true },
      shareProgress: { type: Boolean, default: true },
      darkMode: { type: Boolean, default: true },
    },

    // Authentication
    role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Enhanced Material Schema
const materialSchema = new mongoose.Schema(
  {
    // Basic Information
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, maxlength: 2000 },

    // File Information
    fileUrl: { type: String, required: true },
    thumbnailUrl: { type: String, default: '' },
    fileType: {
      type: String,
      required: true,
      enum: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xlsx', 'txt', 'image', 'video', 'audio', 'zip', 'other'],
    },
    fileSize: { type: Number, required: true },
    originalFileName: { type: String, required: true },
    publicId: { type: String, default: '' }, // Cloudinary ID

    // Ownership & Category
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'notes',
        'assignments',
        'exams',
        'books',
        'papers',
        'presentations',
        'coding',
        'tutorials',
        'research',
        'projects',
        'other',
      ],
    },
    subject: { type: String, required: true, trim: true },
    course: { type: String, trim: true },
    institution: { type: String, trim: true },

    // Content Details
    tags: [{ type: String, trim: true }],
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' },
    language: { type: String, default: 'English' },

    // Analytics & Engagement
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    bookmarks: { type: Number, default: 0 },
    ratings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
        review: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    averageRating: { type: Number, default: 0 },

    // Comments & Discussions
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, required: true },
        replies: [
          {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
          },
        ],
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // Access Control
    visibility: { type: String, enum: ['public', 'private', 'restricted'], default: 'public' },
    allowedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    // Status
    status: { type: String, enum: ['draft', 'published', 'archived', 'flagged'], default: 'published' },
    moderationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
  },
  { timestamps: true }
);

// Study Group Schema
const studyGroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, maxlength: 1000 },
    subject: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['member', 'moderator', 'admin'], default: 'member' },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    maxMembers: { type: Number, default: 50 },
    isPrivate: { type: Boolean, default: false },
    inviteCode: { type: String, unique: true },

    // Schedule & Meetings
    meetings: [
      {
        title: String,
        description: String,
        scheduledAt: Date,
        duration: Number, // in minutes
        meetingUrl: String,
        attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      },
    ],

    // Resources
    sharedMaterials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }],

    // Activity
    discussions: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: { type: String, required: true },
        attachments: [String],
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Category Schema with Enhanced Features
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, default: '#6366F1' },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    materialCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Notification Schema
const notificationSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      enum: ['upload', 'download', 'comment', 'like', 'follow', 'mention', 'group_invite', 'system'],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    actionUrl: String,
    isRead: { type: Boolean, default: false },
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

// Activity Log Schema
const activitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: {
      type: String,
      enum: [
        'upload',
        'download',
        'bookmark',
        'comment',
        'rate',
        'follow',
        'join_group',
        'complete_goal',
        'earn_badge',
        'register',
        'update_profile',
        'update_goals',
        'logout',
      ],
      required: true,
    },
    targetType: { type: String, enum: ['material', 'user', 'group', 'goal', 'badge'] },
    targetId: mongoose.Schema.Types.ObjectId,
    points: { type: Number, default: 0 },
    details: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

// Analytics Schema
const analyticsSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true, unique: true },
    totalUsers: { type: Number, default: 0 },
    activeUsers: { type: Number, default: 0 },
    newUsers: { type: Number, default: 0 },
    totalMaterials: { type: Number, default: 0 },
    newMaterials: { type: Number, default: 0 },
    totalDownloads: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 },
    popularCategories: [
      {
        category: String,
        count: Number,
      },
    ],
    topUploaders: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        uploadCount: Number,
      },
    ],
  },
  { timestamps: true }
);

// Create and export models
export const User = mongoose.model('User', userSchema);
export const Material = mongoose.model('Material', materialSchema);
export const StudyGroup = mongoose.model('StudyGroup', studyGroupSchema);
export const Category = mongoose.model('Category', categorySchema);
export const Notification = mongoose.model('Notification', notificationSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const Analytics = mongoose.model('Analytics', analyticsSchema);

// Export all models as default object
export default {
  User,
  Material,
  StudyGroup,
  Category,
  Notification,
  Activity,
  Analytics,
};
