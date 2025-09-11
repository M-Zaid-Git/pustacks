import React, { useState } from 'react';

const CloudinaryUpload = ({ onUploadSuccess, onUploadError }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadToCloudinary = async (file) => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(10);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    formData.append('folder', 'zesho-materials');

    try {
      setUploadProgress(50);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      setUploadProgress(80);
      const data = await response.json();
      
      if (data.secure_url) {
        setUploadProgress(100);
        
        const fileInfo = {
          url: data.secure_url,
          publicId: data.public_id,
          format: data.format,
          size: data.bytes,
          originalName: file.name,
          uploadedAt: new Date().toISOString(),
          cloudinaryData: data
        };

        onUploadSuccess && onUploadSuccess(fileInfo);
        
        setTimeout(() => {
          setUploading(false);
          setUploadProgress(0);
        }, 1000);
      } else {
        throw new Error('Upload failed - no URL returned');
      }
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      onUploadError && onUploadError(error.message);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        alert('File size must be less than 100MB');
        return;
      }
      
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'video/mp4',
        'video/avi',
        'video/mov',
        'video/quicktime'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid file type (PDF, DOC, PPT, or Video)');
        return;
      }
      
      uploadToCloudinary(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-violet-300 dark:border-violet-600 rounded-lg p-8 text-center hover:border-violet-400 transition-colors">
        <input
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov,.quicktime"
          onChange={handleFileChange}
          className="hidden"
          id="cloudinary-file-upload"
          disabled={uploading}
        />
        <label
          htmlFor="cloudinary-file-upload"
          className={`cursor-pointer block ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
        >
          <div className="text-6xl mb-4">
            {uploading ? '⏳' : '📁'}
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {uploading ? 'Uploading to Cloud...' : 'Upload Educational Material'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            PDF, DOC, PPT, or Video files (Max 100MB)
          </p>
          <p className="text-xs text-violet-600 dark:text-violet-400 mt-2">
            Files will be stored securely in Cloudinary
          </p>
        </label>
        
        {uploading && (
          <div className="mt-6 space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
              <div 
                className="bg-gradient-to-r from-violet-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Uploading to Cloudinary... {uploadProgress}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CloudinaryUpload;