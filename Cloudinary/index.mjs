// Simple file to base64 converter for local demo
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// Working upload function - uses base64 for demo, can be easily switched to real Cloudinary
const CloudImageUpload = async (file, uploadPreset = null) => {
  try {
    console.log('🚀 Starting file upload...');
    console.log('📁 File:', file.name, '|', file.type, '|', (file.size / 1024).toFixed(1) + 'KB');

    // For now, use base64 conversion (works 100% of the time)
    const base64Url = await convertFileToBase64(file);
    
    // Create a unique ID for the file
    const fileId = `zesho_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store the file data in localStorage for demo
    const fileData = {
      id: fileId,
      name: file.name,
      type: file.type,
      size: file.size,
      base64: base64Url,
      uploadDate: new Date().toISOString(),
      url: base64Url // For images, we can use base64 directly as URL
    };
    
    // Save to localStorage
    const existingFiles = JSON.parse(localStorage.getItem('zesho-uploaded-files') || '[]');
    existingFiles.push(fileData);
    localStorage.setItem('zesho-uploaded-files', JSON.stringify(existingFiles));
    
    console.log('✅ File processed successfully!');
    
    return {
      success: true,
      url: base64Url, // This will work for images immediately
      public_id: fileId,
      resource_type: file.type.startsWith('image/') ? 'image' : 'raw',
      format: file.name.split('.').pop(),
      bytes: file.size,
      width: null, // Could be calculated for images if needed
      height: null,
      original_filename: file.name,
      created_at: new Date().toISOString(),
      storage: 'local' // Indicates this is stored locally
    };

  } catch (error) {
    console.error('💥 Upload failed:', error);
    
    return {
      success: false,
      error: error.message,
      details: error
    };
  }
};

// Keep the demo upload function as backup
const createDemoUpload = (file) => {
  console.log('🎭 Creating demo upload for:', file.name);
  
  // Create a demo URL (for testing purposes)
  const demoUrl = `https://via.placeholder.com/400x300/4f46e5/ffffff?text=${encodeURIComponent(file.name)}`;
  
  return {
    success: true,
    url: demoUrl,
    public_id: `demo_${Date.now()}`,
    resource_type: file.type.startsWith('image/') ? 'image' : 'raw',
    format: file.name.split('.').pop(),
    bytes: file.size,
    original_filename: file.name,
    created_at: new Date().toISOString(),
    demo: true
  };
};

// TODO: Real Cloudinary upload function (for when credentials are properly configured)
const realCloudinaryUpload = async (file) => {
  const cloudName = 'ZESHO';
  const uploadPreset = 'zesho_uploads'; // This needs to be created in Cloudinary dashboard
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      success: true,
      url: data.secure_url,
      public_id: data.public_id,
      // ... other data
    };
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    return { success: false, error: error.message };
  }
};

export default CloudImageUpload;
export { createDemoUpload, convertFileToBase64, realCloudinaryUpload };
