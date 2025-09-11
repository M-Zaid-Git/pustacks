import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);

  // Mock user data with enhanced profile
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    university: 'ZESHO Tech University',
    department: 'Computer Science',
    year: 'Senior',
    joinDate: 'September 2023',
    avatar: 'AJ',
    streak: 12,
    level: 'Advanced Contributor',
    nextLevelProgress: 75
  };

  const stats = {
    uploads: 24,
    downloads: 89,
    bookmarks: 31,
    points: 1247,
    rank: '#156',
    studyHours: 84,
    completedCourses: 8
  };

  const recentActivity = [
    { id: 1, type: 'upload', title: 'Advanced React Patterns', subject: 'Web Development', time: '2 hours ago', points: '+25' },
    { id: 2, type: 'download', title: 'Machine Learning Algorithms', subject: 'AI/ML', time: '5 hours ago', points: '+5' },
    { id: 3, type: 'bookmark', title: 'Data Structures Guide', subject: 'Computer Science', time: '1 day ago', points: '+2' },
    { id: 4, type: 'achievement', title: 'Earned "Knowledge Sharer" badge', subject: 'Achievement', time: '2 days ago', points: '+50' }
  ];

  const myUploads = [
    { 
      id: 1, 
      title: 'Advanced React Patterns & Best Practices', 
      subject: 'Web Development', 
      uploadDate: '2024-03-15', 
      downloads: 42, 
      rating: 4.8, 
      status: 'Published',
      size: '2.4 MB',
      type: 'PDF'
    },
    { 
      id: 2, 
      title: 'Database Design Fundamentals', 
      subject: 'Computer Science', 
      uploadDate: '2024-03-12', 
      downloads: 28, 
      rating: 4.6, 
      status: 'Published',
      size: '1.8 MB',
      type: 'PDF'
    },
    { 
      id: 3, 
      title: 'Linear Algebra Study Notes', 
      subject: 'Mathematics', 
      uploadDate: '2024-03-08', 
      downloads: 35, 
      rating: 4.9, 
      status: 'Published',
      size: '3.2 MB',
      type: 'PDF'
    }
  ];

  const studyGoals = [
    { id: 1, title: 'Complete Data Science Course', progress: 75, deadline: '2024-04-15', priority: 'high' },
    { id: 2, title: 'Upload 5 Resources This Month', progress: 60, deadline: '2024-03-31', priority: 'medium' },
    { id: 3, title: 'Study 20 Hours This Week', progress: 85, deadline: '2024-03-24', priority: 'high' }
  ];

  const recommendations = [
    { id: 1, title: 'Advanced Python Programming', subject: 'Programming', author: 'Dr. Smith', rating: 4.9, downloads: 234 },
    { id: 2, title: 'Modern JavaScript ES6+', subject: 'Web Development', author: 'Sarah Chen', rating: 4.7, downloads: 189 },
    { id: 3, title: 'Machine Learning Basics', subject: 'AI/ML', author: 'Prof. Johnson', rating: 4.8, downloads: 156 }
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'upload': return '📤';
      case 'download': return '📥';
      case 'bookmark': return '🔖';
      case 'achievement': return '🏆';
      default: return '📊';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Published': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <NavBar />
      
      {/* Enhanced Header with Level Progress */}
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600 text-white rounded-3xl shadow-2xl">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <div className="relative z-10 p-8">
              <div className="flex flex-col lg:flex-row items-start justify-between">
                <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                  <div className="relative">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/20">
                      <span className="text-3xl font-bold text-white">{user.avatar}</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{user.streak}</span>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}! 🎓</h1>
                    <p className="text-indigo-100 mb-1">{user.email} • {user.department}</p>
                    <p className="text-indigo-200 text-sm">{user.university} • {user.year}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">{user.level}</span>
                      <span className="text-sm text-indigo-200">{user.streak} day streak 🔥</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center lg:text-right">
                  <div className="text-4xl font-bold mb-2">{stats.points}</div>
                  <div className="text-indigo-100 mb-1">ZESHO Points</div>
                  <div className="text-sm text-indigo-200">Global Rank: {stats.rank}</div>
                  
                  {/* Level Progress */}
                  <div className="mt-4 w-48">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-indigo-200">Level Progress</span>
                      <span className="text-white">{user.nextLevelProgress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${user.nextLevelProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { label: 'Uploads', value: stats.uploads, icon: '📤', color: 'from-blue-500 to-cyan-500' },
              { label: 'Downloads', value: stats.downloads, icon: '📥', color: 'from-green-500 to-emerald-500' },
              { label: 'Bookmarks', value: stats.bookmarks, icon: '🔖', color: 'from-purple-500 to-pink-500' },
              { label: 'Study Hours', value: stats.studyHours, icon: '⏱️', color: 'from-orange-500 to-red-500' },
              { label: 'Courses', value: stats.completedCourses, icon: '🎯', color: 'from-indigo-500 to-purple-500' },
              { label: 'Rank', value: stats.rank, icon: '🏆', color: 'from-yellow-500 to-orange-500' },
              { label: 'Points', value: stats.points, icon: '⭐', color: 'from-cyan-500 to-blue-500' }
            ].map((stat, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700">
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                  <span className="text-white text-lg">{stat.icon}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-lg border border-gray-100 dark:border-slate-700">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'uploads', label: 'My Content', icon: '📤' },
                { id: 'activity', label: 'Activity', icon: '⚡' },
                { id: 'goals', label: 'Study Goals', icon: '🎯' },
                { id: 'recommendations', label: 'For You', icon: '💡' },
                { id: 'analytics', label: 'Analytics', icon: '📈' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Content */}
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">View All</button>
                </div>
                <div className="space-y-4">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-lg">{getActivityIcon(activity.type)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{activity.subject}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">{activity.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions & Goals */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl hover:scale-105 transition-transform">
                      <div className="text-2xl mb-2">📤</div>
                      <div className="text-sm font-medium">Upload</div>
                    </button>
                    <button className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transition-transform">
                      <div className="text-2xl mb-2">🔍</div>
                      <div className="text-sm font-medium">Browse</div>
                    </button>
                    <button className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl hover:scale-105 transition-transform">
                      <div className="text-2xl mb-2">👥</div>
                      <div className="text-sm font-medium">Groups</div>
                    </button>
                    <button className="p-4 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl hover:scale-105 transition-transform">
                      <div className="text-2xl mb-2">📚</div>
                      <div className="text-sm font-medium">Study</div>
                    </button>
                  </div>
                </div>

                {/* Today's Goals */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Today's Goals</h3>
                  <div className="space-y-3">
                    {studyGoals.slice(0, 2).map(goal => (
                      <div key={goal.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-900 dark:text-white">{goal.title}</span>
                          <span className="text-gray-600 dark:text-gray-300">{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                          <div 
                            className={`${getPriorityColor(goal.priority)} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'uploads' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
              <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">My Content</h3>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search uploads..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200">
                      + Upload New
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {myUploads.map(upload => (
                    <div key={upload.id} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-700 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{upload.type}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{upload.title}</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{upload.subject} • {upload.size}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Uploaded {upload.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">{upload.downloads}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">downloads</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{upload.rating}</span>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">rating</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(upload.status)}`}>
                          {upload.status}
                        </span>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Study Goals</h3>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200">
                  + New Goal
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studyGoals.map(goal => (
                  <div key={goal.id} className="p-6 bg-gray-50 dark:bg-slate-700 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">{goal.title}</h4>
                      <span className={`w-3 h-3 rounded-full ${getPriorityColor(goal.priority)}`} />
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-300">Progress</span>
                        <span className="font-medium text-gray-900 dark:text-white">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3">
                        <div 
                          className={`${getPriorityColor(goal.priority)} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Deadline: {goal.deadline}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recommended for You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map(rec => (
                  <div key={rec.id} className="p-6 bg-gray-50 dark:bg-slate-700 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors cursor-pointer">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">{rec.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{rec.subject}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">by {rec.author}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{rec.rating}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">({rec.downloads} downloads)</span>
                      </div>
                      <button className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Upload Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                    <span className="font-medium text-gray-900 dark:text-white">Total Views</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,247</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <span className="font-medium text-gray-900 dark:text-white">Total Downloads</span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">892</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                    <span className="font-medium text-gray-900 dark:text-white">Average Rating</span>
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">4.7⭐</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Learning Progress</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
                    <span className="font-medium text-gray-900 dark:text-white">Study Hours</span>
                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.studyHours}h</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl">
                    <span className="font-medium text-gray-900 dark:text-white">Courses Completed</span>
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.completedCourses}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
                    <span className="font-medium text-gray-900 dark:text-white">Knowledge Score</span>
                    <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">A+</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
