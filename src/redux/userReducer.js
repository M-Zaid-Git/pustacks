import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
  profile: null,
  uploads: [],
  downloads: [],
  bookmarks: [],
  isLoading: false,
  error: null,
};

// Get user profile
export const getProfile = createAsyncThunk('user/getProfile', async (_, thunkAPI) => {
  try {
    return await api.getProfile();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to get profile');
  }
});

// Update user profile
export const updateProfile = createAsyncThunk('user/updateProfile', async (formData, thunkAPI) => {
  try {
    return await api.updateProfile(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to update profile');
  }
});

// Get user uploads
export const getUserUploads = createAsyncThunk('user/getUserUploads', async (_, thunkAPI) => {
  try {
    return await api.getUserUploads();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to get uploads');
  }
});

// Get user downloads
export const getUserDownloads = createAsyncThunk('user/getUserDownloads', async (_, thunkAPI) => {
  try {
    return await api.getUserDownloads();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to get downloads');
  }
});

// Get user bookmarks
export const getUserBookmarks = createAsyncThunk('user/getUserBookmarks', async (_, thunkAPI) => {
  try {
    return await api.getUserBookmarks();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to get bookmarks');
  }
});

// Toggle bookmark
export const toggleBookmark = createAsyncThunk('user/toggleBookmark', async (materialId, thunkAPI) => {
  try {
    return await api.toggleBookmark(materialId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to toggle bookmark');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get profile
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload.user;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get uploads
      .addCase(getUserUploads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserUploads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploads = action.payload.data;
      })
      .addCase(getUserUploads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get downloads
      .addCase(getUserDownloads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserDownloads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.downloads = action.payload.data;
      })
      .addCase(getUserDownloads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get bookmarks
      .addCase(getUserBookmarks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserBookmarks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookmarks = action.payload.data;
      })
      .addCase(getUserBookmarks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Toggle bookmark
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        if (action.payload.bookmarked) {
          if (!state.bookmarks.some((item) => item._id === action.payload.materialId)) {
            state.bookmarks.push(action.payload.material);
          }
        } else {
          state.bookmarks = state.bookmarks.filter((item) => item._id !== action.payload.materialId);
        }
      });
  },
});

export const { resetError } = userSlice.actions;
export default userSlice.reducer;
