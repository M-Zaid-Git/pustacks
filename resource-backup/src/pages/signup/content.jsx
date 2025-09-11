import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { register, login, getCurrentUser, mockAuthForDev } from '../../utils/auth';
import './PasswordTooltip.css';

const PasswordValidationModal = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = React.useRef(null);

  // Add click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltipRef]);

  return (
    <div className="tooltip-wrapper flex items-center justify-center" ref={tooltipRef}>
      <img
        src={'/info.png'}
        className="tooltip-icon w-4 h-4 cursor-pointer opacity-70 mb-[0.2rem] hover:opacity-100"
        alt="Password information"
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setTimeout(() => setShowTooltip(false), 300)}
      />
      <div
        className={`tooltip-content z-[1000] w-auto max-w-[90vw] md:max-w-[280px] absolute right-0 top-6 rounded p-3 text-xs transition-all duration-200 ${
          showTooltip ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1'
        }`}
        style={{
          backgroundColor: 'var(--form-bg)',
          border: '1px solid var(--form-border)',
          boxShadow: '0 10px 15px var(--box-shadow)',
          color: 'var(--primary-color)',
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Arrow pointing to the info icon */}
        <div
          className="absolute -top-2 right-1 w-4 h-4 rotate-45"
          style={{
            backgroundColor: 'var(--form-bg)',
            border: '1px solid var(--form-border)',
            borderRight: 'none',
            borderBottom: 'none',
          }}
        ></div>

        {/* Content */}
        <div className="relative">
          <div className="flex items-center justify-start gap-2 mb-2">
            <p>{'ℹ️'}</p>
            <span className="font-medium">Password must be at least 6 characters long.</span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <p>{'💡'}</p>
            <span>For better security, consider using a mix of letters, numbers, and special characters.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function SignForm() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [emailid, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [errorcause, setErrorcause] = useState('');
  const [name, setName] = useState('');
  // Standard email validation
  const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Simplified password validation - just minimum 6 characters
  const validPassword = /^.{6,}$/;

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      // Use our auth utility to check for existing user
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }

      // Don't auto-create mock users in development mode
      // This ensures users need to sign up or login manually
    };

    checkAuth();
  }, []);

  // We don't need the login handler in the signup component anymore
  // Keeping the component focused on signup functionality

  const signupuser = async (name, emailid, password, confirmpassword) => {
    // Clear any previous errors
    setError(null);
    setErrorcause('');

    // Validate name
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    // Validate email
    if (!emailid || !validEmailPattern.test(emailid)) {
      setError('Please enter a valid email address.');
      setErrorcause('email');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setErrorcause('password');
      return;
    }

    // Validate password match
    if (password !== confirmpassword) {
      setError('Password and confirm password should match.');
      setErrorcause('password');
      return;
    }

    // All validations passed, attempt to create user
    setLoading(true);

    try {
      // Call our register function from auth.js
      const response = await register({ name, email: emailid, password });

      // Update state with the new user
      setUser(response.user);
    } catch (error) {
      console.error('Registration error:', error);

      // Handle specific error cases
      if (error.message.toLowerCase().includes('already exists')) {
        setError('This email address is already registered. Please log in or use a different email.');
        setErrorcause('email');
      } else if (error.message.toLowerCase().includes('password')) {
        setError('Password is too weak. Please choose a stronger password.');
        setErrorcause('password');
      } else if (error.message.toLowerCase().includes('email')) {
        setError('Please enter a valid email address.');
        setErrorcause('email');
      } else {
        setError(error.message || 'An error occurred during signup. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };
  // Redirect if user is authenticated
  if (user) {
    return <Navigate replace to="/" />;
  }
  return (
    <div
      className="min-h-screen flex items-center justify-center border-black pt-20 pb-8 px-4"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url("/loginpage-background-image.webp")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        filter: 'blur(0px)',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--form-bg)',
          borderColor: 'var(--form-border)',
          boxShadow: '0 15px 35px var(--box-shadow)',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          isolation: 'isolate' /* Creates a stacking context for z-index */,
        }}
        className="rounded-xl shadow-lg w-96 border border-opacity-10 fade-in mt-8 mb-4"
      >
        <div className="flex flex-col justify-center items-center text-center w-full px-10 pt-5 pb-2">
          <h1
            className="text-4xl font-bold slide-up"
            style={{
              background: 'var(--gradient-mixed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            ZESHO
          </h1>
          <div
            className="text-xs mt-1 slide-up"
            style={{ color: 'var(--text-dull)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Punjab University • Created by Zaid
          </div>
        </div>
        <div className="border-b" style={{ borderColor: 'var(--form-border)' }}></div>

        <form className="px-8 py-4 slide-up">
          <div
            style={{
              backgroundColor: 'var(--error-bg)',
              display: error ? 'block' : 'none',
              animation: error ? 'fadeIn 0.3s ease-in' : 'none',
            }}
            className="my-2 text-center text-sm text-white rounded-lg p-2 transition-all duration-300 shadow-md"
          >
            {error}
          </div>

          <div className="mb-4">
            <label
              style={{ color: 'var(--text-secondary)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              className="text-sm font-medium"
            >
              Full Name
            </label>
            <div
              style={{
                borderRadius: '0.5rem',
                border: `1px solid var(--input-border)`,
                transition: 'all 0.3s ease',
              }}
              className="mt-1 flex items-center px-3 py-1.5 hover:shadow-sm focus-within:shadow-md"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                style={{ color: 'var(--text-dull)' }}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <input
                type="text"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
                className="w-full focus:outline-none"
                placeholder="Enter your full name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              style={{ color: 'var(--text-secondary)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              className="text-sm font-medium"
            >
              Email Address
            </label>
            <div
              style={{
                borderRadius: '0.5rem',
                border: `1px solid ${errorcause === 'email' ? 'var(--error-bg)' : 'var(--input-border)'}`,
                transition: 'all 0.3s ease',
              }}
              className="mt-1 flex items-center px-3 py-1.5 hover:shadow-sm focus-within:shadow-md"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                style={{ color: 'var(--text-dull)' }}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                type="text"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
                className="w-full focus:outline-none"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmailid(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label
                style={{ color: 'var(--text-secondary)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                className="text-sm font-medium"
              >
                Password
              </label>
              <div className="relative ml-2 z-10">
                <PasswordValidationModal />
              </div>
            </div>
            <div
              style={{
                borderRadius: '0.5rem',
                border: `1px solid ${errorcause === 'password' ? 'var(--error-bg)' : 'var(--input-border)'}`,
                transition: 'all 0.3s ease',
              }}
              className="mt-1 flex items-center px-3 py-1.5 hover:shadow-sm focus-within:shadow-md"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                style={{ color: 'var(--text-dull)' }}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                type="password"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
                className="w-full focus:outline-none"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              style={{ color: 'var(--text-secondary)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              className="text-sm font-medium"
            >
              Confirm Password
            </label>
            <div
              style={{
                borderRadius: '0.5rem',
                border: `1px solid ${errorcause === 'password' ? 'var(--error-bg)' : 'var(--input-border)'}`,
                transition: 'all 0.3s ease',
              }}
              className="mt-1 flex items-center px-3 py-1.5 hover:shadow-sm focus-within:shadow-md"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                style={{ color: 'var(--text-dull)' }}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <input
                type="password"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
                className="w-full focus:outline-none"
                placeholder="Confirm your password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-10 mt-2">
              <div className="w-32 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                  style={{
                    width: '85%',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                ></div>
              </div>
              <style jsx>{`
                @keyframes pulse {
                  0%,
                  100% {
                    opacity: 0.3;
                    transform: scaleX(0.8);
                  }
                  50% {
                    opacity: 1;
                    transform: scaleX(1);
                  }
                }
              `}</style>
            </div>
          ) : (
            <button
              type="submit"
              className="zesho-btn w-full text-white font-semibold py-2 rounded-lg cursor-pointer mt-2"
              style={{
                background: 'var(--gradient-purple)',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '1rem',
                letterSpacing: '0.01em',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
              onClick={(e) => {
                e.preventDefault();
                signupuser(name, emailid, password, confirmpassword);
              }}
            >
              Create Account
            </button>
          )}

          <div className="relative my-3 flex items-center">
            <div className="flex-grow border-t" style={{ borderColor: 'var(--form-border)' }}></div>
            <span className="flex-shrink mx-4 text-xs" style={{ color: 'var(--text-dull)' }}>
              or
            </span>
            <div className="flex-grow border-t" style={{ borderColor: 'var(--form-border)' }}></div>
          </div>

          <div className="text-center slide-in-right">
            <p
              style={{
                color: 'var(--text-secondary)',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                marginBottom: '0.5rem',
              }}
              className="text-sm"
            >
              Already have an account?
            </p>
            <Link to="/login" className="w-full block">
              <button
                className="w-full py-2 px-4 rounded-lg font-medium"
                style={{
                  border: '2px solid var(--zesho-purple)',
                  color: 'var(--zesho-purple)',
                  backgroundColor: 'transparent',
                  fontFamily: 'Montserrat, sans-serif',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem',
                  fontWeight: '600',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--zesho-purple)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--zesho-purple)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                }}
              >
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign In
                </div>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignForm;
