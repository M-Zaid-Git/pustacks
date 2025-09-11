import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@university.edu',
    university: 'Tech University',
    joinDate: 'January 2024',
    avatar: 'JD'
  };

  const stats = {
    uploads: 12,
    downloads: 47,
    bookmarks: 23,
    points: 156
  };

  const recentUploads = [
    { id: 1, title: 'Data Structures Notes', subject: 'Computer Science', uploadDate: '2024-03-15', downloads: 24 },
    { id: 2, title: 'Calculus Formula Sheet', subject: 'Mathematics', uploadDate: '2024-03-10', downloads: 18 },
    { id: 3, title: 'Physics Lab Report', subject: 'Physics', uploadDate: '2024-03-08', downloads: 12 }
  ];

  const recentDownloads = [
    { id: 1, title: 'Machine Learning Basics', subject: 'Computer Science', downloadDate: '2024-03-16' },
    { id: 2, title: 'Organic Chemistry Guide', subject: 'Chemistry', downloadDate: '2024-03-14' },
    { id: 3, title: 'Linear Algebra Notes', subject: 'Mathematics', downloadDate: '2024-03-12' }
  ];

  const bookmarks = [
    { id: 1, title: 'Advanced Algorithms', subject: 'Computer Science', bookmarkDate: '2024-03-15' },
    { id: 2, title: 'Quantum Physics Primer', subject: 'Physics', bookmarkDate: '2024-03-13' },
    { id: 3, title: 'Statistics Handbook', subject: 'Mathematics', bookmarkDate: '2024-03-11' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <NavBar />
      
      {/* Header */}
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden p-8 bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-3xl shadow-2xl">
            {/* Gradient Overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 to-purple-600/90 rounded-3xl"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-6 md:mb-0">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{user.avatar}</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
                  <p className="text-violet-100">{user.email} • {user.university}</p>
                  <p className="text-violet-200 text-sm">Member since {user.joinDate}</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{stats.points}</div>
                <div className="text-violet-100">Points Earned</div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="floating-card p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.uploads}</div>
              <div className="text-gray-600 dark:text-gray-300">Resources Uploaded</div>
            </div>

            <div className="floating-card p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.downloads}</div>
              <div className="text-gray-600 dark:text-gray-300">Resources Downloaded</div>
            </div>

            <div className="floating-card p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.bookmarks}</div>
              <div className="text-gray-600 dark:text-gray-300">Bookmarked Items</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="pb-8">
        <div className="container mx-auto px-6">
          <div className="floating-card p-2 bg-gray-100 dark:bg-slate-800 rounded-2xl">
            <div className="flex space-x-2">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'uploads', label: 'My Uploads', icon: '📤' },
                { id: 'downloads', label: 'Downloads', icon: '📥' },
                { id: 'bookmarks', label: 'Bookmarks', icon: '🔖' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="pb-16">
        <div className="container mx-auto px-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="floating-card p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Uploaded "Data Structures Notes"</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Downloaded "Machine Learning Basics"</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Bookmarked "Advanced Algorithms"</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">5 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="floating-card p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="btn-primary p-6 text-center !text-white">
                    <div className="text-2xl mb-2">📤</div>
                    <div className="font-medium">Upload Resource</div>
                  </button>
                  <button className="btn-secondary p-6 text-center !text-violet-600 hover:!text-violet-700">
                    <div className="text-2xl mb-2">🔍</div>
                    <div className="font-medium">Browse Resources</div>
                  </button>
                  <button className="btn-secondary p-6 text-center !text-violet-600 hover:!text-violet-700">
                    <div className="text-2xl mb-2">👥</div>
                    <div className="font-medium">Study Groups</div>
                  </button>
                  <button className="btn-secondary p-6 text-center !text-violet-600 hover:!text-violet-700">
                    <div className="text-2xl mb-2">⚙️</div>
                    <div className="font-medium">Settings</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'uploads' && (
            <div className="floating-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">My Uploads</h3>
                <button className="btn-primary px-6 py-3 !text-white">
                  Upload New Resource
                </button>
              </div>
              <div className="space-y-4">
                {recentUploads.map(upload => (
                  <div key={upload.id} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800 rounded-xl">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{upload.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{upload.subject}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Uploaded on {upload.uploadDate}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{upload.downloads}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">downloads</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'downloads' && (
            <div className="floating-card p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Downloads</h3>
              <div className="space-y-4">
                {recentDownloads.map(download => (
                  <div key={download.id} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800 rounded-xl">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{download.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{download.subject}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Downloaded on {download.downloadDate}</p>
                    </div>
                    <button className="btn-secondary px-4 py-2 !text-violet-600 hover:!text-violet-700">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div className="floating-card p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Bookmarked Resources</h3>
              <div className="space-y-4">
                {bookmarks.map(bookmark => (
                  <div key={bookmark.id} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800 rounded-xl">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{bookmark.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{bookmark.subject}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Bookmarked on {bookmark.bookmarkDate}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-primary px-4 py-2 !text-white">
                        View
                      </button>
                      <button className="btn-secondary px-4 py-2 !text-violet-600 hover:!text-violet-700">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
