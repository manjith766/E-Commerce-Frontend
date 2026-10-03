import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/productTypes";
import { RootState } from "../Store";
import { productService } from "../../services/serviceFactory";

interface ProductState {
  product: Product | null;
  products: Product[];
  paginatedProducts: any;
  totalPages: number;
  loading: boolean;
  error: string | null;
  searchProduct: Product[];
}

const initialState: ProductState = {
  product: null,
  products: [],
  paginatedProducts: null,
  totalPages: 1,
  loading: false,
  error: null,
  searchProduct: [],
};

export const fetchProductById = createAsyncThunk<Product, number>(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await productService.getProductById(productId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message || "Failed to fetch product");
    }
  }
);

export const searchProduct = createAsyncThunk<Product[], string>(
  "products/searchProduct",
  async (query, { rejectWithValue }) => {
    try {
      const data = await productService.searchProducts(query);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message || "Failed to search products");
    }
  }
);

export const getAllProducts = createAsyncThunk<
  any,
  {
    category?: string;
    brand?: string;
    color?: string;
    size?: string;
    minPrice?: number;
    maxPrice?: number;
    minDiscount?: number;
    sort?: string;
    stock?: string;
    pageNumber?: number;
  }
>("products/getAllProducts", async (params, { rejectWithValue }) => {
  try {
    const data = await productService.getAllProducts(params);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message || "Failed to fetch products");
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.product = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      })
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchProduct.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.searchProduct = action.payload;
          state.loading = false;
        }
      )
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search products";
      })
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.paginatedProducts = action.payload;
          state.products = action.payload.content || [];
          state.totalPages = action.payload.totalPages || 1;
          state.loading = false;
        }
      )
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;

export const selectProduct = (state: RootState) => state.products.product;
export const selectProducts = (state: RootState) => state.products.products;
export const selectPaginatedProducts = (state: RootState) =>
  state.products.paginatedProducts;
export const selectProductLoading = (state: RootState) =>
  state.products.loading;
export const selectProductError = (state: RootState) => state.products.error;
