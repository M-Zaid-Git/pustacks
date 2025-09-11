import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { login, getCurrentUser, isAuthenticated, mockAuthForDev } from '../../utils/auth';

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [emailid, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [rememberme, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [errorcause, setErrorcause] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Use our auth utility to check for existing user
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }

        // Don't auto-create mock users in development mode
        // This ensures users need to sign up or login manually
      } catch (err) {
        console.error('Auth check error:', err);
      }
    };

    checkAuth();
  }, []);

  // Handle remember me preference
  useEffect(() => {
    if (rememberme) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
    }
  }, [rememberme]);

  // Login handler
  const handleLogin = async (emailid, password) => {
    setLoading(true);
    setError(null);
    setErrorcause('');

    try {
      // Use our auth utility to attempt login
      const response = await login({ email: emailid, password }, rememberme);

      // If login succeeds, set the user in state
      setUser(response.user);
    } catch (err) {
      console.error('Login error:', err);

      // Handle specific error cases
      if (err.message.toLowerCase().includes('password')) {
        setError('Incorrect password. Please try again.');
        setErrorcause('password');
      } else if (err.message.toLowerCase().includes('email')) {
        setError('Email not registered. Please check your email or sign up.');
        setErrorcause('email');
      } else {
        setError(err.message || 'Login failed. Please try again later.');
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
      className="min-h-screen flex items-center justify-center border-black pt-20 pb-8"
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
        }}
        className="rounded-xl shadow-lg w-96 border border-opacity-10 fade-in mt-8 mb-4"
      >
        <div className="flex flex-col justify-center items-center text-center w-full px-10 pt-8 pb-4">
          <h1
            className="text-4xl font-bold mb-1 slide-up"
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
            className="text-sm mt-2 slide-up"
            style={{ color: 'var(--text-dull)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Punjab University
          </div>
          <div
            className="text-xs mt-1 slide-up"
            style={{ color: 'var(--text-dull)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Created by Zaid
          </div>
        </div>
        <div className="border-b" style={{ borderColor: 'var(--form-border)' }}></div>
        <form className="px-8 py-6 slide-up">
          <div
            style={{
              backgroundColor: 'var(--error-bg)',
              display: error ? 'block' : 'none',
              animation: error ? 'fadeIn 0.3s ease-in' : 'none',
            }}
            className="my-4 text-center text-base text-white rounded-lg p-3 transition-all duration-300 shadow-md"
          >
            {error}
          </div>
          <div className="mb-6">
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
              className="mt-1 flex items-center px-3 py-2 hover:shadow-sm focus-within:shadow-md"
            >
              <svg
                className="h-5 w-5 mr-2"
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
          <div className="mb-6">
            <label
              style={{ color: 'var(--text-secondary)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              className="text-sm font-medium"
            >
              Password
            </label>
            <div
              style={{
                borderRadius: '0.5rem',
                border: `1px solid ${errorcause === 'password' ? 'var(--error-bg)' : 'var(--input-border)'}`,
                transition: 'all 0.3s ease',
              }}
              className="mt-1 flex items-center px-3 py-2 hover:shadow-sm focus-within:shadow-md"
            >
              <svg
                className="h-5 w-5 mr-2"
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
          <div className="flex items-center mb-6">
            <div className="flex-1 text-sm">
              <Link
                to="/resetpassword"
                style={{
                  color: 'var(--zesho-purple)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  transition: 'all 0.2s ease',
                }}
                className="hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="form-checkbox h-4 w-4"
                style={{ accentColor: 'var(--zesho-purple)' }}
                onChange={(e) => {
                  setRememberMe(e.target.checked);
                }}
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm"
                style={{
                  color: 'var(--text-secondary)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
              >
                Remember Me
              </label>
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-12 mt-2">
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
              className="zesho-btn w-full text-white font-semibold py-3 rounded-lg cursor-pointer mt-2"
              style={{
                background: 'var(--gradient-purple)',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '1.05rem',
                letterSpacing: '0.01em',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
              onClick={(e) => {
                e.preventDefault();
                handleLogin(emailid, password);
              }}
            >
              Sign In
            </button>
          )}
          <div className="relative my-6 flex items-center">
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
                marginBottom: '1rem',
              }}
              className="text-sm"
            >
              New to ZESHO?
            </p>
            <Link to="/signup" className="w-full block">
              <button
                className="w-full py-2.5 px-4 rounded-lg font-medium"
                style={{
                  border: '2px solid var(--zesho-purple)',
                  color: 'var(--zesho-purple)',
                  backgroundColor: 'transparent',
                  fontFamily: 'Montserrat, sans-serif',
                  transition: 'all 0.3s ease',
                  fontSize: '1.05rem',
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
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Create Account
                </div>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
