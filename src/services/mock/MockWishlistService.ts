// src/services/mock/MockWishlistService.ts
import { IWishlistService } from '../interfaces/IWishlistService';
import { Wishlist } from '../../types/wishlistTypes';
import { demoProducts } from '../../mock/data/products';
import { demoCustomer } from '../../mock/data/users';
import { mockStorage } from '../../mock/persistence/mockStorage';

export class MockWishlistService implements IWishlistService {
  private getWishlist(): Wishlist {
    return mockStorage.getItem<Wishlist>('user_wishlist', {
      id: 1,
      user: demoCustomer,
      products: [demoProducts[1], demoProducts[4]],
    });
  }

  private saveWishlist(wishlist: Wishlist): Wishlist {
    mockStorage.setItem('user_wishlist', wishlist);
    return wishlist;
  }

  async fetchUserWishlist(jwt: string): Promise<Wishlist> {
    await new Promise((r) => setTimeout(r, 200));
    return this.getWishlist();
  }

  async addProductToWishlist(jwt: string, productId: number): Promise<Wishlist> {
    await new Promise((r) => setTimeout(r, 250));
    const wishlist = this.getWishlist();
    const product = demoProducts.find((p) => p.id === Number(productId)) || demoProducts[0];

    const exists = wishlist.products.some((p) => p.id === Number(productId));
    if (exists) {
      wishlist.products = wishlist.products.filter((p) => p.id !== Number(productId));
    } else {
      wishlist.products.push(product);
    }

    return this.saveWishlist(wishlist);
  }
}
