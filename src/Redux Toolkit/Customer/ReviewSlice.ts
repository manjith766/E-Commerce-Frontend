import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ApiResponse,
  CreateReviewRequest,
  Review,
  ReviewState,
} from "../../types/reviewTypes";
import { RootState } from "../Store";
import { reviewService } from "../../services/serviceFactory";

// Async thunks
export const fetchReviewsByProductId = createAsyncThunk<
  Review[],
  { productId: number },
  { rejectValue: string }
>(
  "review/fetchReviewsByProductId",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const data = await reviewService.fetchProductReviews(productId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch reviews");
    }
  }
);

export const createReview = createAsyncThunk<
  Review,
  { productId: number; review: CreateReviewRequest; jwt: string; navigate: any },
  { rejectValue: string }
>(
  "review/createReview",
  async ({ productId, review, jwt, navigate }, { rejectWithValue }) => {
    try {
      const data = await reviewService.createReview(jwt, productId, review);
      if (navigate) {
        navigate(`/reviews/${productId}`);
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to create review");
    }
  }
);

export const updateReview = createAsyncThunk<
  Review,
  { reviewId: number; review: CreateReviewRequest; jwt: string },
  { rejectValue: string }
>(
  "review/updateReview",
  async ({ reviewId, review, jwt }, { rejectWithValue }) => {
    try {
      const data = await reviewService.updateReview(jwt, reviewId, review);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to update review");
    }
  }
);

export const deleteReview = createAsyncThunk<
  ApiResponse,
  { reviewId: number; jwt: string },
  { rejectValue: string }
>("review/deleteReview", async ({ reviewId, jwt }, { rejectWithValue }) => {
  try {
    const data = await reviewService.deleteReview(jwt, reviewId);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || "Failed to delete review");
  }
});

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
  reviewCreated: false,
  reviewUpdated: false,
  reviewDeleted: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetReviewState: (state) => {
      state.reviews = [];
      state.loading = false;
      state.error = null;
      state.reviewCreated = false;
      state.reviewUpdated = false;
      state.reviewDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByProductId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchReviewsByProductId.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          state.reviews = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchReviewsByProductId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.reviewCreated = false;
      })
      .addCase(
        createReview.fulfilled,
        (state, action: PayloadAction<Review>) => {
          state.reviews.push(action.payload);
          state.loading = false;
          state.reviewCreated = true;
        }
      )
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.reviewCreated = false;
      })
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.reviewUpdated = false;
      })
      .addCase(
        updateReview.fulfilled,
        (state, action: PayloadAction<Review>) => {
          const index = state.reviews.findIndex(
            (r) => r.id === action.payload.id
          );
          if (index !== -1) {
            state.reviews[index] = action.payload;
          }
          state.loading = false;
          state.reviewUpdated = true;
        }
      )
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.reviewUpdated = false;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.reviewDeleted = false;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (r) => r.id !== action.meta.arg.reviewId
        );
        state.loading = false;
        state.reviewDeleted = true;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.reviewDeleted = false;
      });
  },
});

export default reviewSlice.reducer;
export const { resetReviewState } = reviewSlice.actions;
