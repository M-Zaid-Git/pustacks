// Enhanced API Service for ZESHO Educational Platform
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Register user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Verify token
  verifyToken: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, password) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },
};

// User API
export const userAPI = {
  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  // Get user dashboard stats
  getDashboardStats: async () => {
    const response = await api.get('/users/dashboard-stats');
    return response.data;
  },

  // Get user activity
  getActivity: async (page = 1, limit = 10) => {
    const response = await api.get(`/users/activity?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Update study goals
  updateStudyGoals: async (goals) => {
    const response = await api.put('/users/study-goals', { goals });
    return response.data;
  },

  // Get user analytics
  getAnalytics: async (period = '7d') => {
    const response = await api.get(`/users/analytics?period=${period}`);
    return response.data;
  },

  // Update preferences
  updatePreferences: async (preferences) => {
    const response = await api.put('/users/preferences', preferences);
    return response.data;
  },

  // Upload profile image
  uploadProfileImage: async (formData) => {
    const response = await api.post('/users/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Materials API
export const materialsAPI = {
  // Get all materials with filters
  getMaterials: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/materials?${queryParams}`);
    return response.data;
  },

  // Get material by ID
  getMaterial: async (id) => {
    const response = await api.get(`/materials/${id}`);
    return response.data;
  },

  // Upload new material
  uploadMaterial: async (formData) => {
    const response = await api.post('/materials/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update material
  updateMaterial: async (id, materialData) => {
    const response = await api.put(`/materials/${id}`, materialData);
    return response.data;
  },

  // Delete material
  deleteMaterial: async (id) => {
    const response = await api.delete(`/materials/${id}`);
    return response.data;
  },

  // Download material
  downloadMaterial: async (id) => {
    const response = await api.post(`/materials/${id}/download`);
    return response.data;
  },

  // Bookmark material
  bookmarkMaterial: async (id) => {
    const response = await api.post(`/materials/${id}/bookmark`);
    return response.data;
  },

  // Remove bookmark
  removeBookmark: async (id) => {
    const response = await api.delete(`/materials/${id}/bookmark`);
    return response.data;
  },

  // Rate material
  rateMaterial: async (id, rating, review = '') => {
    const response = await api.post(`/materials/${id}/rate`, { rating, review });
    return response.data;
  },

  // Add comment
  addComment: async (id, content) => {
    const response = await api.post(`/materials/${id}/comments`, { content });
    return response.data;
  },

  // Get user's uploaded materials
  getUserMaterials: async (page = 1, limit = 10) => {
    const response = await api.get(`/materials/user?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get user's bookmarked materials
  getBookmarkedMaterials: async (page = 1, limit = 10) => {
    const response = await api.get(`/materials/bookmarks?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Search materials
  searchMaterials: async (query, filters = {}) => {
    const params = { q: query, ...filters };
    const queryParams = new URLSearchParams(params).toString();
    const response = await api.get(`/materials/search?${queryParams}`);
    return response.data;
  },

  // Get recommended materials
  getRecommendedMaterials: async (limit = 10) => {
    const response = await api.get(`/materials/recommendations?limit=${limit}`);
    return response.data;
  },

  // Get trending materials
  getTrendingMaterials: async (period = '7d', limit = 10) => {
    const response = await api.get(`/materials/trending?period=${period}&limit=${limit}`);
    return response.data;
  },
};

// Categories API
export const categoriesAPI = {
  // Get all categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get category by slug
  getCategory: async (slug) => {
    const response = await api.get(`/categories/${slug}`);
    return response.data;
  },

  // Get materials by category
  getCategoryMaterials: async (slug, page = 1, limit = 10) => {
    const response = await api.get(`/categories/${slug}/materials?page=${page}&limit=${limit}`);
    return response.data;
  },
};

// Study Groups API
export const studyGroupsAPI = {
  // Get all study groups
  getStudyGroups: async (page = 1, limit = 10) => {
    const response = await api.get(`/study-groups?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get study group by ID
  getStudyGroup: async (id) => {
    const response = await api.get(`/study-groups/${id}`);
    return response.data;
  },

  // Create study group
  createStudyGroup: async (groupData) => {
    const response = await api.post('/study-groups', groupData);
    return response.data;
  },

  // Join study group
  joinStudyGroup: async (id, inviteCode = '') => {
    const response = await api.post(`/study-groups/${id}/join`, { inviteCode });
    return response.data;
  },

  // Leave study group
  leaveStudyGroup: async (id) => {
    const response = await api.delete(`/study-groups/${id}/leave`);
    return response.data;
  },

  // Get user's study groups
  getUserStudyGroups: async () => {
    const response = await api.get('/study-groups/user');
    return response.data;
  },

  // Add message to study group
  addMessage: async (id, message) => {
    const response = await api.post(`/study-groups/${id}/messages`, { message });
    return response.data;
  },

  // Schedule meeting
  scheduleMeeting: async (id, meetingData) => {
    const response = await api.post(`/study-groups/${id}/meetings`, meetingData);
    return response.data;
  },
};

// Notifications API
export const notificationsAPI = {
  // Get user notifications
  getNotifications: async (page = 1, limit = 20) => {
    const response = await api.get(`/notifications?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const response = await api.put('/notifications/mark-all-read');
    return response.data;
  },

  // Get unread count
  getUnreadCount: async () => {
    const response = await api.get('/notifications/unread-count');
    return response.data;
  },
};

// Analytics API
export const analyticsAPI = {
  // Get platform analytics (admin only)
  getPlatformAnalytics: async (period = '30d') => {
    const response = await api.get(`/analytics/platform?period=${period}`);
    return response.data;
  },

  // Get user analytics
  getUserAnalytics: async (period = '30d') => {
    const response = await api.get(`/analytics/user?period=${period}`);
    return response.data;
  },

  // Track user activity
  trackActivity: async (action, targetType, targetId, metadata = {}) => {
    const response = await api.post('/analytics/track', {
      action,
      targetType,
      targetId,
      metadata,
    });
    return response.data;
  },
};

// Utility functions
export const utils = {
  // Format file size
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Format date
  formatDate: (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  // Format relative time
  formatRelativeTime: (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }

    return 'Just now';
  },

  // Get file icon based on file type
  getFileIcon: (fileType) => {
    const icons = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      ppt: '📊',
      pptx: '📊',
      xlsx: '📊',
      txt: '📄',
      image: '🖼️',
      video: '🎥',
      audio: '🎵',
      zip: '📦',
      other: '📁',
    };
    return icons[fileType] || icons.other;
  },
};

export default api;
