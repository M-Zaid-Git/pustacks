import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../api';

function ResetPassword() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const [emailid, setEmailid] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (isAuthenticated && user) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const handleResetPassword = async (email) => {
    try {
      setSending(true);
      setError(null);

      await api.forgotPassword(email);

      // Show success message and redirect to login after delay
      alert('Password reset link has been sent to your email address.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Error sending password reset email');
    } finally {
      setSending(false);
    }
  };
  return (
    <div
      className="h-screen flex items-center justify-center border-black pt-[10vh]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url("/loginpage-background-image.webp")',
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
          boxShadow: '0 10px 25px var(--box-shadow)',
        }}
        className="rounded-lg shadow-lg w-96 border border-opacity-20"
      >
        <div className="flex flex-col justify-center items-center text-center w-full px-10 pt-6 pb-3">
          <h1
            className="text-3xl font-bold"
            style={{
              fontFamily: 'monospace',
              color: 'var(--primary-color)',
            }}
          >
            Reset Password
          </h1>
          <div className="text-xs mt-1" style={{ color: 'var(--text-dull)' }}>
            Punjab University
          </div>
          <div className="text-xs italic" style={{ color: 'var(--text-dull)' }}>
            Created by Zaid
          </div>
        </div>
        <div className="border-b" style={{ borderColor: 'var(--form-border)' }}></div>
        <form className="px-8 py-5">
          <div
            style={{
              backgroundColor: 'var(--error-bg)',
              display: error ? 'block' : 'none',
            }}
            className="my-4 text-center text-base text-white rounded-lg p-2 transition-all duration-300 capitalize"
          >
            {error}
          </div>
          <div className="mb-6">
            <label style={{ color: 'var(--text-dull)' }} className="text-sm font-medium">
              Email Address
            </label>
            <input
              type="text"
              style={{
                backgroundColor: 'var(--form-bg)',
                borderColor: error ? 'var(--error-bg)' : 'var(--input-border)',
                color: 'var(--primary-color)',
                transition: 'border-color 0.3s',
              }}
              className="w-full border-b-2 py-2 focus:outline-none mt-1"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmailid(e.target.value)}
            />
          </div>
          {sending ? (
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
              style={{
                background: 'linear-gradient(to right, var(--blue), var(--indigo))',
                boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease',
              }}
              className="w-full text-white font-medium py-3 rounded-lg cursor-pointer mt-2 hover:opacity-90"
              onClick={(e) => {
                e.preventDefault();
                handleResetPassword(emailid);
              }}
            >
              Send Reset Link
            </button>
          )}
        </form>
        <div
          style={{
            backgroundColor: 'var(--form-footer)',
            borderBottomLeftRadius: '0.5rem',
            borderBottomRightRadius: '0.5rem',
          }}
          className="px-8 py-4 text-center"
        >
          <div className="">
            <Link to="/login" style={{ color: 'var(--blue)' }} className="font-medium hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
