import User from '../models/User.js';
import Material from '../models/Material.js';
import jwt from 'jsonwebtoken';
import { uploadBase64Image } from '../config/cloudinary.js';

// Get current user profile
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .select('-password -__v')
      .populate('bookmarks', 'title thumbnailUrl fileType category subject')
      .populate('uploads', 'title thumbnailUrl fileType views downloads bookmarks createdAt');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
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

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, bio, institution, department, yearOfStudy, socialLinks, profileImage } = req.body;

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (institution) user.institution = institution;
    if (department) user.department = department;
    if (yearOfStudy) user.yearOfStudy = yearOfStudy;

    // Update social links if provided
    if (socialLinks) {
      if (socialLinks.linkedin !== undefined) user.socialLinks.linkedin = socialLinks.linkedin;
      if (socialLinks.github !== undefined) user.socialLinks.github = socialLinks.github;
      if (socialLinks.website !== undefined) user.socialLinks.website = socialLinks.website;
    }

    // Upload profile image if provided as base64
    if (profileImage && profileImage.startsWith('data:image')) {
      const uploadResult = await uploadBase64Image(profileImage, 'profiles');
      user.profileImage = uploadResult.secure_url;
    }

    await user.save();

    // Return updated user without sensitive info
    const updatedUser = await User.findById(userId).select('-password -__v');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
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

// Change password
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Validate request
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new passwords',
      });
    }

    // Find user with password
    const user = await User.findById(userId).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if current password is correct
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
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

// Get user's bookmarks
export const getUserBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .select('bookmarks')
      .populate({
        path: 'bookmarks',
        select:
          'title description fileUrl thumbnailUrl fileType category subject tags views downloads bookmarks createdAt owner',
        populate: {
          path: 'owner',
          select: 'name profileImage',
        },
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      count: user.bookmarks.length,
      data: user.bookmarks,
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

// Get user's uploads
export const getUserUploads = async (req, res) => {
  try {
    const userId = req.user.id;

    const uploads = await Material.find({ owner: userId })
      .select(
        'title description fileUrl thumbnailUrl fileType category subject tags views downloads bookmarks createdAt'
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: uploads.length,
      data: uploads,
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

// Get user's downloads
export const getUserDownloads = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .select('downloads')
      .populate({
        path: 'downloads',
        select:
          'title description fileUrl thumbnailUrl fileType category subject tags views downloads bookmarks createdAt owner',
        populate: {
          path: 'owner',
          select: 'name profileImage',
        },
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      count: user.downloads.length,
      data: user.downloads,
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

// Toggle bookmark for material
export const toggleBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const materialId = req.params.materialId;

    // Find user and material
    const user = await User.findById(userId);
    const material = await Material.findById(materialId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found',
      });
    }

    // Check if material is already bookmarked
    const isBookmarked = user.bookmarks.includes(materialId);

    if (isBookmarked) {
      // Remove bookmark
      user.bookmarks = user.bookmarks.filter((id) => id.toString() !== materialId);
      material.bookmarks -= 1;
    } else {
      // Add bookmark
      user.bookmarks.push(materialId);
      material.bookmarks += 1;
    }

    await user.save();
    await material.save();

    res.status(200).json({
      success: true,
      message: isBookmarked ? 'Bookmark removed' : 'Bookmark added',
      isBookmarked: !isBookmarked,
      bookmarkCount: material.bookmarks,
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

// Get user by ID (public profile)
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select('name profileImage institution department role bio socialLinks');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Get user's public uploads
    const uploads = await Material.find({
      owner: userId,
      visibility: 'public',
    })
      .select('title thumbnailUrl fileType category subject views downloads bookmarks createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        user,
        uploads,
        uploadsCount: uploads.length,
      },
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
  getCurrentUser,
  updateProfile,
  changePassword,
  getUserBookmarks,
  getUserUploads,
  getUserDownloads,
  toggleBookmark,
  getUserById,
};
