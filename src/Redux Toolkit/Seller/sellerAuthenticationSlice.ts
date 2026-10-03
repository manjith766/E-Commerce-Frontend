import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Seller } from '../../types/sellerTypes';
import { sellerService } from '../../services/serviceFactory';

interface SellerAuthState {
    otpSent: boolean;
    error: string | null;
    loading: boolean;
    jwt: string | null;
    sellerCreated: string | null;
}

const initialState: SellerAuthState = {
    otpSent: false,
    error: null,
    loading: false,
    jwt: localStorage.getItem("jwt") || null,
    sellerCreated: ""
};

export const sendLoginOtp = createAsyncThunk('otp/sendLoginOtp', async (email: string, { rejectWithValue }) => {
    try {
        const data = await sellerService.sendLoginOtp(email);
        return { email, ...data };
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to send OTP');
    }
});

export const verifyLoginOtp = createAsyncThunk('otp/verifyLoginOtp', 
    async (data: { email: string; otp: string; navigate: any }, { rejectWithValue }) => {
    try {
        const res = await sellerService.verifyLoginOtp(data.otp, data.email);
        if (data.navigate) {
            data.navigate("/seller");
        }
        return res;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to verify OTP');
    }
});

export const createSeller = createAsyncThunk<Seller, Seller>(
    'sellers/createSeller',
    async (seller: Seller, { rejectWithValue }) => {
        try {
            const data = await sellerService.createSeller(seller);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to create seller');
        }
    }
);

const sellerAuthSlice = createSlice({
    name: 'sellerAuth',
    initialState,
    reducers: {
        resetSellerAuthState: (state) => {
            state.otpSent = false;
            state.error = null;
            state.loading = false;
            state.jwt = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendLoginOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendLoginOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpSent = true;
                state.error = null;
            })
            .addCase(sendLoginOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(verifyLoginOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyLoginOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.error = null;
            })
            .addCase(verifyLoginOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSeller.fulfilled, (state, action: PayloadAction<Seller>) => {
                state.sellerCreated = "verification email sent to you";
                state.loading = false;
            })
            .addCase(createSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'Failed to create seller';
            });
    },
});

export const { resetSellerAuthState } = sellerAuthSlice.actions;
export default sellerAuthSlice.reducer;
