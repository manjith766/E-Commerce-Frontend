// src/services/api/ApiProductService.ts
import { IProductService, GetAllProductsParams } from '../interfaces/IProductService';
import { Product } from '../../types/productTypes';
import { api } from '../../Config/Api';

export class ApiProductService implements IProductService {
  async getProductById(productId: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${productId}`);
    return response.data;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const response = await api.get<Product[]>('/products/search', {
      params: { query },
    });
    return response.data;
  }

  async getAllProducts(params: GetAllProductsParams): Promise<any> {
    const response = await api.get<any>('/products', {
      params: {
        ...params,
        pageNumber: params.pageNumber || 0,
      },
    });
    return response.data;
  }
}
