/**
 * Authentication utilities for UniShare application
 */

// Check if we're in development mode
const isDev = import.meta.env.MODE === 'development';

// Base URL for API calls
const API_URL = isDev ? '/.netlify/functions' : '/.netlify/functions';

/**
 * Register a new user
 * @param {Object} userData - User data containing name, email, and password
 * @returns {Promise} - Promise resolving to the API response
 */
export const register = async (userData) => {
  try {
    // For development mode without a backend
    if (isDev) {
      console.log('Dev mode: Simulating registration');

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Check if user exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((user) => user.email === userData.email);

      if (existingUser) {
        throw new Error('This email address is already registered');
      }

      // Create a new user
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: 'student',
        createdAt: new Date().toISOString(),
      };

      // Store in local storage (without password in user object)
      users.push({ ...newUser, password: userData.password });
      localStorage.setItem('users', JSON.stringify(users));

      // Create mock response data
      const responseData = {
        user: newUser,
        token: `dev-token-${Date.now()}`,
      };

      // Store user data and token
      localStorage.setItem('user', JSON.stringify(responseData.user));
      localStorage.setItem('authToken', responseData.token);

      return responseData;
    }

    // For production mode with API
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    // Store user data and token in localStorage
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('authToken', data.token);

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Log in a user
 * @param {Object} credentials - User credentials containing email and password
 * @param {boolean} rememberMe - Whether to remember the user's session
 * @returns {Promise} - Promise resolving to the API response
 */
export const login = async (credentials, rememberMe = false) => {
  try {
    // For development mode without a backend
    if (isDev) {
      console.log('Dev mode: Simulating login');

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Check if user exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((user) => user.email === credentials.email);

      if (!user) {
        throw new Error('Email not registered. Please check your email or sign up.');
      }

      // Check password
      if (user.password !== credentials.password) {
        throw new Error('Incorrect password. Please try again.');
      }

      // Create response data (without password)
      const responseData = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || 'student',
        },
        token: `dev-token-${Date.now()}`,
      };

      // Store user data and token based on rememberMe preference
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(responseData.user));
        localStorage.setItem('authToken', responseData.token);
        localStorage.setItem('rememberMe', 'true');
      } else {
        sessionStorage.setItem('user', JSON.stringify(responseData.user));
        sessionStorage.setItem('authToken', responseData.token);
        // Clear any previous localStorage values
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        localStorage.removeItem('rememberMe');
      }

      return responseData;
    }

    // For production mode with API
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store user data and token
    if (rememberMe) {
      // Use localStorage for persistent storage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('rememberMe', 'true');
    } else {
      // Use sessionStorage for session-only storage
      sessionStorage.setItem('user', JSON.stringify(data.user));
      sessionStorage.setItem('authToken', data.token);
      // Clear any previous localStorage values
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      localStorage.removeItem('rememberMe');
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Log out the current user
 */
export const logout = () => {
  // Clear all auth data
  localStorage.removeItem('user');
  localStorage.removeItem('authToken');
  localStorage.removeItem('rememberMe');

  sessionStorage.removeItem('user');
  sessionStorage.removeItem('authToken');

  // Force reload the application to clear any state
  window.location.href = '/';
};

/**
 * Get the current authenticated user
 * @returns {Object|null} - The current user or null if not authenticated
 */
export const getCurrentUser = () => {
  // Check sessionStorage first (for non-persistent sessions)
  const sessionUser = sessionStorage.getItem('user');
  if (sessionUser) {
    return JSON.parse(sessionUser);
  }

  // Then check localStorage (for persistent sessions)
  const localUser = localStorage.getItem('user');
  return localUser ? JSON.parse(localUser) : null;
};

/**
 * Get the current authentication token
 * @returns {string|null} - The current token or null if not authenticated
 */
export const getToken = () => {
  return sessionStorage.getItem('authToken') || localStorage.getItem('authToken');
};

/**
 * Check if the user is authenticated
 * @returns {boolean} - True if the user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Verify if the current token is valid
 * @returns {Promise<boolean>} - True if the token is valid
 */
export const verifyToken = async () => {
  const token = getToken();

  if (!token) {
    return false;
  }

  try {
    const response = await fetch(`${API_URL}/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      // Token is invalid, clear auth data
      logout();
      return false;
    }

    const data = await response.json();
    return true;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
};

/**
 * Add authorization header to fetch requests
 * @param {Object} options - Fetch options object
 * @returns {Object} - Updated options with authorization header
 */
export const authHeader = (options = {}) => {
  const token = getToken();

  if (!token) {
    return options;
  }

  return {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  };
};

// For development/testing without actual API
export const mockAuthForDev = (forceCreate = false) => {
  if (!isDev) return;

  // Only create a mock user when explicitly requested
  if (forceCreate && !getCurrentUser()) {
    const mockUser = {
      id: 'mock-user-123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'student',
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('authToken', 'mock-token-for-development');
    console.log('🔧 Development: Mock user created for testing');
    return true;
  }
  return false;
};
