import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Payouts } from "../../types/payoutsType";
import { sellerService } from "../../services/serviceFactory";

interface PayoutsState {
  payouts: Payouts[];
  payout: Payouts | null;
  loading: boolean;
  error: string | null;
}

const initialState: PayoutsState = {
  payouts: [],
  payout: null,
  loading: false,
  error: null,
};

// Thunks
export const fetchPayoutsBySeller = createAsyncThunk<
  Payouts[],
  string,
  { rejectValue: string }
>("payouts/fetchPayoutsBySeller", async (jwt, { rejectWithValue }) => {
  try {
    const data = await sellerService.fetchSellerPayouts(jwt);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch payouts");
  }
});

export const fetchPayoutById = createAsyncThunk<
  Payouts,
  number,
  { rejectValue: string }
>("payouts/fetchPayoutById", async (id, { rejectWithValue }) => {
  try {
    const payouts = await sellerService.fetchAllPayouts();
    const found = payouts.find((p) => p.id === Number(id));
    if (!found) throw new Error("Payout not found");
    return found;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch payout");
  }
});

export const updatePayoutStatus = createAsyncThunk<
  Payouts,
  { id: number; status: string },
  { rejectValue: string }
>("payouts/updatePayoutStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const data = await sellerService.updatePayoutStatus(id, status);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || "Failed to update payout status");
  }
});

// Slice
const payoutsSlice = createSlice({
  name: "payouts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayoutsBySeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayoutsBySeller.fulfilled, (state, action) => {
        state.loading = false;
        state.payouts = action.payload;
      })
      .addCase(fetchPayoutsBySeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPayoutById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayoutById.fulfilled, (state, action) => {
        state.loading = false;
        state.payout = action.payload;
      })
      .addCase(fetchPayoutById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // update payouts
      .addCase(updatePayoutStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayoutStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.payouts.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.payouts[index] = action.payload;
        }
      })
      .addCase(updatePayoutStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default payoutsSlice.reducer;
