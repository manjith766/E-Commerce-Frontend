// src/slices/orderSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { Order, OrderItem, OrderState } from "../../types/orderTypes";
import { Address } from "../../types/userTypes";
import { ApiResponse } from "../../types/authTypes";
import { orderService } from "../../services/serviceFactory";

const initialState: OrderState = {
  orders: [],
  orderItem: null,
  currentOrder: null,
  paymentOrder: null,
  loading: false,
  error: null,
  orderCanceled: false,
};

// Fetch user order history
export const fetchUserOrderHistory = createAsyncThunk<Order[], string>(
  "orders/fetchUserOrderHistory",
  async (jwt, { rejectWithValue }) => {
    try {
      const data = await orderService.fetchUserOrderHistory(jwt);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || "Failed to fetch order history"
      );
    }
  }
);

// Fetch order by ID
export const fetchOrderById = createAsyncThunk<
  Order,
  { orderId: number; jwt: string }
>("orders/fetchOrderById", async ({ orderId, jwt }, { rejectWithValue }) => {
  try {
    const data = await orderService.fetchOrderById(jwt, orderId);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch order");
  }
});

// Create a new order
export const createOrder = createAsyncThunk<
  any,
  { address: Address; jwt: string; paymentGateway: string }
>("orders/createOrder", async ({ address, jwt, paymentGateway }, { rejectWithValue }) => {
  try {
    const data = await orderService.createOrder(jwt, address, paymentGateway);
    if (data.payment_link_url) {
      window.location.href = data.payment_link_url;
    }
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || "Failed to create order");
  }
});

export const fetchOrderItemById = createAsyncThunk<
  OrderItem,
  { orderItemId: number; jwt: string }
>("orders/fetchOrderItemById", async ({ orderItemId, jwt }, { rejectWithValue }) => {
  try {
    const data = await orderService.fetchOrderItemById(jwt, orderItemId);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch order item");
  }
});

// Payment success handler
export const paymentSuccess = createAsyncThunk<
  ApiResponse,
  { paymentId: string; jwt: string; paymentLinkId: string },
  { rejectValue: string }
>('orders/paymentSuccess', async ({ paymentId, jwt, paymentLinkId }, { rejectWithValue }) => {
  try {
    const data = await orderService.paymentSuccess(jwt, paymentId, paymentLinkId);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || 'Failed to process payment');
  }
});

export const cancelOrder = createAsyncThunk<Order, any>(
  'orders/cancelOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const data = await orderService.cancelOrder(localStorage.getItem("jwt") || '', orderId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred while cancelling the order.');
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user order history
      .addCase(fetchUserOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCanceled = false;
      })
      .addCase(
        fetchUserOrderHistory.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.orders = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUserOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderById.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.currentOrder = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create a new order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.paymentOrder = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Order Item by ID
      .addCase(fetchOrderItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItem = action.payload;
      })
      .addCase(fetchOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Payment success handler
      .addCase(paymentSuccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentSuccess.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(paymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCanceled = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
        state.orderCanceled = true;
        state.currentOrder = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectCurrentOrder = (state: RootState) =>
  state.orders.currentOrder;
export const selectPaymentOrder = (state: RootState) =>
  state.orders.paymentOrder;
export const selectOrdersLoading = (state: RootState) => state.orders.loading;
export const selectOrdersError = (state: RootState) => state.orders.error;
