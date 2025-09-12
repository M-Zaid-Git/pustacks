import React, { useState } from 'react';
import CloudImageUpload from '../../../Cloudinary/index.mjs';

const SimpleUploadModal = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', 'uploading'
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus(null);
      setUploadMessage('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus(null);
      setUploadMessage('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadStatus('uploading');
    setUploadMessage('Processing your file...');

    try {
      console.log('🚀 Starting upload...');
      const result = await CloudImageUpload(selectedFile);

      console.log('📤 Upload result:', result);

      if (result.success && result.url) {
        setUploadStatus('success');
        setUploadMessage(
          result.storage === 'local'
            ? 'File processed successfully! (Using local storage)'
            : 'File uploaded to cloud successfully!'
        );

        // Save to localStorage for the app
        const uploadData = {
          id: result.public_id || `file_${Date.now()}`,
          title: selectedFile.name,
          type: selectedFile.type.startsWith('image/') ? 'image' : 'document',
          subject: 'General',
          year: new Date().getFullYear(),
          uploadedBy: 'Current User',
          uploadDate: new Date().toISOString(),
          url: result.url,
          size: result.bytes || selectedFile.size,
          format: result.format || selectedFile.name.split('.').pop(),
          storage: result.storage || 'cloud',
        };

        const existingUploads = JSON.parse(localStorage.getItem('userUploads') || '[]');
        existingUploads.push(uploadData);
        localStorage.setItem('userUploads', JSON.stringify(existingUploads));

        console.log('✅ Upload saved to localStorage:', uploadData);

        // Auto-close after success
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        throw new Error(result.error || 'Upload failed - no URL returned');
      }
    } catch (error) {
      console.error('❌ Upload error:', error);
      setUploadStatus('error');
      setUploadMessage(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setUploading(false);
    setUploadStatus(null);
    setUploadMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Upload Resource</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 text-xl" disabled={uploading}>
            ✕
          </button>
        </div>

        {/* File Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            selectedFile ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {selectedFile ? (
            <div>
              <div className="text-green-600 mb-2 text-2xl">✓</div>
              <div className="font-medium text-gray-800">{selectedFile.name}</div>
              <div className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</div>
            </div>
          ) : (
            <div>
              <div className="text-gray-400 mb-2 text-3xl">📁</div>
              <p className="text-gray-600 font-medium">Drop your file here or click to browse</p>
              <p className="text-sm text-gray-400 mt-1">Supports images, PDFs, documents</p>
            </div>
          )}
        </div>

        {/* File Input */}
        <input
          type="file"
          onChange={handleFileSelect}
          accept="image/*,.pdf,.doc,.docx,.txt,.ppt,.pptx"
          className="hidden"
          id="fileInput"
          disabled={uploading}
        />

        {!selectedFile && (
          <label
            htmlFor="fileInput"
            className="block w-full mt-4 py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-center cursor-pointer font-medium transition-colors"
          >
            Choose File
          </label>
        )}

        {/* Upload Status */}
        {uploadMessage && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm ${
              uploadStatus === 'success'
                ? 'bg-green-100 text-green-700 border border-green-200'
                : uploadStatus === 'error'
                ? 'bg-red-100 text-red-700 border border-red-200'
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}
          >
            <div className="font-medium">
              {uploadStatus === 'success' ? '✅ Success!' : uploadStatus === 'error' ? '❌ Error:' : '⏳ Processing...'}
            </div>
            <div className="mt-1">{uploadMessage}</div>
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full animate-pulse transition-all duration-500"
                style={{ width: '70%' }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1 text-center">Processing file...</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            disabled={uploading}
          >
            Cancel
          </button>
          {selectedFile && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                uploading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          )}
        </div>

        {/* Info */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>How it works:</strong> Files are processed and stored securely. For images, you'll see a preview
            immediately. For documents, a placeholder is used for demonstration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleUploadModal;
