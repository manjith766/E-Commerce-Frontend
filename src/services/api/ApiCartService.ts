// src/services/api/ApiCartService.ts
import { ICartService, AddItemRequest } from '../interfaces/ICartService';
import { Cart, CartItem } from '../../types/cartTypes';
import { ApiResponse } from '../../types/authTypes';
import { api } from '../../Config/Api';

const API_URL = '/api/cart';

export class ApiCartService implements ICartService {
  async fetchUserCart(jwt: string): Promise<Cart> {
    const response = await api.get<Cart>(API_URL, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async addItemToCart(jwt: string, req: AddItemRequest): Promise<CartItem> {
    const response = await api.put<CartItem>(`${API_URL}/add`, req, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async deleteCartItem(jwt: string, cartItemId: number): Promise<ApiResponse> {
    const response = await api.delete<ApiResponse>(`${API_URL}/item/${cartItemId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async updateCartItem(jwt: string, cartItemId: number, quantity: number): Promise<CartItem> {
    const response = await api.put<CartItem>(
      `${API_URL}/item/${cartItemId}`,
      { quantity },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    return response.data;
  }

  async applyCoupon(jwt: string, apply: string, code: string, orderValue: number): Promise<Cart> {
    const response = await api.post<Cart>(
      '/api/coupons/apply',
      null,
      {
        params: { apply, code, orderValue },
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    return response.data;
  }
}
