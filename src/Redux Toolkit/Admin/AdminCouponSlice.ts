import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Coupon, CouponState } from "../../types/couponTypes";
import { adminService } from "../../services/serviceFactory";

export const createCoupon = createAsyncThunk<
  Coupon,
  { coupon: any; jwt: string },
  { rejectValue: string }
>("coupon/createCoupon", async ({ coupon, jwt }, { rejectWithValue }) => {
  try {
    const data = await adminService.createCoupon(jwt, coupon);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || "Failed to create coupon");
  }
});

export const deleteCoupon = createAsyncThunk<
  string,
  { id: number; jwt: string },
  { rejectValue: string }
>("coupon/deleteCoupon", async ({ id, jwt }, { rejectWithValue }) => {
  try {
    const data = await adminService.deleteCoupon(jwt, id);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || "Failed to delete coupon");
  }
});

export const fetchAllCoupons = createAsyncThunk<
  Coupon[],
  string,
  { rejectValue: string }
>("coupon/fetchAllCoupons", async (jwt, { rejectWithValue }) => {
  try {
    const data = await adminService.fetchAllCoupons(jwt);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch coupons");
  }
});

const initialState: CouponState = {
  coupons: [],
  cart: null,
  loading: false,
  error: null,
  couponCreated: false,
  couponApplied: false,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.couponCreated = false;
      })
      .addCase(
        createCoupon.fulfilled,
        (state, action: PayloadAction<Coupon>) => {
          state.loading = false;
          state.coupons.push(action.payload);
          state.couponCreated = true;
        }
      )
      .addCase(
        createCoupon.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to create coupon";
          state.couponCreated = false;
        }
      )
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = state.coupons.filter(
          (coupon) => coupon.id !== parseInt(action.meta.arg.id.toString())
        );
      })
      .addCase(
        deleteCoupon.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to delete coupon";
        }
      )
      .addCase(fetchAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.couponCreated = false;
      })
      .addCase(
        fetchAllCoupons.fulfilled,
        (state, action: PayloadAction<Coupon[]>) => {
          state.loading = false;
          state.coupons = action.payload;
        }
      )
      .addCase(
        fetchAllCoupons.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch coupons";
        }
      );
  },
});

export default couponSlice.reducer;
