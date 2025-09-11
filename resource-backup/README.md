# UniShare - Educational Resource Sharing Platform

![UniShare Logo](public/Favicon.webp)

UniShare is a comprehensive educational resource-sharing platform designed specifically for college students. It provides a central repository for study materials including lecture notes, textbooks, previous exam papers, interview preparation resources, and coding materials.

## New Features Added

- **MongoDB Integration**: Complete backend with MongoDB for data persistence
- **User Authentication**: Secure login and registration with JWT
- **Profile Management**: Edit profile details and upload profile pictures
- **Material Management**: Upload, view, edit, and delete educational materials
- **Search & Filter**: Find resources by category, subject, or keywords
- **Bookmarking**: Save favorite resources for quick access
- **Download Tracking**: Track downloaded resources

## Overview

Every year, students struggle to find the right resources for their exams and courses. They often spend valuable time contacting seniors and searching through scattered sources.

UniShare solves this problem by creating a centralized platform where students can easily access verified educational resources uploaded by administrators. The platform features a user-friendly interface with categories, search functionality, and a clean design.

## Features

- **Resource Repository**: Access to categorized educational materials
- **User Authentication**: Secure login and account management
- **Admin Panel**: For content management and user administration
- **Material Browsing**: Filter, sort, and search through available resources
- **PDF Viewer**: View documents directly in the browser
- **Dark Mode**: Eye-friendly dark theme option
- **Mobile Responsive**: Works seamlessly across devices

## Tech Stack

### Frontend

- **React**: [React](https://react.dev/) with [Vite](https://vitejs.dev/) for fast development
- **State Management**: Redux Toolkit for global state management
- **Styling**: [Tailwind CSS](https://tailwindcss.com) for responsive design
- **Routing**: React Router for navigation

### Backend

- **Server**: Node.js with Express for the API
- **Database**: MongoDB with Mongoose for data modeling
- **Authentication**: JWT (JSON Web Tokens) for secure authentication
- **File Storage**: Cloudinary for document and image uploads
- **File Processing**: Multer for handling multipart form data

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/) for version control
- [FaunaDB](https://fauna.com/) account for database (free tier supports 100k reads/day, 50k writes/day)
- IDE (recommendation: [VS Code](https://code.visualstudio.com/))

## Installation and Setup

### Prerequisites

- Node.js (v14+)
- MongoDB (local instance or MongoDB Atlas)
- Cloudinary account

### Local Development

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/unishare.git
   cd unishare
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:

   ```
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173

   # MongoDB Configuration
   MONGO_URI=mongodb://localhost:27017/resource-sharing
   # For MongoDB Atlas, use something like:
   # MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/resource-sharing?retryWrites=true&w=majority

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Create a `.env.development` file in the root directory for frontend configuration:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

5. Start development servers

   ```bash
   # Start backend and frontend concurrently
   npm run dev:full

   # Or start them separately
   npm run dev:server  # Backend only
   npm run dev         # Frontend only
   ```

6. Access the application at [localhost:5173](http://localhost:5173)

### Production Build

1. Build the project

   ```bash
   npm run build
   ```

2. Preview the production build locally
   ```bash
   npm run preview
   ```

## Deployment

## Netlify Deployment

### Option 1: Connect to GitHub Repository (Recommended)

1. Push your code to a GitHub repository
2. Log in to [Netlify](https://www.netlify.com/)
3. Click on "New site from Git" and select your GitHub repository
4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add your environment variables in the Netlify dashboard under Site settings > Build & Deploy > Environment variables
6. Click "Deploy site"

### Option 2: Manual Deployment

1. Build your project

   ```bash
   npm run build
   ```

2. Install the Netlify CLI

   ```bash
   npm install netlify-cli -g
   ```

3. Deploy using the CLI
   ```bash
   netlify deploy --prod
   ```

## MongoDB Atlas and Render.com Deployment

For a full-stack deployment, you can use MongoDB Atlas for your database and Render.com for hosting your Node.js backend:

1. **MongoDB Atlas Setup:**

   - Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Set up database access (username and password)
   - Configure network access (whitelist IP or allow access from anywhere for development)
   - Get your connection string from Atlas

2. **Backend Deployment on Render.com:**

   - Create a free account on [Render](https://render.com/)
   - Create a new Web Service
   - Connect your GitHub repository
   - Configure the build settings:
     - Build command: `npm install`
     - Start command: `npm start`
   - Add environment variables (MONGODB_URI, JWT_SECRET, etc.)
   - Deploy the service

3. **Update Frontend API URL:**
   - In your production environment, update `VITE_API_URL` to point to your Render.com backend URL

## API Endpoints

### Auth Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/change-password` - Change password

### User Routes

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/uploads` - Get user uploads
- `GET /api/users/downloads` - Get user downloads
- `GET /api/users/bookmarks` - Get user bookmarks
- `POST /api/users/bookmarks/:materialId` - Toggle bookmark

### Material Routes

- `GET /api/materials` - Get all materials
- `GET /api/materials/:materialId` - Get material by ID
- `POST /api/materials` - Upload new material
- `PUT /api/materials/:materialId` - Update material
- `DELETE /api/materials/:materialId` - Delete material
- `POST /api/materials/:materialId/download` - Record download

## Environment Variables

### Backend (.env)

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)
- `CLIENT_URL` - Frontend URL for CORS
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT generation
- `JWT_EXPIRE` - JWT expiration time
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### Frontend (.env.development)

- `VITE_API_URL` - Backend API URL

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
