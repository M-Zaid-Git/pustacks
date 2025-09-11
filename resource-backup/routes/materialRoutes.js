import express from 'express';
import { protect, optionalAuth, authorize } from '../middleware/authMiddleware.js';
import { uploadMaterial, handleUploadError } from '../middleware/uploadMiddleware.js';
import {
  getAllMaterials,
  getMaterialById,
  uploadMaterial as uploadMaterialController,
  updateMaterial,
  deleteMaterial,
  recordDownload,
} from '../controllers/materialController.js';

const router = express.Router();

// Public routes (with optional auth)
router.get('/materials', optionalAuth, getAllMaterials);
router.get('/materials/:materialId', optionalAuth, getMaterialById);
router.post('/materials/:materialId/download', optionalAuth, recordDownload);

// Protected routes
router.post('/materials', protect, uploadMaterial, handleUploadError, uploadMaterialController);
router.put('/materials/:materialId', protect, updateMaterial);
router.delete('/materials/:materialId', protect, deleteMaterial);

export default router;
