// src/services/interfaces/IWishlistService.ts
import { Wishlist } from '../../types/wishlistTypes';

export interface IWishlistService {
  fetchUserWishlist(jwt: string): Promise<Wishlist>;
  addProductToWishlist(jwt: string, productId: number): Promise<Wishlist>;
}
