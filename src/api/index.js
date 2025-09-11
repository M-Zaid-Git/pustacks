import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization header to requests if token exists
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

// Handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const register = async (formData) => {
  try {
    const response = await api.post('/auth/register', formData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error registering user' };
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error logging in' };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error getting current user' };
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error processing forgot password request' };
  }
};

export const resetPassword = async (resetToken, password) => {
  try {
    const response = await api.post('/auth/reset-password', { resetToken, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error resetting password' };
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.post('/auth/change-password', { currentPassword, newPassword });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error changing password' };
  }
};

// User API
export const getProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error getting user profile' };
  }
};

export const updateProfile = async (formData) => {
  try {
    const response = await api.put('/users/profile', formData);
    // Update stored user data
    if (response.data.user) {
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...currentUser, ...response.data.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating profile' };
  }
};

export const getUserUploads = async () => {
  try {
    const response = await api.get('/users/uploads');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error getting user uploads' };
  }
};

export const getUserDownloads = async () => {
  try {
    const response = await api.get('/users/downloads');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error getting user downloads' };
  }
};

export const getUserBookmarks = async () => {
  try {
    const response = await api.get('/users/bookmarks');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error getting user bookmarks' };
  }
};

export const toggleBookmark = async (materialId) => {
  try {
    const response = await api.post(`/users/bookmarks/${materialId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error toggling bookmark' };
  }
};

// Materials API
export const getAllMaterials = async (params) => {
  try {
    const response = await api.get('/materials', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error getting materials' };
  }
};

export const getMaterialById = async (materialId) => {
  try {
    const response = await api.get(`/materials/${materialId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error getting material' };
  }
};

export const uploadMaterial = async (formData) => {
  try {
    const response = await api.post('/materials', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error uploading material' };
  }
};

export const updateMaterial = async (materialId, data) => {
  try {
    const response = await api.put(`/materials/${materialId}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating material' };
  }
};

export const deleteMaterial = async (materialId) => {
  try {
    const response = await api.delete(`/materials/${materialId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error deleting material' };
  }
};

export const recordDownload = async (materialId) => {
  try {
    const response = await api.post(`/materials/${materialId}/download`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error recording download' };
  }
};

// Admin API
export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching users' };
  }
};

export default {
  // Auth
  register,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  changePassword,

  // User
  getProfile,
  updateProfile,
  getUserUploads,
  getUserDownloads,
  getUserBookmarks,
  toggleBookmark,

  // Materials
  getAllMaterials,
  getMaterialById,
  uploadMaterial,
  updateMaterial,
  deleteMaterial,
  recordDownload,

  // Admin
  getAllUsers,
};
