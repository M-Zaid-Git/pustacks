import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [materials, setMaterials] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'Computer Science',
    author: '',
    university: '',
    type: 'PDF',
    tags: '',
    file: null,
    thumbnail: '📊'
  });
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  // Check admin authentication
  useEffect(() => {
    const adminAuth = localStorage.getItem('zesho-admin-auth');
    const timestamp = localStorage.getItem('zesho-admin-timestamp');
    
    if (!adminAuth || !timestamp) {
      navigate('/admin/login');
      return;
    }

    // Check if session is older than 24 hours
    const sessionAge = Date.now() - parseInt(timestamp);
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    if (sessionAge > twentyFourHours) {
      localStorage.removeItem('zesho-admin-auth');
      localStorage.removeItem('zesho-admin-timestamp');
      navigate('/admin/login');
      return;
    }

    // Load existing materials from localStorage
    const storedMaterials = JSON.parse(localStorage.getItem('zesho-materials') || '[]');
    setMaterials(storedMaterials);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('zesho-admin-auth');
    localStorage.removeItem('zesho-admin-timestamp');
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadForm(prev => ({
      ...prev,
      file: file
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const newMaterial = {
        id: Date.now(),
        ...uploadForm,
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0,
        rating: 5.0,
        size: uploadForm.file ? `${(uploadForm.file.size / (1024 * 1024)).toFixed(1)} MB` : '0 MB',
        tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        adminUploaded: true
      };

      const updatedMaterials = [newMaterial, ...materials];
      setMaterials(updatedMaterials);
      
      // Save to localStorage
      localStorage.setItem('zesho-materials', JSON.stringify(updatedMaterials));

      // Reset form
      setUploadForm({
        title: '',
        description: '',
        category: 'Computer Science',
        author: '',
        university: '',
        type: 'PDF',
        tags: '',
        file: null,
        thumbnail: '📊'
      });
      
      setShowUploadForm(false);
      setIsUploading(false);
    }, 2000);
  };

  const handleDeleteMaterial = (id) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      const updatedMaterials = materials.filter(material => material.id !== id);
      setMaterials(updatedMaterials);
      localStorage.setItem('zesho-materials', JSON.stringify(updatedMaterials));
    }
  };

  const categories = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Business', 'Engineering', 'Biology'];
  const thumbnails = ['📊', '📐', '⚛️', '🧪', '🤖', '💼', '🧬', '⚙️', '📚', '🔬'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Admin Header */}
      <div className="bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ZESHO Admin Panel</h1>
                <p className="text-gray-300 text-sm">Material Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                View Site
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{materials.length}</p>
                <p className="text-gray-300">Total Materials</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  {materials.reduce((sum, material) => sum + (material.downloads || 0), 0)}
                </p>
                <p className="text-gray-300">Total Downloads</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  {materials.length > 0 ? (materials.reduce((sum, material) => sum + (material.rating || 0), 0) / materials.length).toFixed(1) : '0.0'}
                </p>
                <p className="text-gray-300">Avg. Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Material Upload</h2>
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200"
            >
              {showUploadForm ? 'Cancel Upload' : '+ Upload New Material'}
            </button>
          </div>

          {showUploadForm && (
            <form onSubmit={handleUpload} className="space-y-6 bg-black/20 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={uploadForm.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter material title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    name="category"
                    value={uploadForm.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category} className="bg-slate-800">
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={uploadForm.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Author name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">University</label>
                  <input
                    type="text"
                    name="university"
                    value={uploadForm.university}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="University name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <select
                    name="type"
                    value={uploadForm.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="PDF" className="bg-slate-800">PDF</option>
                    <option value="DOC" className="bg-slate-800">DOC</option>
                    <option value="PPT" className="bg-slate-800">PPT</option>
                    <option value="VIDEO" className="bg-slate-800">VIDEO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail</label>
                  <select
                    name="thumbnail"
                    value={uploadForm.thumbnail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {thumbnails.map(thumb => (
                      <option key={thumb} value={thumb} className="bg-slate-800">
                        {thumb}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={uploadForm.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter material description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={uploadForm.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Algorithms, Data Structures, Programming"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">File</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov"
                />
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isUploading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                    Uploading Material...
                  </div>
                ) : (
                  'Upload Material'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Materials List */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Uploaded Materials</h2>
          
          {materials.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-white mb-2">No materials uploaded yet</h3>
              <p className="text-gray-300">Upload your first material to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {materials.map((material) => (
                <div key={material.id} className="bg-black/20 rounded-xl p-6 border border-white/10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="text-3xl">{material.thumbnail}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{material.title}</h3>
                        <p className="text-gray-300 mb-3">{material.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg">
                            {material.category}
                          </span>
                          <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg">
                            {material.type}
                          </span>
                          {material.tags && material.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-600 text-white text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-400">
                          By {material.author} • {material.university} • {material.uploadDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm text-gray-300">
                        <div>{material.downloads} downloads</div>
                        <div>⭐ {material.rating}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteMaterial(material.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
