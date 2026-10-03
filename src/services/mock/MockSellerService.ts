// src/services/mock/MockSellerService.ts
import { ISellerService } from '../interfaces/ISellerService';
import { Seller, SellerReport } from '../../types/sellerTypes';
import { Product } from '../../types/productTypes';
import { Order, OrderStatus } from '../../types/orderTypes';
import { demoSellers, demoSellerReport } from '../../mock/data/users';
import { demoProducts } from '../../mock/data/products';
import { demoOrders, demoTransactions, demoPayouts } from '../../mock/data/orders';
import { mockStorage } from '../../mock/persistence/mockStorage';
import { generateId, generateMockJwt } from '../../mock/utils/idGenerator';

export class MockSellerService implements ISellerService {
  private getSellers(): Seller[] {
    return mockStorage.getItem<Seller[]>('sellers', demoSellers);
  }

  private saveSellers(sellers: Seller[]): void {
    mockStorage.setItem('sellers', sellers);
  }

  private getProducts(): Product[] {
    return mockStorage.getItem<Product[]>('products', demoProducts);
  }

  private saveProducts(products: Product[]): void {
    mockStorage.setItem('products', products);
  }

  private getOrders(): Order[] {
    return mockStorage.getItem<Order[]>('orders', demoOrders);
  }

  private saveOrders(orders: Order[]): void {
    mockStorage.setItem('orders', orders);
  }

  // Auth & Profile
  async sendLoginOtp(email: string): Promise<any> {
    await new Promise((r) => setTimeout(r, 300));
    console.log(`[MockSeller] OTP sent to ${email}: 123456`);
    return { email, message: 'OTP sent successfully (Demo OTP: 123456)' };
  }

  async verifyLoginOtp(otp: string, email: string): Promise<any> {
    await new Promise((r) => setTimeout(r, 400));
    if (otp !== '123456' && otp !== '654321') {
      throw new Error('Invalid OTP (Demo OTP: 123456)');
    }
    const jwt = generateMockJwt('ROLE_SELLER');
    localStorage.setItem('jwt', jwt);
    return { jwt, message: 'Seller authenticated successfully', role: 'ROLE_SELLER' };
  }

  async createSeller(seller: any): Promise<any> {
    await new Promise((r) => setTimeout(r, 400));
    const sellers = this.getSellers();
    const newSeller: Seller = {
      ...seller,
      id: generateId(),
      accountStatus: 'PENDING_VERIFICATION',
    };
    sellers.push(newSeller);
    this.saveSellers(sellers);
    return newSeller;
  }

  async fetchSellerProfile(jwt: string): Promise<Seller> {
    await new Promise((r) => setTimeout(r, 200));
    const sellers = this.getSellers();
    return sellers[0] || demoSellers[0];
  }

  async fetchSellers(status?: string): Promise<Seller[]> {
    await new Promise((r) => setTimeout(r, 250));
    const sellers = this.getSellers();
    if (status) {
      return sellers.filter((s) => s.accountStatus === status);
    }
    return sellers;
  }

  async fetchSellerById(id: number): Promise<Seller> {
    await new Promise((r) => setTimeout(r, 200));
    const sellers = this.getSellers();
    const seller = sellers.find((s) => s.id === Number(id));
    if (!seller) {
      throw new Error(`Seller with ID ${id} not found`);
    }
    return seller;
  }

  async fetchSellerReport(jwt: string): Promise<SellerReport> {
    await new Promise((r) => setTimeout(r, 200));
    return mockStorage.getItem<SellerReport>('seller_report', demoSellerReport);
  }

  async updateSellerProfile(jwt: string, seller: Seller): Promise<Seller> {
    await new Promise((r) => setTimeout(r, 300));
    const sellers = this.getSellers();
    const index = sellers.findIndex((s) => s.id === seller.id || s.email === seller.email);
    if (index !== -1) {
      sellers[index] = { ...sellers[index], ...seller };
      this.saveSellers(sellers);
      return sellers[index];
    }
    sellers[0] = { ...sellers[0], ...seller };
    this.saveSellers(sellers);
    return sellers[0];
  }

  async updateSellerAccountStatus(id: number, status: string): Promise<Seller> {
    await new Promise((r) => setTimeout(r, 250));
    const sellers = this.getSellers();
    const seller = sellers.find((s) => s.id === Number(id));
    if (!seller) {
      throw new Error(`Seller with ID ${id} not found`);
    }
    seller.accountStatus = status;
    this.saveSellers(sellers);
    return seller;
  }

  async verifySellerEmail(otp: string): Promise<Seller> {
    await new Promise((r) => setTimeout(r, 300));
    const sellers = this.getSellers();
    sellers[0].accountStatus = 'ACTIVE';
    this.saveSellers(sellers);
    return sellers[0];
  }

  async deleteSeller(id: number): Promise<any> {
    await new Promise((r) => setTimeout(r, 250));
    const sellers = this.getSellers();
    const filtered = sellers.filter((s) => s.id !== Number(id));
    this.saveSellers(filtered);
    return { message: 'Seller deleted successfully', status: true };
  }

  // Products
  async fetchSellerProducts(jwt: string): Promise<Product[]> {
    await new Promise((r) => setTimeout(r, 250));
    const products = this.getProducts();
    return products.filter((p) => !p.seller || p.seller.id === 1);
  }

  async createSellerProduct(jwt: string, product: any): Promise<Product> {
    await new Promise((r) => setTimeout(r, 300));
    const products = this.getProducts();
    const newProduct: Product = {
      ...product,
      id: generateId(),
      seller: demoSellers[0],
      createdAt: new Date().toISOString(),
      numRatings: product.numRatings || 0,
      in_stock: product.in_stock !== undefined ? product.in_stock : true,
    };
    products.unshift(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  async updateSellerProduct(jwt: string, id: number, product: any): Promise<Product> {
    await new Promise((r) => setTimeout(r, 300));
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === Number(id));
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }
    products[index] = { ...products[index], ...product };
    this.saveProducts(products);
    return products[index];
  }

  async updateSellerProductStock(jwt: string, id: number): Promise<Product> {
    await new Promise((r) => setTimeout(r, 200));
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === Number(id));
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }
    products[index].in_stock = !products[index].in_stock;
    this.saveProducts(products);
    return products[index];
  }

  async deleteSellerProduct(jwt: string, id: number): Promise<any> {
    await new Promise((r) => setTimeout(r, 250));
    const products = this.getProducts();
    const filtered = products.filter((p) => p.id !== Number(id));
    this.saveProducts(filtered);
    return { message: 'Product deleted successfully', status: true };
  }

  // Orders
  async fetchSellerOrders(jwt: string): Promise<Order[]> {
    await new Promise((r) => setTimeout(r, 250));
    const orders = this.getOrders();
    return orders;
  }

  async updateSellerOrderStatus(jwt: string, orderId: number, status: OrderStatus): Promise<Order> {
    await new Promise((r) => setTimeout(r, 250));
    const orders = this.getOrders();
    const index = orders.findIndex((o) => o.id === Number(orderId));
    if (index === -1) {
      throw new Error(`Order with ID ${orderId} not found`);
    }
    orders[index].orderStatus = status;
    this.saveOrders(orders);
    return orders[index];
  }

  async deleteSellerOrder(jwt: string, orderId: number): Promise<any> {
    await new Promise((r) => setTimeout(r, 200));
    const orders = this.getOrders();
    const filtered = orders.filter((o) => o.id !== Number(orderId));
    this.saveOrders(filtered);
    return { message: 'Order deleted successfully', status: true };
  }

  // Payouts & Transactions
  async fetchSellerPayouts(jwt: string): Promise<any[]> {
    await new Promise((r) => setTimeout(r, 200));
    return mockStorage.getItem<any[]>('seller_payouts', demoPayouts);
  }

  async fetchAllPayouts(): Promise<any[]> {
    await new Promise((r) => setTimeout(r, 200));
    return mockStorage.getItem<any[]>('seller_payouts', demoPayouts);
  }

  async updatePayoutStatus(id: number, status: string): Promise<any> {
    await new Promise((r) => setTimeout(r, 200));
    const payouts = mockStorage.getItem<any[]>('seller_payouts', demoPayouts);
    const index = payouts.findIndex((p) => p.id === Number(id));
    if (index !== -1) {
      payouts[index].status = status;
      mockStorage.setItem('seller_payouts', payouts);
      return payouts[index];
    }
    return { message: 'Payout updated' };
  }

  async fetchSellerTransactions(jwt: string): Promise<any[]> {
    await new Promise((r) => setTimeout(r, 200));
    return mockStorage.getItem<any[]>('seller_transactions', demoTransactions);
  }

  async fetchAllTransactions(): Promise<any[]> {
    await new Promise((r) => setTimeout(r, 200));
    return mockStorage.getItem<any[]>('seller_transactions', demoTransactions);
  }

  async fetchRevenueChart(jwt: string, chartType: string): Promise<any[]> {
    await new Promise((r) => setTimeout(r, 200));
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, idx) => ({
      date: day,
      revenue: (idx + 1) * 3500 + Math.floor(Math.random() * 2000),
    }));
  }
}
