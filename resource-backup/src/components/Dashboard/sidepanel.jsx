import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Modal from '../Modal';
import Upload from './uploadform';

const SidebarLink = ({ to, icon, label, isActive, onClick, isCollapsed }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
        ${
          isActive
            ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
            : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
        }
        ${isCollapsed ? 'justify-center' : ''}
      `}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!isCollapsed && (
        <span className="font-medium" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {label}
        </span>
      )}
    </Link>
  );
};

const Sidepanel = ({ open, setOpen }) => {
  const [isopen, setIsOpen] = useState(false);
  const location = useLocation();

  // Helper function to render icons
  const renderIcon = (path) => {
    const baseClass = 'w-5 h-5';
    const activeClass = 'text-white';
    const inactiveClass = 'text-slate-600 dark:text-slate-300';
    const iconClass = location.pathname === path ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;

    switch (path) {
      case '/dashboard':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      case '/uploads':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        );
      case '/downloads':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
            />
          </svg>
        );
      case '/bookmarks':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`
            fixed left-5 bottom-5 transition-all duration-300 ease-in-out
            ${open ? 'w-16' : 'w-64'}
            bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700
            z-50 rounded-xl
          `}
      style={{
        position: 'fixed',
        top: '6rem' /* Increased top spacing to prevent touching navbar */,
        paddingTop: '10px',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'var(--form-bg)',
        boxShadow: '0 8px 20px var(--box-shadow)',
      }}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-4">
          {!open && (
            <div className="flex items-center">
              <h2
                className="text-xl font-bold"
                style={{
                  background: 'var(--gradient-mixed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                ZESHO
              </h2>
            </div>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <svg
              className="w-5 h-5 text-slate-500 dark:text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-2">
            <SidebarLink
              to="/dashboard"
              icon={renderIcon('/dashboard')}
              label="Dashboard"
              isActive={location.pathname === '/dashboard'}
              isCollapsed={open}
            />

            <div className="relative">
              <button
                onClick={() => setIsOpen(!isopen)}
                className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                      hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300
                      ${open ? 'justify-center' : ''}
                    `}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                {!open && (
                  <span className="font-medium" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Upload File
                  </span>
                )}
              </button>
            </div>
            <Modal content={<Upload />} open={isopen} setOpen={setIsOpen} />

            <SidebarLink
              to="/uploads"
              icon={renderIcon('/uploads')}
              label="My Uploads"
              isActive={location.pathname === '/uploads'}
              isCollapsed={open}
            />

            <SidebarLink
              to="/downloads"
              icon={renderIcon('/downloads')}
              label="Downloads"
              isActive={location.pathname === '/downloads'}
              isCollapsed={open}
            />

            <SidebarLink
              to="/bookmarks"
              icon={renderIcon('/bookmarks')}
              label="Bookmarks"
              isActive={location.pathname === '/bookmarks'}
              isCollapsed={open}
            />
          </nav>
        </div>

        {/* User Profile */}
        {!open && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <img
                src="/interview.webp"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-600"
              />
              <div>
                <p
                  className="font-medium text-slate-800 dark:text-slate-200"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  Zaid Ahmed
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Student</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidepanel;
