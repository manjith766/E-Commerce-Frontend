import { createAsyncThunk } from '@reduxjs/toolkit';
import { HomeCategory, HomeData } from '../../../types/homeDataTypes';
import { adminService } from '../../../services/serviceFactory';

// Async thunk to fetch home page data with try-catch for error handling
export const fetchHomePageData = createAsyncThunk<HomeData>(
  'home/fetchHomePageData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await adminService.fetchHomePageData();
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch home page data';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createHomeCategories = createAsyncThunk<HomeData, HomeCategory[]>(
  'home/createHomeCategories',
  async (homeCategories, { rejectWithValue }) => {
    try {
      const cats = await adminService.createHomeCategories(homeCategories);
      const data = await adminService.fetchHomePageData();
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create home categories';
      return rejectWithValue(errorMessage);
    }
  }
);
