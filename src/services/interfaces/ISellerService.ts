// src/services/interfaces/ISellerService.ts
import { Seller, SellerReport } from '../../types/sellerTypes';
import { Product } from '../../types/productTypes';
import { Order, OrderStatus } from '../../types/orderTypes';

export interface ISellerService {
  sendLoginOtp(email: string): Promise<any>;
  verifyLoginOtp(otp: string, email: string): Promise<any>;
  createSeller(seller: any): Promise<any>;
  fetchSellerProfile(jwt: string): Promise<Seller>;
  fetchSellers(status?: string): Promise<Seller[]>;
  fetchSellerById(id: number): Promise<Seller>;
  fetchSellerReport(jwt: string): Promise<SellerReport>;
  updateSellerProfile(jwt: string, seller: Seller): Promise<Seller>;
  updateSellerAccountStatus(id: number, status: string): Promise<Seller>;
  verifySellerEmail(otp: string): Promise<Seller>;
  deleteSeller(id: number): Promise<any>;

  // Products
  fetchSellerProducts(jwt: string): Promise<Product[]>;
  createSellerProduct(jwt: string, product: any): Promise<Product>;
  updateSellerProduct(jwt: string, id: number, product: any): Promise<Product>;
  updateSellerProductStock(jwt: string, id: number): Promise<Product>;
  deleteSellerProduct(jwt: string, id: number): Promise<any>;

  // Orders
  fetchSellerOrders(jwt: string): Promise<Order[]>;
  updateSellerOrderStatus(jwt: string, orderId: number, status: OrderStatus): Promise<Order>;
  deleteSellerOrder(jwt: string, orderId: number): Promise<any>;

  // Payouts & Transactions
  fetchSellerPayouts(jwt: string): Promise<any[]>;
  fetchAllPayouts(): Promise<any[]>;
  updatePayoutStatus(id: number, status: string): Promise<any>;
  fetchSellerTransactions(jwt: string): Promise<any[]>;
  fetchAllTransactions(): Promise<any[]>;
  fetchRevenueChart(jwt: string, chartType: string): Promise<any[]>;
}
