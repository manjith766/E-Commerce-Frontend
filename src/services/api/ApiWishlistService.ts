// src/services/api/ApiWishlistService.ts
import { IWishlistService } from '../interfaces/IWishlistService';
import { Wishlist } from '../../types/wishlistTypes';
import { api } from '../../Config/Api';

export class ApiWishlistService implements IWishlistService {
  async fetchUserWishlist(jwt: string): Promise<Wishlist> {
    const response = await api.get<Wishlist>('/api/wishlist', {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async addProductToWishlist(jwt: string, productId: number): Promise<Wishlist> {
    const response = await api.post<Wishlist>(
      `/api/wishlist/add-product/${productId}`,
      {},
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    return response.data;
  }
}
