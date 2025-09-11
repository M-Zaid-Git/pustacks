import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload a file to Cloudinary
 * @param {string} filePath - The path to the file to upload
 * @param {string} folder - The folder to upload to (e.g., 'materials', 'profiles')
 * @returns {Promise<object>} - The Cloudinary upload result
 */
export const uploadFile = async (filePath, folder = 'materials') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `zesho/${folder}`,
      resource_type: 'auto',
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      timeout: 120000, // Increased timeout for larger files
    });
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Upload a base64 image to Cloudinary
 * @param {string} base64Image - The base64-encoded image data
 * @param {string} folder - The folder to upload to
 * @returns {Promise<object>} - The Cloudinary upload result
 */
export const uploadBase64Image = async (base64Image, folder = 'profiles') => {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: `zesho/${folder}`,
      resource_type: 'image',
      overwrite: true,
    });
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Generate a thumbnail for a PDF file
 * @param {string} pdfUrl - The URL of the PDF file
 * @returns {Promise<string>} - The URL of the generated thumbnail
 */
export const generatePdfThumbnail = async (pdfUrl) => {
  try {
    const result = await cloudinary.uploader.upload(pdfUrl, {
      folder: 'zesho/thumbnails',
      format: 'jpg',
      pages: 1, // Only first page
      transformation: [{ width: 300, crop: 'scale' }, { quality: 'auto' }],
    });
    return result.secure_url;
  } catch (error) {
    console.error('PDF thumbnail generation error:', error);
    throw error;
  }
};

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - The public ID of the file to delete
 * @returns {Promise<object>} - The Cloudinary deletion result
 */
export const deleteFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw error;
  }
};

export default cloudinary;
