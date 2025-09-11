import Material from '../models/Material.js';
import User from '../models/User.js';
import { uploadFile, generatePdfThumbnail, deleteFile } from '../config/cloudinary.js';
import fs from 'fs';
import path from 'path';

// Get all materials (with filtering and pagination)
export const getAllMaterials = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;

    // Build query
    const query = { visibility: 'public' };

    // Apply filters if provided
    if (req.query.category) query.category = req.query.category;
    if (req.query.fileType) query.fileType = req.query.fileType;
    if (req.query.subject) query.subject = new RegExp(req.query.subject, 'i');

    // Apply text search if provided
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Execute query with pagination
    const materials = await Material.find(query)
      .select('title description thumbnailUrl fileType category subject tags views downloads bookmarks createdAt owner')
      .populate('owner', 'name profileImage')
      .sort(req.query.sort || '-createdAt')
      .skip(startIndex)
      .limit(limit);

    // Get total count for pagination
    const total = await Material.countDocuments(query);

    // Pagination result
    const pagination = {
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      hasNext: startIndex + limit < total,
      hasPrev: startIndex > 0,
    };

    res.status(200).json({
      success: true,
      pagination,
      count: materials.length,
      data: materials,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Get a single material by ID
export const getMaterialById = async (req, res) => {
  try {
    const materialId = req.params.materialId;

    const material = await Material.findById(materialId).populate('owner', 'name profileImage institution role');

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found',
      });
    }

    // Check if material is private and user is not the owner
    if (material.visibility === 'private' && (!req.user || req.user.id !== material.owner.id)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this material',
      });
    }

    // Check if material is restricted and user is not allowed
    if (
      material.visibility === 'restricted' &&
      (!req.user || (!material.allowedUsers.includes(req.user.id) && req.user.id !== material.owner.id))
    ) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this material',
      });
    }

    // Increment view count if not the owner
    if (req.user && req.user.id !== material.owner.id) {
      material.views += 1;
      await material.save();
    }

    // Check if user has bookmarked this material
    let isBookmarked = false;
    if (req.user) {
      const user = await User.findById(req.user.id);
      isBookmarked = user.bookmarks.includes(materialId);
    }

    res.status(200).json({
      success: true,
      data: material,
      isBookmarked,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Upload new material
export const uploadMaterial = async (req, res) => {
  try {
    const { title, description, category, subject, tags, visibility, allowedUsers } = req.body;

    // Validate required fields
    if (!title || !description || !category || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file',
      });
    }

    // Get file details
    const file = req.file;
    const fileSize = file.size;
    const originalFileName = file.originalname;

    // Determine file type
    let fileType = 'other';
    const extension = path.extname(originalFileName).toLowerCase();

    if (['.pdf'].includes(extension)) fileType = 'pdf';
    else if (['.doc', '.docx', '.rtf', '.txt', '.odt'].includes(extension)) fileType = 'doc';
    else if (['.ppt', '.pptx'].includes(extension)) fileType = 'ppt';
    else if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'].includes(extension)) fileType = 'image';
    else if (['.mp4', '.webm', '.avi', '.mov'].includes(extension)) fileType = 'video';

    // Upload file to Cloudinary
    const uploadResult = await uploadFile(file.path, 'materials');

    // Generate thumbnail for PDF files
    let thumbnailUrl = '';
    if (fileType === 'pdf') {
      thumbnailUrl = await generatePdfThumbnail(uploadResult.secure_url);
    } else if (fileType === 'image') {
      thumbnailUrl = uploadResult.secure_url;
    } else {
      // Default thumbnail based on file type
      thumbnailUrl = `/icons/${fileType}-icon.svg`;
    }

    // Create new material
    const material = await Material.create({
      title,
      description,
      fileUrl: uploadResult.secure_url,
      thumbnailUrl,
      fileType,
      fileSize,
      originalFileName,
      publicId: uploadResult.public_id,
      owner: req.user.id,
      category,
      subject,
      tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
      visibility: visibility || 'public',
      allowedUsers: allowedUsers ? JSON.parse(allowedUsers) : [],
    });

    // Add to user's uploads
    const user = await User.findById(req.user.id);
    user.uploads.push(material._id);
    await user.save();

    // Clean up temporary file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    res.status(201).json({
      success: true,
      message: 'Material uploaded successfully',
      data: material,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Update material
export const updateMaterial = async (req, res) => {
  try {
    const materialId = req.params.materialId;
    const { title, description, category, subject, tags, visibility, allowedUsers } = req.body;

    // Find material
    const material = await Material.findById(materialId);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found',
      });
    }

    // Check ownership
    if (material.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this material',
      });
    }

    // Update fields
    if (title) material.title = title;
    if (description) material.description = description;
    if (category) material.category = category;
    if (subject) material.subject = subject;
    if (tags) material.tags = tags.split(',').map((tag) => tag.trim());
    if (visibility) material.visibility = visibility;
    if (allowedUsers) material.allowedUsers = JSON.parse(allowedUsers);

    await material.save();

    res.status(200).json({
      success: true,
      message: 'Material updated successfully',
      data: material,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Delete material
export const deleteMaterial = async (req, res) => {
  try {
    const materialId = req.params.materialId;

    // Find material
    const material = await Material.findById(materialId);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found',
      });
    }

    // Check ownership
    if (material.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this material',
      });
    }

    // Delete file from Cloudinary
    if (material.publicId) {
      await deleteFile(material.publicId);
    }

    // Delete material from database
    await Material.findByIdAndDelete(materialId);

    // Remove from user's uploads
    const user = await User.findById(material.owner);
    if (user) {
      user.uploads = user.uploads.filter((id) => id.toString() !== materialId);
      await user.save();
    }

    // Remove from all users' bookmarks and downloads
    await User.updateMany(
      { $or: [{ bookmarks: materialId }, { downloads: materialId }] },
      {
        $pull: {
          bookmarks: materialId,
          downloads: materialId,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: 'Material deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Record download
export const recordDownload = async (req, res) => {
  try {
    const materialId = req.params.materialId;

    // Find material
    const material = await Material.findById(materialId);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found',
      });
    }

    // Check permissions
    if (material.visibility === 'private' && (!req.user || req.user.id !== material.owner.toString())) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to download this material',
      });
    }

    if (
      material.visibility === 'restricted' &&
      (!req.user || (!material.allowedUsers.includes(req.user.id) && req.user.id !== material.owner.toString()))
    ) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to download this material',
      });
    }

    // Increment download count
    material.downloads += 1;
    await material.save();

    // Add to user's downloads if authenticated
    if (req.user) {
      const user = await User.findById(req.user.id);
      if (!user.downloads.includes(materialId)) {
        user.downloads.push(materialId);
        await user.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'Download recorded successfully',
      downloadUrl: material.fileUrl,
      downloadCount: material.downloads,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export default {
  getAllMaterials,
  getMaterialById,
  uploadMaterial,
  updateMaterial,
  deleteMaterial,
  recordDownload,
};
