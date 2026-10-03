import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sellerService } from '../../services/serviceFactory';

interface RevenueChart {
  date: string;
  revenue: number;
}

interface RevenueState {
  chart: RevenueChart[];
  loading: boolean;
  error: string | null;
}

const initialState: RevenueState = {
  chart: [],
  loading: false,
  error: null,
};

export const fetchRevenueChart = createAsyncThunk(
  'revenue/fetchRevenueChart',
  async ({ type }: { type: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt') || '';
      const data = await sellerService.fetchRevenueChart(token, type);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch revenue chart');
    }
  }
);

const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenueChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRevenueChart.fulfilled, (state, action) => {
        state.loading = false;
        state.chart = action.payload;
      })
      .addCase(fetchRevenueChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default revenueSlice.reducer;
