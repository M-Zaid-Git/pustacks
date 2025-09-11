// apiService.js - A frontend-only service to replace API calls

import { mockDataFunctions, mockAuth } from './mockData.js';

// Categories API
export const getCategories = () => {
  return mockDataFunctions.getCategories();
};

// Materials API
export const getMaterials = () => {
  return mockDataFunctions.getMaterials();
};

export const getMaterialsByCategory = (categoryId) => {
  return mockDataFunctions.getMaterialsByCategory(categoryId);
};

export const getMaterial = (id) => {
  return mockDataFunctions.getMaterial(id);
};

export const searchMaterials = (query) => {
  return mockDataFunctions.searchMaterials(query);
};

// User API
export const getCurrentUser = () => {
  return Promise.resolve(mockAuth.getCurrentUser());
};

export const loginUser = (email, password) => {
  return mockAuth.signIn(email, password);
};

export const registerUser = (email, password, name) => {
  return mockAuth.signUp(email, password, name);
};

export const logoutUser = () => {
  return mockAuth.signOut();
};

export const resetPassword = (email) => {
  return mockAuth.resetPassword(email);
};

// Bookmarks API
export const getBookmarks = (userId) => {
  return mockDataFunctions.getUserBookmarks(userId);
};

export const addBookmark = (userId, materialId) => {
  return mockDataFunctions.addBookmark(userId, materialId);
};

export const removeBookmark = (userId, materialId) => {
  return mockDataFunctions.removeBookmark(userId, materialId);
};

// Downloads API
export const getDownloads = (userId) => {
  return mockDataFunctions.getUserDownloads(userId);
};

export const addDownload = (userId, materialId) => {
  return mockDataFunctions.addDownload(userId, materialId);
};

// Uploads API
export const getUploads = (userId) => {
  return mockDataFunctions.getUserUploads(userId);
};

// Default export
export default {
  getCategories,
  getMaterials,
  getMaterialsByCategory,
  getMaterial,
  searchMaterials,
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
  resetPassword,
  getBookmarks,
  addBookmark,
  removeBookmark,
  getDownloads,
  addDownload,
  getUploads,
};
