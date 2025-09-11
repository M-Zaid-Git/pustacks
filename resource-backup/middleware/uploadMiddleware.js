import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create uploads directory if it doesn't exist
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    // Documents
    '.pdf',
    '.doc',
    '.docx',
    '.txt',
    '.rtf',
    '.odt',
    // Presentations
    '.ppt',
    '.pptx',
    // Spreadsheets
    '.xls',
    '.xlsx',
    '.csv',
    // Images
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
    '.svg',
    // Archives
    '.zip',
    '.rar',
    '.7z',
    // Code
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.html',
    '.css',
    '.py',
    '.java',
    '.c',
    '.cpp',
    // Videos
    '.mp4',
    '.webm',
    '.avi',
    '.mov',
  ];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type. Allowed types: ' + allowedFileTypes.join(', ')));
  }
};

// Limits
const limits = {
  fileSize: 50 * 1024 * 1024, // 50MB max file size
};

// Create multer instance
const upload = multer({
  storage,
  fileFilter,
  limits,
});

// Profile image upload middleware
export const uploadProfileImage = upload.single('profileImage');

// Material upload middleware
export const uploadMaterial = upload.single('file');

// Multiple files upload middleware
export const uploadMultipleFiles = upload.array('files', 5); // Maximum 5 files

// Error handling middleware for file uploads
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 50MB',
      });
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Too many files or wrong field name',
      });
    }

    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`,
    });
  } else if (err) {
    // Some other error occurred
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  next();
};

export default {
  uploadProfileImage,
  uploadMaterial,
  uploadMultipleFiles,
  handleUploadError,
};
