import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user') || 'null');

const initialState = {
  user: user || null,
  isAuthenticated: !!user,
  isLoading: false,
  error: null,
};

// Register user
export const register = createAsyncThunk('auth/register', async (formData, thunkAPI) => {
  try {
    return await api.register(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Registration failed');
  }
});

// Login user
export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    return await api.login(email, password);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Login failed');
  }
});

// Get current user
export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, thunkAPI) => {
  try {
    return await api.getCurrentUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to get user');
  }
});

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  api.logout();
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
