# 🗄️ ZESHO Database Setup Guide

## 📋 Overview
Your ZESHO educational platform now has a comprehensive database infrastructure ready for deployment! Here's what's been set up:

## ✅ What's Complete

### 🏗️ Database Architecture
- **Enhanced User Schema** with gamification features
- **Material Management** with advanced analytics
- **Study Groups** with meeting scheduling
- **Activity Tracking** with points system
- **Notifications** system
- **Categories** with hierarchical structure
- **Analytics** for platform insights

### 🔧 Backend Infrastructure
- **Express.js Server** (`server-enhanced.js`)
- **Authentication System** with JWT
- **API Routes** for all dashboard features
- **Enhanced API Service** (`src/services/apiService.js`)
- **Middleware** for security and uploads
- **Database Models** with relationships

### 📦 Dependencies Installed
```json
{
  "axios": "API communication",
  "bcryptjs": "Password hashing",
  "express": "Web server framework",
  "mongoose": "MongoDB ODM",
  "jsonwebtoken": "Authentication",
  "cors": "Cross-origin requests",
  "helmet": "Security headers",
  "multer": "File uploads",
  "nodemailer": "Email service",
  "cloudinary": "File storage"
}
```

## 🚀 Quick Start Options

### Option 1: MongoDB Atlas (Cloud - Recommended)
1. **Create free account** at [MongoDB Atlas](https://cloud.mongodb.com)
2. **Create cluster** (free tier available)
3. **Get connection string** from "Connect" > "Connect your application"
4. **Update .env file**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zesho-platform
   ```

### Option 2: Local MongoDB
1. **Install MongoDB** from [mongodb.com](https://www.mongodb.com/try/download/community)
2. **Start MongoDB service**:
   ```powershell
   # Windows Service
   net start MongoDB
   
   # Or run directly
   mongod --dbpath C:\data\db
   ```
3. **Database will connect** to `mongodb://localhost:27017/zesho-platform`

### Option 3: Docker (Quick Setup)
```powershell
# Run MongoDB in Docker container
docker run -d -p 27017:27017 --name zesho-mongo mongo:latest
```

## 🎯 Running the Platform

### 1. Database Setup
```powershell
# After MongoDB is running
cd "d:\ResourceWebsite\resource-sharing-master"
node setup-enhanced-database.js
```

### 2. Start Development
```powershell
# Option A: Full stack (frontend + backend)
npm run dev:full

# Option B: Frontend only
npm run dev

# Option C: Backend only  
npm run server:dev
```

### 3. Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

## 🔐 Default Admin Account
```
Email: admin@zesho.edu
Password: admin123
```
**⚠️ Change this password after first login!**

## 📊 Dashboard Features Available

### ✅ User Dashboard
- **Profile Management** with level progression
- **Activity Tracking** with points/badges
- **Study Goals** with progress tracking
- **Content Management** (uploads/bookmarks)
- **Analytics** with visual charts
- **Leaderboard** and social features

### ✅ Content System
- **File Upload/Download** with analytics
- **Categories & Tags** for organization
- **Rating & Review** system
- **Comments & Discussions**
- **Bookmarking** and favorites

### ✅ Gamification
- **Points System** (uploads, downloads, engagement)
- **Level Progression** (Beginner → Expert → Master)
- **Badges & Achievements**
- **Daily Streaks** tracking
- **Leaderboards** for motivation

## 🔧 Configuration

### Environment Variables (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/zesho-platform

# Authentication
JWT_SECRET=your-secure-secret-key

# API Configuration
VITE_API_URL=http://localhost:5000/api
```

### File Upload Setup (Optional)
For file uploads, configure Cloudinary:
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 📈 Database Collections

### Created Automatically:
- `users` - Student/teacher profiles with gamification
- `materials` - Educational content with analytics
- `categories` - Subject organization
- `studygroups` - Collaborative learning groups
- `activities` - User action tracking
- `notifications` - System and user notifications
- `analytics` - Platform usage statistics

## 🛠️ Troubleshooting

### Database Connection Issues
```powershell
# Check if MongoDB is running
mongosh "mongodb://localhost:27017/zesho-platform"

# Or check service status
Get-Service MongoDB
```

### Port Conflicts
- Frontend (5173): Change in `vite.config.js`
- Backend (5000): Change `PORT` in `.env`

### Dependency Issues
```powershell
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 🎉 Next Steps

1. **Start MongoDB** (Atlas or local)
2. **Run database setup**: `node setup-enhanced-database.js`
3. **Start development**: `npm run dev:full`
4. **Access dashboard**: Login and visit `/dashboard`
5. **Test features**: Upload content, set goals, track progress!

Your ZESHO platform is now ready for full functionality! 🚀
