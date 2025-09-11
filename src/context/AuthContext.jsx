import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../firebase/ClientApp.mjs';
import { mockAuth } from '../mockData.js';
import { setUser, clearUser, setAuthLoading, setAuthError } from '../redux/authReducer.js';

// Create context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Get user from Redux store if available
  const userFromRedux = useSelector((state) => state.auth?.user);
  const authLoading = useSelector((state) => state.auth?.loading);

  // Authentication functions that use mock auth
  const loginWithMockAuth = (email, password) => {
    return mockAuth.signIn(email, password).then((user) => {
      if (user) {
        dispatch(setUser(user));
      }
      return user;
    });
  };

  const signupWithMockAuth = (email, password, name) => {
    return mockAuth.signUp(email, password, name).then((user) => {
      if (user) {
        dispatch(setUser(user));
      }
      return user;
    });
  };

  const signoutWithMockAuth = () => {
    return mockAuth.signOut().then(() => {
      dispatch(clearUser());
    });
  };

  useEffect(() => {
    dispatch(setAuthLoading(true));

    try {
      // Check for user in localStorage
      const user = mockAuth.getCurrentUser();

      if (user) {
        setCurrentUser(user);
        dispatch(setUser(user));
        console.log('User authenticated from local storage:', user.email);
      } else {
        setCurrentUser(null);
        dispatch(clearUser());
        console.log('No authenticated user');
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      dispatch(setAuthError(error.message));
    } finally {
      setLoading(false);
      dispatch(setAuthLoading(false));
    }

    // Listen for storage events to sync across tabs
    const handleStorageChange = (e) => {
      if (e.key === 'mockUser') {
        const user = e.newValue ? JSON.parse(e.newValue) : null;
        setCurrentUser(user);
        if (user) {
          dispatch(setUser(user));
        } else {
          dispatch(clearUser());
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch]);

  const value = {
    currentUser,
    loading,
    login: loginWithMockAuth,
    signup: signupWithMockAuth,
    logout: signoutWithMockAuth,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
