// src/services/mock/MockCartService.ts
import { ICartService, AddItemRequest } from '../interfaces/ICartService';
import { Cart, CartItem } from '../../types/cartTypes';
import { ApiResponse } from '../../types/authTypes';
import { demoProducts } from '../../mock/data/products';
import { demoCustomer } from '../../mock/data/users';
import { demoCoupons } from '../../mock/data/coupons';
import { mockStorage } from '../../mock/persistence/mockStorage';
import { generateId } from '../../mock/utils/idGenerator';
import { sumCartItemMrpPrice, sumCartItemSellingPrice } from '../../util/cartCalculator';

export class MockCartService implements ICartService {
  private getInitialCart(): Cart {
    const item1: CartItem = {
      id: 1,
      cart: {} as Cart,
      product: demoProducts[0],
      size: 'M',
      quantity: 1,
      mrpPrice: demoProducts[0].mrpPrice,
      sellingPrice: demoProducts[0].sellingPrice,
      userId: demoCustomer.id || 1,
    };
    const item2: CartItem = {
      id: 2,
      cart: {} as Cart,
      product: demoProducts[6] || demoProducts[1],
      size: 'FREE',
      quantity: 1,
      mrpPrice: (demoProducts[6] || demoProducts[1]).mrpPrice,
      sellingPrice: (demoProducts[6] || demoProducts[1]).sellingPrice,
      userId: demoCustomer.id || 1,
    };

    const cartItems = [item1, item2];
    const totalMrp = sumCartItemMrpPrice(cartItems);
    const totalSelling = sumCartItemSellingPrice(cartItems);

    return {
      id: 1,
      user: demoCustomer,
      cartItems: cartItems,
      totalSellingPrice: totalSelling,
      totalItem: cartItems.length,
      totalMrpPrice: totalMrp,
      discount: totalMrp - totalSelling,
      couponCode: null,
    };
  }

  private getCart(): Cart {
    return mockStorage.getItem<Cart>('user_cart', this.getInitialCart());
  }

  private saveCart(cart: Cart): Cart {
    cart.totalItem = cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalMrpPrice = sumCartItemMrpPrice(cart.cartItems);
    cart.totalSellingPrice = sumCartItemSellingPrice(cart.cartItems);
    cart.discount = cart.totalMrpPrice - cart.totalSellingPrice;
    mockStorage.setItem('user_cart', cart);
    return cart;
  }

  async fetchUserCart(jwt: string): Promise<Cart> {
    await new Promise((r) => setTimeout(r, 200));
    return this.getCart();
  }

  async addItemToCart(jwt: string, req: AddItemRequest): Promise<CartItem> {
    await new Promise((r) => setTimeout(r, 300));
    const cart = this.getCart();
    const product = demoProducts.find((p) => p.id === req.productId) || demoProducts[0];

    const existingIndex = cart.cartItems.findIndex(
      (item) => item.product.id === req.productId && item.size === req.size
    );

    let resultItem: CartItem;

    if (existingIndex > -1) {
      cart.cartItems[existingIndex].quantity += req.quantity || 1;
      cart.cartItems[existingIndex].mrpPrice =
        cart.cartItems[existingIndex].quantity * product.mrpPrice;
      cart.cartItems[existingIndex].sellingPrice =
        cart.cartItems[existingIndex].quantity * product.sellingPrice;
      resultItem = cart.cartItems[existingIndex];
    } else {
      resultItem = {
        id: generateId(),
        cart: {} as Cart,
        product: product,
        size: req.size || 'M',
        quantity: req.quantity || 1,
        mrpPrice: (req.quantity || 1) * product.mrpPrice,
        sellingPrice: (req.quantity || 1) * product.sellingPrice,
        userId: demoCustomer.id || 1,
      };
      cart.cartItems.push(resultItem);
    }

    this.saveCart(cart);
    return resultItem;
  }

  async deleteCartItem(jwt: string, cartItemId: number): Promise<ApiResponse> {
    await new Promise((r) => setTimeout(r, 200));
    const cart = this.getCart();
    cart.cartItems = cart.cartItems.filter((item) => item.id !== cartItemId);
    this.saveCart(cart);
    return {
      message: 'Item removed from cart',
      status: true,
    };
  }

  async updateCartItem(jwt: string, cartItemId: number, quantity: number): Promise<CartItem> {
    await new Promise((r) => setTimeout(r, 200));
    const cart = this.getCart();
    const item = cart.cartItems.find((i) => i.id === cartItemId);
    if (!item) {
      throw new Error('Cart item not found');
    }

    item.quantity = quantity;
    item.mrpPrice = item.product.mrpPrice * quantity;
    item.sellingPrice = item.product.sellingPrice * quantity;

    this.saveCart(cart);
    return item;
  }

  async applyCoupon(jwt: string, apply: string, code: string, orderValue: number): Promise<Cart> {
    await new Promise((r) => setTimeout(r, 300));
    const cart = this.getCart();

    if (apply === 'false') {
      cart.couponCode = null;
      return this.saveCart(cart);
    }

    const coupon = demoCoupons.find(
      (c) => c.code.toLowerCase() === code.toLowerCase() && c.active
    );

    if (!coupon) {
      throw new Error('Invalid or expired coupon code');
    }

    if (cart.totalSellingPrice < coupon.minimumOrderValue) {
      throw new Error(`Minimum order value of ₹${coupon.minimumOrderValue} required for this coupon`);
    }

    cart.couponCode = coupon.code;
    const discountAmount = Math.round((cart.totalSellingPrice * coupon.discountPercentage) / 100);
    cart.totalSellingPrice = cart.totalSellingPrice - discountAmount;
    cart.discount = (cart.totalMrpPrice - cart.totalSellingPrice);

    mockStorage.setItem('user_cart', cart);
    return cart;
  }
}
