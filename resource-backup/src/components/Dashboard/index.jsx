import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar } from '../../components';
import Sidepanel from './sidepanel';
import ProfileEdit from './profileedit';
import { getProfile, getUserBookmarks, getUserUploads, getUserDownloads } from '../../redux/userReducer';
import { getCurrentUser, logout } from '../../redux/authReducer';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { profile, bookmarks, uploads, downloads, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate('/login');
    } else {
      dispatch(getCurrentUser());
      dispatch(getProfile());
      dispatch(getUserBookmarks());
      dispatch(getUserUploads());
      dispatch(getUserDownloads());
    }
  }, [dispatch, isAuthenticated, navigate, user]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <NavBar />
      <div className="flex flex-grow">
        <Sidepanel open={open} setOpen={setOpen} />

        <div className={`flex-grow transition-all duration-300 ${open ? 'ml-24' : 'ml-72'} px-6 py-8 mt-24`}>
          <div className="mb-6">
            <h1
              className="text-3xl font-bold mb-2"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                background: 'var(--gradient-mixed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Welcome back, {profile?.name || user?.name || 'User'}! Here's an overview of your activities.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="stats-card bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    Total Bookmarks
                  </p>
                  <h3 className="text-3xl font-bold" style={{ color: 'var(--zesho-purple)' }}>
                    {bookmarks?.length || 0}
                  </h3>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(var(--zesho-purple-rgb), 0.1)' }}>
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    style={{ color: 'var(--zesho-purple)' }}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/bookmarks" className="text-sm font-medium" style={{ color: 'var(--zesho-purple)' }}>
                  View all bookmarks →
                </Link>
              </div>
            </div>

            <div className="stats-card bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    Total Uploads
                  </p>
                  <h3 className="text-3xl font-bold" style={{ color: 'var(--zesho-blue)' }}>
                    {uploads?.length || 0}
                  </h3>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(var(--zesho-blue-rgb), 0.1)' }}>
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    style={{ color: 'var(--zesho-blue)' }}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/uploads" className="text-sm font-medium" style={{ color: 'var(--zesho-blue)' }}>
                  View all uploads →
                </Link>
              </div>
            </div>

            <div className="stats-card bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    Total Downloads
                  </p>
                  <h3 className="text-3xl font-bold" style={{ color: 'var(--zesho-green)' }}>
                    {downloads?.length || 0}
                  </h3>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(var(--zesho-green-rgb), 0.1)' }}>
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    style={{ color: 'var(--zesho-green)' }}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/downloads" className="text-sm font-medium" style={{ color: 'var(--zesho-green)' }}>
                  View all downloads →
                </Link>
              </div>
            </div>
          </div>

          {/* User Profile */}
          {editMode ? (
            <ProfileEdit setEditMode={setEditMode} />
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  User Profile
                </h2>

                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-4 border-t-purple-500 animate-spin"></div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-700 shadow-md">
                      <img
                        src={profile?.profileImage || user?.profileImage || '/interview.webp'}
                        alt={profile?.name || user?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div className="profile-item">
                          <p
                            className="text-sm font-medium text-slate-500 dark:text-slate-400"
                            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                          >
                            Full Name
                          </p>
                          <p className="text-lg font-semibold dark:text-white">{profile?.name || user?.name}</p>
                        </div>

                        <div className="profile-item">
                          <p
                            className="text-sm font-medium text-slate-500 dark:text-slate-400"
                            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                          >
                            Role
                          </p>
                          <p className="text-lg font-semibold dark:text-white capitalize">
                            {profile?.role || user?.role || 'Student'}
                          </p>
                        </div>

                        <div className="profile-item">
                          <p
                            className="text-sm font-medium text-slate-500 dark:text-slate-400"
                            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                          >
                            Institution
                          </p>
                          <p className="text-lg font-semibold dark:text-white">
                            {profile?.institution || user?.institution || 'Not specified'}
                          </p>
                        </div>

                        <div className="profile-item">
                          <p
                            className="text-sm font-medium text-slate-500 dark:text-slate-400"
                            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                          >
                            Account Status
                          </p>
                          <p className="text-lg font-semibold dark:text-white flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 inline-block mr-2"></span>
                            Active
                          </p>
                        </div>

                        <div className="profile-item md:col-span-2">
                          <p
                            className="text-sm font-medium text-slate-500 dark:text-slate-400"
                            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                          >
                            Email Address
                          </p>
                          <p className="text-lg font-semibold dark:text-white">{profile?.email || user?.email}</p>
                        </div>
                      </div>

                      <div className="pt-4 md:pt-6 flex flex-wrap gap-3">
                        <button
                          onClick={() => setEditMode(true)}
                          className="px-6 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                          style={{ background: 'var(--gradient-purple)' }}
                        >
                          Edit Profile
                        </button>

                        <button
                          onClick={() => dispatch(logout())}
                          className="px-6 py-2 rounded-lg font-medium bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
