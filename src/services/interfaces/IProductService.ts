// src/services/interfaces/IProductService.ts
import { Product } from '../../types/productTypes';

export interface GetAllProductsParams {
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

export interface IProductService {
  getProductById(productId: number): Promise<Product>;
  searchProducts(query: string): Promise<Product[]>;
  getAllProducts(params: GetAllProductsParams): Promise<any>;
}
