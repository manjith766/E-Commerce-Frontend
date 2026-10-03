import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { Seller, SellerReport } from "../../types/sellerTypes";
import { sellerService } from "../../services/serviceFactory";

interface SellerState {
  sellers: Seller[];
  selectedSeller: Seller | null;
  profile: Seller | null;
  loading: boolean;
  error: string | null;
  report: SellerReport | null;
  profileUpdated: boolean;
}

const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  loading: false,
  error: null,
  profile: null,
  report: null,
  profileUpdated: false,
};

export const fetchSellerProfile = createAsyncThunk<Seller, any>(
  "sellers/fetchSellerProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const data = await sellerService.fetchSellerProfile(jwt);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch seller profile");
    }
  }
);

export const fetchSellers = createAsyncThunk<Seller[], string>(
  "sellers/fetchSellers",
  async (status: string, { rejectWithValue }) => {
    try {
      const data = await sellerService.fetchSellers(status);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch sellers");
    }
  }
);

export const fetchSellerReport = createAsyncThunk<
  SellerReport,
  string,
  { rejectValue: string }
>("sellers/fetchSellerReport", async (jwt: string, { rejectWithValue }) => {
  try {
    const data = await sellerService.fetchSellerReport(jwt);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch seller report");
  }
});

export const fetchSellerById = createAsyncThunk<Seller, number>(
  "sellers/fetchSellerById",
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await sellerService.fetchSellerById(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch seller");
    }
  }
);

export const updateSeller = createAsyncThunk<Seller, any>(
  "sellers/updateSeller",
  async (seller: any, { rejectWithValue }) => {
    try {
      const data = await sellerService.updateSellerProfile(localStorage.getItem("jwt") || '', seller);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to update seller");
    }
  }
);

export const updateSellerAccountStatus = createAsyncThunk<
  Seller,
  { id: number; status: string }
>(
  "sellers/updateSellerAccountStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const data = await sellerService.updateSellerAccountStatus(id, status);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to update seller status");
    }
  }
);

export const verifySellerEmail = createAsyncThunk<
  any,
  { otp: number; navigate: any }
>(
  "sellers/verifySellerEmail",
  async ({ otp, navigate }, { rejectWithValue }) => {
    try {
      const data = await sellerService.verifySellerEmail(otp.toString());
      if (navigate) {
        navigate("/seller-account-verified");
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to verify seller");
    }
  }
);

export const deleteSeller = createAsyncThunk<void, number>(
  "sellers/deleteSeller",
  async (id: number, { rejectWithValue }) => {
    try {
      await sellerService.deleteSeller(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to delete seller");
    }
  }
);

const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch seller profile
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })
      .addCase(
        fetchSellerProfile.fulfilled,
        (state, action: PayloadAction<Seller>) => {
          state.profile = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch sellers";
      })
      // fetch sellers
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSellers.fulfilled,
        (state, action: PayloadAction<Seller[]>) => {
          state.sellers = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch sellers";
      })
      .addCase(fetchSellerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSellerById.fulfilled,
        (state, action: PayloadAction<Seller>) => {
          state.selectedSeller = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch seller";
      })

      .addCase(updateSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })
      .addCase(
        updateSeller.fulfilled,
        (state, action: PayloadAction<Seller>) => {
          const index = state.sellers.findIndex(
            (seller) => seller.id === action.payload.id
          );
          if (index !== -1) {
            state.sellers[index] = action.payload;
          }
          state.profile = action.payload;
          state.loading = false;
          state.profileUpdated = true;
        }
      )
      .addCase(updateSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update seller";
      })

      // update seller status
      .addCase(updateSellerAccountStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSellerAccountStatus.fulfilled,
        (state, action: PayloadAction<Seller>) => {
          const index = state.sellers.findIndex(
            (seller) => seller.id === action.payload.id
          );
          if (index !== -1) {
            state.sellers[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updateSellerAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update seller";
      })
      .addCase(deleteSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSeller.fulfilled, (state, action) => {
        state.sellers = state.sellers.filter(
          (seller) => seller.id !== action.meta.arg
        );
        state.loading = false;
      })
      .addCase(deleteSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to delete seller";
      })
      // seller report
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerSlice.reducer;

export const selectSellers = (state: RootState) => state.sellers.sellers;
export const selectSelectedSeller = (state: RootState) =>
  state.sellers.selectedSeller;
export const selectSellerLoading = (state: RootState) => state.sellers.loading;
export const selectSellerError = (state: RootState) => state.sellers.error;
