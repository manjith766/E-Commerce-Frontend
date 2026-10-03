import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/productTypes";
import { sellerService } from "../../services/serviceFactory";

export const fetchSellerProducts = createAsyncThunk<Product[], any>(
  "sellerProduct/fetchSellerProducts",
  async (jwt, { rejectWithValue }) => {
    try {
      const data = await sellerService.fetchSellerProducts(jwt);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message || "Failed to fetch seller products");
    }
  }
);

export const createProduct = createAsyncThunk<
  Product,
  { request: any; jwt: string | null }
>(
  "sellerProduct/createProduct",
  async ({ request, jwt }, { rejectWithValue }) => {
    try {
      const data = await sellerService.createSellerProduct(jwt || '', request);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message || "Failed to create product");
    }
  }
);

export const updateProduct = createAsyncThunk<
  any,
  { productId: number; product: any }
>(
  "sellerProduct/updateProduct",
  async ({ productId, product }, { rejectWithValue }) => {
    try {
      const data = await sellerService.updateSellerProduct(
        localStorage.getItem("jwt") || '',
        productId,
        product
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message || "Failed to update product");
    }
  }
);

export const updateProductStock = createAsyncThunk<any, any>(
  "sellerProduct/updateProductStock",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await sellerService.updateSellerProductStock(
        localStorage.getItem("jwt") || '',
        productId
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message || "Failed to update stock");
    }
  }
);

export const deleteProduct = createAsyncThunk<void, number>(
  "sellerProduct/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await sellerService.deleteSellerProduct(
        localStorage.getItem("jwt") || '',
        productId
      );
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message || "Failed to delete product");
    }
  }
);

interface SellerProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  productCreated: boolean;
}

const initialState: SellerProductState = {
  products: [],
  loading: false,
  error: null,
  productCreated: false,
};

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.productCreated = false;
      })
      .addCase(
        fetchSellerProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch products";
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.productCreated = false;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.unshift(action.payload);
          state.loading = false;
          state.productCreated = true;
        }
      )
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to create product";
        state.productCreated = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id
          );
          if (index !== -1) {
            state.products[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update product";
      })
      .addCase(
        updateProductStock.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id
          );
          if (index !== -1) {
            state.products[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.meta.arg
        );
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to delete product";
      });
  },
});

export default sellerProductSlice.reducer;
