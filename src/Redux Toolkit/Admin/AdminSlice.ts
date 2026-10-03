import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HomeCategory } from '../../types/homeDataTypes';
import { adminService } from '../../services/serviceFactory';

export const updateHomeCategory = createAsyncThunk<HomeCategory, { id: number; data: HomeCategory }>(
  'homeCategory/updateHomeCategory',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await adminService.updateHomeCategory(id, data);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred while updating the category.');
    }
  }
);

export const fetchHomeCategories = createAsyncThunk<HomeCategory[]>(
  'homeCategory/fetchHomeCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await adminService.fetchHomeCategories();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch categories');
    }
  }
);

interface HomeCategoryState {
  categories: HomeCategory[];
  loading: boolean;
  error: string | null;
  categoryUpdated: boolean;
}

const initialState: HomeCategoryState = {
  categories: [],
  loading: false,
  error: null,
  categoryUpdated: false,
};

// Create the slice
const homeCategorySlice = createSlice({
  name: 'homeCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateHomeCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.categoryUpdated = false;
    });

    builder.addCase(updateHomeCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryUpdated = true;
      const index = state.categories.findIndex((category) => category.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      } else {
        state.categories.push(action.payload);
      }
    });

    builder.addCase(updateHomeCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchHomeCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.categoryUpdated = false;
    })
    .addCase(fetchHomeCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    })
    .addCase(fetchHomeCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default homeCategorySlice.reducer;
