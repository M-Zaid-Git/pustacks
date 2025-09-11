import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import DarkMode from '../DarkMode';
import { getCurrentUser, logout } from '../../utils/auth';

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  // Control body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      // Prevent body scrolling when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when closed
      document.body.style.overflow = '';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div
      className={classNames({
        'w-screen h-fit': true,
        'fixed top-0 z-[10000]': true, // Removed pt-4 padding
        'flex justify-center items-center': true,
        'fade-in': true,
      })}
      style={{
        transform: 'translateZ(0)', // Force hardware acceleration
        willChange: 'transform', // Hint to browser for optimization
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--form-bg)',
          boxShadow: '0 3px 8px var(--box-shadow)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.05)',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)', // Snappy animation curve
          transform: 'translateZ(0)', // Force hardware acceleration
        }}
        className={classNames({
          'w-full h-fit': true,
          'px-7 py-4': true, // Increased vertical padding slightly
          'flex items-center justify-between': true,
          'rounded-none sm:rounded-none sm:w-full': true, // Removed rounded corners on sm screens
          'mobile:px-4 mobile:py-3': true, // Adjusted mobile padding
        })}
      >
        {/* Logo */}
        <div
          className={classNames({
            'h-fit p-0': true,
            'flex items-center justify-start': true,
            'mobile:text-lg': true,
          })}
        >
          <Link to="/" className="flex items-center">
            <span
              style={{
                background: 'var(--gradient-mixed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 800,
              }}
              className="text-2xl"
            >
              ZESHO
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle - Right Aligned */}
        <div className="hidden mobile:flex items-center justify-end">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center hamburger-btn"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: menuOpen ? 'var(--zesho-purple)' : 'rgba(139, 92, 246, 0.08)',
              boxShadow: menuOpen ? '0 4px 12px rgba(139, 92, 246, 0.3)' : 'none',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)', // Snappier animation
              WebkitTapHighlightColor: 'transparent',
              position: 'relative',
              zIndex: 10002,
              transform: menuOpen ? 'scale(1.05)' : 'scale(1)',
            }}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5 flex flex-col justify-between items-center">
              {/* Simple, clean hamburger to X icon transition */}
              <span
                className="block h-[2px] rounded-full"
                style={{
                  background: menuOpen ? 'white' : 'var(--text-primary)',
                  transform: menuOpen ? 'rotate(45deg) translate(0, 7px)' : 'rotate(0)',
                  transformOrigin: 'center',
                  width: '20px',
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease',
                }}
              ></span>
              <span
                className="block h-[2px] rounded-full"
                style={{
                  background: menuOpen ? 'white' : 'var(--text-primary)',
                  opacity: menuOpen ? 0 : 1,
                  width: '14px',
                  marginLeft: 'auto',
                  transition: 'opacity 0.2s ease, width 0.2s ease',
                }}
              ></span>
              <span
                className="block h-[2px] rounded-full"
                style={{
                  background: menuOpen ? 'white' : 'var(--text-primary)',
                  transform: menuOpen ? 'rotate(-45deg) translate(0, -7px)' : 'rotate(0)',
                  transformOrigin: 'center',
                  width: '20px',
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease',
                }}
              ></span>
            </div>
          </button>
        </div>

        {/* Desktop NavItems */}
        <div
          className={classNames({
            'flex items-center justify-end gap-4': true,
            'mobile:hidden': true,
          })}
        >
          <Link to="/resources" className="slide-in-right">
            <button
              className="zesho-btn"
              style={{
                background: 'var(--gradient-purple)',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '0.9rem',
                letterSpacing: '0.02em',
              }}
            >
              Resources
            </button>
          </Link>

          {!user && (
            <Link to="/login" className="slide-in-right">
              <button
                className="zesho-btn"
                style={{
                  background: 'transparent',
                  border: '2px solid var(--zesho-purple)',
                  color: 'var(--text-primary)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '0.9rem',
                  boxShadow: 'none',
                  letterSpacing: '0.02em',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'var(--gradient-purple)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.boxShadow = '0 4px 10px var(--button-shadow)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Sign In
              </button>
            </Link>
          )}

          {!user && (
            <Link to="/signup" className="slide-in-right">
              <button
                className="zesho-btn"
                style={{
                  background: 'var(--gradient-mixed)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '0.9rem',
                  letterSpacing: '0.02em',
                }}
              >
                Sign Up
              </button>
            </Link>
          )}

          {user && (
            <Link to="/Dashboard" className="slide-in-right">
              <div className="flex items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white mr-2"
                  style={{
                    background: 'var(--gradient-purple)',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  {user.name && user.name.charAt(0).toUpperCase()}
                </div>
                <button
                  className="zesho-btn"
                  style={{
                    background: 'var(--gradient-blue)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '0.9rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  Dashboard
                </button>
              </div>
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link to="/admin" className="slide-in-right">
              <button
                className="zesho-btn"
                style={{
                  background: 'linear-gradient(135deg, #f97316, #ef4444)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '0.9rem',
                  letterSpacing: '0.02em',
                }}
              >
                Admin
              </button>
            </Link>
          )}

          {user && (
            <button
              className="zesho-btn slide-in-right"
              style={{
                background: 'var(--gradient-accent)',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '0.9rem',
                letterSpacing: '0.02em',
              }}
              onClick={() => {
                logout();
                setUser(null);
              }}
            >
              Logout
            </button>
          )}
          <DarkMode />
        </div>

        {/* Mobile NavItems (shown only when menu is open) - Full Screen */}
        <div
          className={classNames({
            'fixed top-0 left-0 right-0 bottom-0 z-[10001]': true, // Full screen positioning
            'flex flex-col items-center justify-center mobile-menu-drawer': true,
            'hidden mobile:flex': true,
            'pointer-events-none': !menuOpen,
            'pointer-events-auto': menuOpen,
          })}
          style={{
            backgroundColor: 'var(--form-bg)',
            backdropFilter: menuOpen ? 'blur(15px)' : 'blur(0px)',
            opacity: menuOpen ? 1 : 0,
            animation: menuOpen
              ? 'fullScreenFadeIn 0.3s ease-in-out forwards'
              : 'fullScreenFadeOut 0.3s ease-in-out forwards',
            visibility: menuOpen ? 'visible' : 'hidden',
            transition: 'visibility 0.3s ease-in-out',
            willChange: 'opacity, backdrop-filter',
            height: '100vh' /* Ensure 100% viewport height */,
            width: '100vw' /* Ensure 100% viewport width */,
            position: 'fixed',
            inset: 0 /* Shorthand for top/right/bottom/left: 0 */,
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center" style={{ minHeight: '100vh' }}>
            {/* Brand logo at top */}
            <div
              className="absolute top-6 left-0 right-0 flex justify-center"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(-20px)',
                transition: 'all 0.4s ease 0.1s',
                width: '100%',
              }}
            >
              <span
                style={{
                  background: 'var(--gradient-mixed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 800,
                }}
                className="text-3xl"
              >
                ZESHO
              </span>
            </div>

            {/* Navigation Grid */}
            <div
              className="grid grid-cols-2 gap-x-6 gap-y-8 max-w-xs mx-auto"
              style={{
                padding: '1rem',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -55%)',
                width: '100%',
              }}
            >
              <Link
                to="/"
                className="nav-item flex flex-col items-center justify-center py-4 px-3 rounded-lg hover:bg-purple-500 hover:bg-opacity-5 transition-all duration-300"
                onClick={() => setMenuOpen(false)}
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.4s ease 0.15s',
                }}
              >
                <div
                  className="w-14 h-14 mb-3 flex items-center justify-center rounded-full"
                  style={{ background: 'rgba(139, 92, 246, 0.08)' }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--zesho-purple)' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '1rem',
                  }}
                >
                  Home
                </span>
              </Link>

              <Link
                to="/resources"
                className="nav-item flex flex-col items-center justify-center py-4 px-3 rounded-lg hover:bg-purple-500 hover:bg-opacity-5 transition-all duration-300"
                onClick={() => setMenuOpen(false)}
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.4s ease 0.2s',
                }}
              >
                <div
                  className="w-14 h-14 mb-3 flex items-center justify-center rounded-full"
                  style={{ background: 'rgba(139, 92, 246, 0.08)' }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--zesho-purple)' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '1rem',
                  }}
                >
                  Resources
                </span>
              </Link>

              {user && (
                <Link
                  to="/Dashboard"
                  className="nav-item flex flex-col items-center justify-center py-4 px-3 rounded-lg hover:bg-purple-500 hover:bg-opacity-5 transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.4s ease 0.25s',
                  }}
                >
                  <div
                    className="w-14 h-14 mb-3 flex items-center justify-center rounded-full"
                    style={{ background: 'rgba(139, 92, 246, 0.08)' }}
                  >
                    <div className="relative">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: 'var(--zesho-purple)' }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {user && user.name && (
                        <div
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px]"
                          style={{
                            background: 'var(--gradient-purple)',
                            fontFamily: 'Montserrat, sans-serif',
                            boxShadow: '0 1px 3px var(--button-shadow)',
                          }}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      color: 'var(--text-primary)',
                      fontWeight: '600',
                      fontSize: '1rem',
                    }}
                  >
                    Dashboard
                  </span>
                </Link>
              )}

              {user && user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="nav-item flex flex-col items-center justify-center py-4 px-3 rounded-lg hover:bg-purple-500 hover:bg-opacity-5 transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.4s ease 0.3s',
                  }}
                >
                  <div
                    className="w-14 h-14 mb-3 flex items-center justify-center rounded-full"
                    style={{ background: 'rgba(239, 68, 68, 0.08)' }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: '#ef4444' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      color: 'var(--text-primary)',
                      fontWeight: '600',
                      fontSize: '1rem',
                    }}
                  >
                    Admin
                  </span>
                </Link>
              )}
            </div>

            {/* Authentication buttons at bottom */}
            <div
              className="absolute bottom-10 left-5 right-5 flex flex-col gap-3"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s ease 0.35s',
              }}
            >
              {!user ? (
                <div className="flex gap-3">
                  <Link to="/login" className="w-1/2" onClick={() => setMenuOpen(false)}>
                    <button
                      className="zesho-btn w-full flex items-center justify-center mobile-auth-button"
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        color: 'var(--text-primary)',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: '0.9rem',
                        boxShadow: 'none',
                        padding: '0.7rem 0',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign In
                    </button>
                  </Link>

                  <Link to="/signup" className="w-1/2" onClick={() => setMenuOpen(false)}>
                    <button
                      className="zesho-btn w-full flex items-center justify-center mobile-auth-button"
                      style={{
                        background: 'var(--gradient-mixed)',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: '0.9rem',
                        padding: '0.7rem 0',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px var(--button-shadow)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      Sign Up
                    </button>
                  </Link>
                </div>
              ) : (
                <button
                  className="zesho-btn w-full flex items-center justify-center mobile-auth-button"
                  style={{
                    background: 'var(--gradient-accent)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '0.9rem',
                    padding: '0.7rem',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px var(--button-shadow)',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => {
                    logout();
                    setUser(null);
                    setMenuOpen(false);
                  }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              )}

              {/* Dark mode toggle */}
              <div
                className="flex justify-center items-center w-full py-3 px-4 rounded-lg bg-purple-500 bg-opacity-5"
                style={{
                  border: '1px solid rgba(139, 92, 246, 0.1)',
                }}
              >
                <DarkMode />
                <span
                  className="ml-3"
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                  }}
                >
                  Toggle theme
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
