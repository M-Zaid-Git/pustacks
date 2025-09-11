import React, { useState } from 'react';
import CloudImageUpload, { createDemoUpload } from '../../../Cloudinary/index.mjs';

const UploadModal = ({ isOpen, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [useDemoMode, setUseDemoMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: ''
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const testCloudinaryConnection = async () => {
    try {
      console.log('🧪 Testing Cloudinary connection...');
      
      // Create a small test file
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#4f46e5';
      ctx.fillRect(0, 0, 100, 100);
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px Arial';
      ctx.fillText('TEST', 25, 55);
      
      canvas.toBlob(async (blob) => {
        const testFile = new File([blob], 'test-connection.png', { type: 'image/png' });
        console.log('📁 Created test file:', testFile.name, testFile.size + ' bytes');
        
        const result = await CloudImageUpload(testFile);
        console.log('🔍 Test result:', result);
        
        if (result.success) {
          alert(`✅ Cloudinary test successful!\n\nFile uploaded: ${testFile.name}\nURL: ${result.url}\n\n${result.demo ? 'Note: This was a demo upload for testing.' : 'Real Cloudinary upload working!'}`);
          if (!result.demo) {
            setUseDemoMode(false);
          }
        } else {
          alert(`❌ Cloudinary test failed!\n\nError: ${result.error}\n\nSuggestion: ${result.suggestion || 'Check your Cloudinary configuration'}\n\nWould you like to enable demo mode instead?`);
          setUseDemoMode(true);
        }
      }, 'image/png');
      
    } catch (error) {
      console.error('💥 Test failed:', error);
      alert(`❌ Connection test failed: ${error.message}\n\nWe'll enable demo mode for testing.`);
      setUseDemoMode(true);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles.length || !formData.title) {
      alert('Please select files and provide a title');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadedFiles([]);

    try {
      console.log('Starting upload process...');
      console.log('Environment variables check:');
      console.log('VITE_CLOUDINARY_UPLOAD_PRESET:', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      console.log('VITE_CLOUDINARY_CLOUD_NAME:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      const uploadResults = [];
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        console.log(`📤 Uploading file ${i + 1}/${selectedFiles.length}:`, file.name);
        
        // Update progress for this file
        const fileProgress = (i / selectedFiles.length) * 90; // Leave 10% for completion
        setUploadProgress(fileProgress);

        let result;
        
        // Try Cloudinary upload first, fall back to demo if needed
        if (useDemoMode) {
          console.log('🎭 Using demo mode for:', file.name);
          result = createDemoUpload(file);
        } else {
          result = await CloudImageUpload(file);
          
          // If Cloudinary fails, switch to demo mode
          if (!result.success) {
            console.log('⚠️ Cloudinary failed, switching to demo mode');
            setUseDemoMode(true);
            result = createDemoUpload(file);
          }
        }
        
        console.log('📋 Upload result:', result);
        
        if (!result.success) {
          throw new Error(`Failed to upload ${file.name}: ${result.error}`);
        }

        if (!result.url) {
          throw new Error(`No URL returned for ${file.name}`);
        }

        uploadResults.push({
          name: file.name,
          url: result.url,
          public_id: result.public_id,
          format: result.format,
          size: result.bytes || file.size,
          resource_type: result.resource_type,
          demo: result.demo || false
        });
      }

      console.log('All uploads completed:', uploadResults);
      setUploadedFiles(uploadResults);
      setUploadProgress(100);

      // Create upload record
      const newUpload = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        category: formData.category || 'General',
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        files: uploadResults,
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0,
        rating: 0,
        status: 'Active',
        type: uploadResults[0]?.resource_type === 'image' ? 'Image' : 'Document',
        size: `${(uploadResults.reduce((acc, file) => acc + (file.size || 0), 0) / (1024 * 1024)).toFixed(1)} MB`,
        author: 'Current User',
        university: 'Your University',
        thumbnail: uploadResults[0]?.resource_type === 'image' ? uploadResults[0].url : '📄'
      };

      // Store in localStorage for demo
      const existingUploads = JSON.parse(localStorage.getItem('zesho-user-uploads') || '[]');
      existingUploads.unshift(newUpload);
      localStorage.setItem('zesho-user-uploads', JSON.stringify(existingUploads));

      // Also add to materials list for browsing
      const existingMaterials = JSON.parse(localStorage.getItem('zesho-materials') || '[]');
      const materialEntry = {
        ...newUpload,
        fileUrl: uploadResults[0]?.url
      };
      existingMaterials.unshift(materialEntry);
      localStorage.setItem('zesho-materials', JSON.stringify(existingMaterials));

      alert(`✅ Successfully uploaded ${uploadResults.length} file(s)!${uploadResults.some(f => f.demo) ? '\n\n📝 Note: Demo mode was used for testing.' : '\n\n🎉 Real Cloudinary uploads!'}`);
      
      // Reset form
      setSelectedFiles([]);
      setFormData({ title: '', description: '', category: '', tags: '' });
      setIsUploading(false);
      setUploadProgress(0);
      setUploadedFiles([]);
      onClose();
      
      // Reload page to show new upload
      window.location.reload();

    } catch (error) {
      console.error('Upload error:', error);
      alert(`❌ Upload failed: ${error.message}\n\nCheck console for details.`);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Resource</h2>
            {useDemoMode && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                Demo Mode
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* File Upload Area */}
          <div 
            className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-8 text-center hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div className="mb-4">
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                Drop files here or click to browse
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                PDF, DOC, PPT, or image files up to 50MB
              </p>
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 cursor-pointer transition-colors"
            >
              Select Files
            </label>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-white">Selected Files:</h3>
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {(file.size / (1024 * 1024)).toFixed(1)} MB
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="Enter resource title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="Describe your resource"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select category</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploading...</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-slate-700">
          <button
            onClick={testCloudinaryConnection}
            className="px-4 py-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Test Connection
          </button>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!selectedFiles.length || !formData.title || isUploading}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isUploading ? 'Uploading...' : 'Upload Resource'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
