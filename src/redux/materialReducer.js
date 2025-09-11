import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
  materials: [],
  currentMaterial: null,
  pagination: {
    total: 0,
    pages: 0,
    currentPage: 1,
    hasNext: false,
    hasPrev: false,
  },
  isLoading: false,
  error: null,
  filters: {
    category: '',
    fileType: '',
    subject: '',
    search: '',
    sort: '-createdAt',
  },
};

// Get all materials
export const getAllMaterials = createAsyncThunk('material/getAllMaterials', async (params, thunkAPI) => {
  try {
    return await api.getAllMaterials(params);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to get materials');
  }
});

// Get material by ID
export const getMaterialById = createAsyncThunk('material/getMaterialById', async (materialId, thunkAPI) => {
  try {
    return await api.getMaterialById(materialId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to get material');
  }
});

// Upload material
export const uploadMaterial = createAsyncThunk('material/uploadMaterial', async (formData, thunkAPI) => {
  try {
    return await api.uploadMaterial(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to upload material');
  }
});

// Update material
export const updateMaterial = createAsyncThunk('material/updateMaterial', async ({ materialId, data }, thunkAPI) => {
  try {
    return await api.updateMaterial(materialId, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to update material');
  }
});

// Delete material
export const deleteMaterial = createAsyncThunk('material/deleteMaterial', async (materialId, thunkAPI) => {
  try {
    return await api.deleteMaterial(materialId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to delete material');
  }
});

// Record download
export const recordDownload = createAsyncThunk('material/recordDownload', async (materialId, thunkAPI) => {
  try {
    return await api.recordDownload(materialId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to record download');
  }
});

const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        category: '',
        fileType: '',
        subject: '',
        search: '',
        sort: '-createdAt',
      };
    },
    clearCurrentMaterial: (state) => {
      state.currentMaterial = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all materials
      .addCase(getAllMaterials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.materials = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get material by ID
      .addCase(getMaterialById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMaterialById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMaterial = action.payload.data;
      })
      .addCase(getMaterialById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Upload material
      .addCase(uploadMaterial.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadMaterial.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(uploadMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update material
      .addCase(updateMaterial.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMaterial.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.currentMaterial && state.currentMaterial._id === action.payload.data._id) {
          state.currentMaterial = action.payload.data;
        }
        state.materials = state.materials.map((material) =>
          material._id === action.payload.data._id ? action.payload.data : material
        );
      })
      .addCase(updateMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete material
      .addCase(deleteMaterial.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.materials = state.materials.filter((material) => material._id !== action.meta.arg);
        if (state.currentMaterial && state.currentMaterial._id === action.meta.arg) {
          state.currentMaterial = null;
        }
      })
      .addCase(deleteMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Record download
      .addCase(recordDownload.fulfilled, (state, action) => {
        if (state.currentMaterial && state.currentMaterial._id === action.meta.arg) {
          state.currentMaterial.downloads = action.payload.downloadCount;
        }
      });
  },
});

export const { resetError, setFilters, resetFilters, clearCurrentMaterial } = materialSlice.actions;
export default materialSlice.reducer;
