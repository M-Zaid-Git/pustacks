import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMaterials, uploadMaterial, deleteMaterial } from '../../redux/materialReducer';
import api from '../../api';

const AdminPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const { materials, isLoading: materialsLoading } = useSelector((state) => state.material);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    description: '',
    category: 'books',
    subject: '',
    file: null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Check if current user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (isLoading) return;

      if (!isAuthenticated || !user) {
        navigate('/login');
        return;
      }

      // Check if user email matches admin email or role is admin
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      if (user.email === adminEmail || user.role === 'admin') {
        setIsAdmin(true);
      } else {
        // Redirect non-admin users
        navigate('/');
      }
    };

    checkAdmin();
  }, [user, isLoading, isAuthenticated, navigate]);

  // Fetch materials and users when admin is verified
  useEffect(() => {
    if (isAdmin) {
      dispatch(getAllMaterials());
      fetchUsers();
    }
  }, [isAdmin, dispatch]);

  const fetchUsers = async () => {
    try {
      // This would normally be a Redux action, but for simplicity we're using API directly
      const response = await api.getAllUsers();
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleFileChange = (e) => {
    setNewMaterial({
      ...newMaterial,
      file: e.target.files[0],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial({
      ...newMaterial,
      [name]: value,
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!newMaterial.file || !newMaterial.title || !newMaterial.subject) {
      alert('Please fill all required fields');
      return;
    }

    setIsUploading(true);

    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('file', newMaterial.file);
      formData.append('title', newMaterial.title);
      formData.append('description', newMaterial.description);
      formData.append('category', newMaterial.category);
      formData.append('subject', newMaterial.subject);

      // Upload using Redux action
      const resultAction = await dispatch(uploadMaterial(formData));

      if (uploadMaterial.fulfilled.match(resultAction)) {
        // Reset form on success
        setNewMaterial({
          title: '',
          description: '',
          category: 'books',
          subject: '',
          file: null,
        });
        setUploadProgress(0);

        // Refresh materials list
        dispatch(getAllMaterials());
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error in upload process:', error);
      alert('Upload failed: ' + (error.message || 'Unknown error'));
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteMaterial = async (material) => {
    if (window.confirm(`Are you sure you want to delete ${material.title}?`)) {
      try {
        // Delete material using Redux action
        const resultAction = await dispatch(deleteMaterial(material.id));

        if (deleteMaterial.fulfilled.match(resultAction)) {
          // Refresh materials list
          dispatch(getAllMaterials());
        } else {
          alert('Failed to delete material. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting material:', error);
        alert('Delete failed: ' + (error.message || 'Unknown error'));
      }
    }
  };

  // If loading or not admin, show loading or access denied
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return <div className="flex justify-center items-center h-screen">Access Denied</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your website content</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <div className="bg-white dark:bg-gray-800 shadow w-full md:w-64 p-4">
          <nav>
            <ul>
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left p-2 rounded ${
                    activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`w-full text-left p-2 rounded ${
                    activeTab === 'materials' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Materials
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`w-full text-left p-2 rounded ${
                    activeTab === 'upload' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Upload
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full text-left p-2 rounded ${
                    activeTab === 'users' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Users
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Dashboard</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Total Materials</h3>
                  <p className="text-3xl font-bold dark:text-white">{materials.length}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Total Users</h3>
                  <p className="text-3xl font-bold dark:text-white">{users.length}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Categories</h3>
                  <p className="text-3xl font-bold dark:text-white">{new Set(materials.map((m) => m.category)).size}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Materials</h2>

              {materials.length === 0 ? (
                <p className="dark:text-white">No materials found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-700">
                        <th className="py-2 px-4 text-left">Title</th>
                        <th className="py-2 px-4 text-left">Category</th>
                        <th className="py-2 px-4 text-left">Date</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {materials.map((material) => (
                        <tr key={material._id} className="border-b dark:border-gray-700">
                          <td className="py-2 px-4 dark:text-white">{material.title}</td>
                          <td className="py-2 px-4 dark:text-white">{material.category}</td>
                          <td className="py-2 px-4 dark:text-white">
                            {new Date(material.createdAt).toLocaleDateString() || 'N/A'}
                          </td>
                          <td className="py-2 px-4">
                            <button
                              onClick={() => handleDeleteMaterial(material)}
                              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'upload' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Upload Material</h2>

              <form onSubmit={handleUpload} className="bg-white dark:bg-gray-800 p-6 rounded shadow">
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={newMaterial.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={newMaterial.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    rows="4"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select
                    name="category"
                    value={newMaterial.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                  >
                    <option value="books">Books</option>
                    <option value="notes">Notes</option>
                    <option value="papers">Previous Papers</option>
                    <option value="interviews">Interview Preparation</option>
                    <option value="coding">Coding Resources</option>
                    <option value="assignments">Assignments</option>
                    <option value="exams">Exams</option>
                    <option value="presentations">Presentations</option>
                    <option value="tutorials">Tutorials</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={newMaterial.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">File *</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.zip,.rar"
                    required
                  />
                </div>{' '}
                {isUploading && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded">
                      <div
                        className="bg-blue-500 text-white text-xs font-medium text-center p-0.5 rounded"
                        style={{ width: `${uploadProgress}%` }}
                      >
                        {Math.round(uploadProgress)}%
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload Material'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Users</h2>

              {users.length === 0 ? (
                <p className="dark:text-white">No users found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-700">
                        <th className="py-2 px-4 text-left">Email</th>
                        <th className="py-2 px-4 text-left">Display Name</th>
                        <th className="py-2 px-4 text-left">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id} className="border-b dark:border-gray-700">
                          <td className="py-2 px-4 dark:text-white">{user.email}</td>
                          <td className="py-2 px-4 dark:text-white">{user.name || 'N/A'}</td>
                          <td className="py-2 px-4 dark:text-white">
                            {new Date(user.createdAt).toLocaleDateString() || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
