// src/services/interfaces/ICartService.ts
import { Cart, CartItem } from '../../types/cartTypes';
import { ApiResponse } from '../../types/authTypes';

export interface AddItemRequest {
  productId: number;
  size: string;
  quantity: number;
}

export interface ICartService {
  fetchUserCart(jwt: string): Promise<Cart>;
  addItemToCart(jwt: string, req: AddItemRequest): Promise<CartItem>;
  deleteCartItem(jwt: string, cartItemId: number): Promise<ApiResponse>;
  updateCartItem(jwt: string, cartItemId: number, quantity: number): Promise<CartItem>;
  applyCoupon(jwt: string, apply: string, code: string, orderValue: number): Promise<Cart>;
}
