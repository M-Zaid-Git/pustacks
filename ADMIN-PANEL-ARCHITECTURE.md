# Admin Panel Architecture for ZESHO Platform

## Overview

This document outlines the architecture for the ZESHO admin panel system that allows administrators to create posts with Google Drive links and manage categories for educational resources.

## Database Schema

### 1. Enhanced User Model

```javascript
// Add admin role to existing User model
role: {
  type: String,
  enum: ['student', 'professor', 'admin', 'super-admin'],
  default: 'student',
}
```

### 2. Category Model

```javascript
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    icon: {
      type: String, // Icon class or URL
      default: 'book',
    },
    color: {
      type: String, // Hex color code
      default: '#3B82F6',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
```

### 3. Post Model (Enhanced Material)

```javascript
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    googleDriveLink: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^https:\/\/drive\.google\.com\//.test(v);
        },
        message: 'Please provide a valid Google Drive link',
      },
    },
    downloadLink: {
      type: String, // Processed direct download link
    },
    fileType: {
      type: String,
      required: true,
      enum: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xlsx', 'txt', 'zip', 'rar'],
    },
    fileSize: {
      type: String, // e.g., "2.5 MB"
    },
    thumbnailUrl: {
      type: String,
      default: '/placeholder-book.svg',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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
  { timestamps: true }
);
```

## API Routes Structure

### Admin Authentication Routes

- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/profile` - Get admin profile
- `PUT /api/admin/profile` - Update admin profile

### Category Management Routes

- `GET /api/admin/categories` - Get all categories
- `POST /api/admin/categories` - Create new category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category
- `GET /api/categories` - Public: Get active categories

### Post Management Routes

- `GET /api/admin/posts` - Get all posts (with pagination)
- `POST /api/admin/posts` - Create new post
- `PUT /api/admin/posts/:id` - Update post
- `DELETE /api/admin/posts/:id` - Delete post
- `GET /api/admin/posts/:id` - Get single post for editing
- `PUT /api/admin/posts/:id/publish` - Toggle publish status
- `PUT /api/admin/posts/:id/feature` - Toggle featured status

### Public Routes

- `GET /api/posts` - Get published posts (with filters)
- `GET /api/posts/category/:slug` - Get posts by category
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id/view` - Increment view count
- `PUT /api/posts/:id/download` - Increment download count

## Frontend Admin Panel Structure

### Admin Panel Pages

1. **Dashboard** (`/admin`)

   - Overview statistics
   - Recent posts
   - Quick actions

2. **Posts Management** (`/admin/posts`)

   - Posts list with search/filter
   - Create new post
   - Edit existing posts

3. **Categories Management** (`/admin/categories`)

   - Categories list
   - Create/edit categories
   - Category settings

4. **Analytics** (`/admin/analytics`)
   - Download statistics
   - Popular posts
   - User engagement metrics

### Admin Panel Components

- `AdminLayout.jsx` - Main layout with sidebar
- `AdminSidebar.jsx` - Navigation sidebar
- `PostForm.jsx` - Create/edit post form
- `CategoryForm.jsx` - Create/edit category form
- `PostsList.jsx` - Posts management table
- `CategoriesList.jsx` - Categories management
- `AdminDashboard.jsx` - Overview dashboard
- `GoogleDriveInput.jsx` - Special input for Drive links

## Predefined Categories

```javascript
const defaultCategories = [
  {
    name: 'Programming Fundamentals',
    slug: 'programming-fundamentals',
    description: 'Basic programming concepts and languages',
    icon: 'code',
    color: '#10B981',
  },
  {
    name: 'Computer Networks',
    slug: 'computer-networks',
    description: 'CN, networking protocols, and communication',
    icon: 'network',
    color: '#3B82F6',
  },
  {
    name: 'Object Oriented Programming',
    slug: 'object-oriented-programming',
    description: 'OOP concepts, design patterns, and implementation',
    icon: 'object',
    color: '#8B5CF6',
  },
  {
    name: 'Ideology',
    slug: 'ideology',
    description: 'Pakistan Studies, Islamic Studies, and related subjects',
    icon: 'book',
    color: '#F59E0B',
  },
  {
    name: 'Applied Physics',
    slug: 'applied-physics',
    description: 'Physics concepts and applications',
    icon: 'atom',
    color: '#EF4444',
  },
];
```

## Google Drive Integration Features

### Drive Link Processing

- Extract file ID from Google Drive share links
- Generate direct download links
- Validate link accessibility
- Extract file metadata (name, size, type)

### Link Formats Supported

- `https://drive.google.com/file/d/FILE_ID/view`
- `https://drive.google.com/open?id=FILE_ID`
- `https://docs.google.com/document/d/FILE_ID/`

### Auto-Processing

- Convert share links to direct download links
- Extract file information automatically
- Generate appropriate thumbnails based on file type

## Security Features

### Admin Authentication

- JWT-based authentication
- Role-based access control
- Session management
- Password hashing with bcrypt

### Route Protection

- Admin-only middleware
- Input validation
- File type validation
- Rate limiting on admin routes

### Data Validation

- Google Drive link validation
- File type restrictions
- Input sanitization
- XSS protection

## Implementation Priority

1. **Phase 1**: Database models and basic API routes
2. **Phase 2**: Admin authentication and middleware
3. **Phase 3**: Category management system
4. **Phase 4**: Post creation and management
5. **Phase 5**: Admin panel UI components
6. **Phase 6**: Frontend integration and testing

## Benefits of This Architecture

1. **Scalability**: Easy to add new categories and post types
2. **Security**: Proper authentication and authorization
3. **Flexibility**: Google Drive integration allows unlimited storage
4. **User Experience**: Clean admin interface for content management
5. **Performance**: Efficient database queries and caching support
6. **Maintainability**: Well-structured code with clear separation of concerns

This architecture provides a solid foundation for your admin panel with Google Drive integration and category management system.
