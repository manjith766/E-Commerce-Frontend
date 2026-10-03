// src/services/api/ApiSellerService.ts
import { ISellerService } from '../interfaces/ISellerService';
import { Seller, SellerReport } from '../../types/sellerTypes';
import { Product } from '../../types/productTypes';
import { Order, OrderStatus } from '../../types/orderTypes';
import { api } from '../../Config/Api';

const API_URL = '/sellers';

export class ApiSellerService implements ISellerService {
  async sendLoginOtp(email: string): Promise<any> {
    const response = await api.post('/sellers/sent/login-top', { email });
    return response.data;
  }

  async verifyLoginOtp(otp: string, email: string): Promise<any> {
    const response = await api.post('/sellers/verify/login-top', { otp, email });
    if (response.data.jwt) {
      localStorage.setItem('jwt', response.data.jwt);
    }
    return response.data;
  }

  async createSeller(seller: any): Promise<any> {
    const response = await api.post<Seller>(API_URL, seller);
    return response.data;
  }

  async fetchSellerProfile(jwt: string): Promise<Seller> {
    const response = await api.get<Seller>(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async fetchSellers(status?: string): Promise<Seller[]> {
    const response = await api.get<Seller[]>(API_URL, {
      params: { status },
    });
    return response.data;
  }

  async fetchSellerById(id: number): Promise<Seller> {
    const response = await api.get<Seller>(`${API_URL}/${id}`);
    return response.data;
  }

  async fetchSellerReport(jwt: string): Promise<SellerReport> {
    const response = await api.get<SellerReport>(`${API_URL}/report`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async updateSellerProfile(jwt: string, seller: Seller): Promise<Seller> {
    const response = await api.patch<Seller>(API_URL, seller, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async updateSellerAccountStatus(id: number, status: string): Promise<Seller> {
    const response = await api.patch<Seller>(`/admin/seller/${id}/status/${status}`);
    return response.data;
  }

  async verifySellerEmail(otp: string): Promise<Seller> {
    const response = await api.patch<Seller>(`${API_URL}/verify/${otp}`);
    return response.data;
  }

  async deleteSeller(id: number): Promise<any> {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
  }

  async fetchSellerProducts(jwt: string): Promise<Product[]> {
    const response = await api.get<Product[]>('/sellers/product', {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async createSellerProduct(jwt: string, product: any): Promise<Product> {
    const response = await api.post<Product>('/sellers/product', product, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async updateSellerProduct(jwt: string, id: number, product: any): Promise<Product> {
    const response = await api.patch<Product>(`/sellers/product/${id}`, product, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async updateSellerProductStock(jwt: string, id: number): Promise<Product> {
    const response = await api.patch<Product>(`/sellers/product/${id}/stock`, {}, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async deleteSellerProduct(jwt: string, id: number): Promise<any> {
    const response = await api.delete(`/sellers/product/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async fetchSellerOrders(jwt: string): Promise<Order[]> {
    const response = await api.get<Order[]>('/seller/orders', {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async updateSellerOrderStatus(jwt: string, orderId: number, status: OrderStatus): Promise<Order> {
    const response = await api.patch<Order>(
      `/seller/orders/${orderId}/status/${status}`,
      null,
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    return response.data;
  }

  async deleteSellerOrder(jwt: string, orderId: number): Promise<any> {
    const response = await api.delete(`/seller/orders/${orderId}/delete`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async fetchSellerPayouts(jwt: string): Promise<any[]> {
    const response = await api.get<any[]>('/api/payouts/seller', {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async fetchAllPayouts(): Promise<any[]> {
    const response = await api.get<any[]>('/api/payouts');
    return response.data;
  }

  async updatePayoutStatus(id: number, status: string): Promise<any> {
    const response = await api.put<any>(`/api/payouts/${id}/status`, null, {
      params: { status },
    });
    return response.data;
  }

  async fetchSellerTransactions(jwt: string): Promise<any[]> {
    const response = await api.get<any[]>('/api/transactions/seller', {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async fetchAllTransactions(): Promise<any[]> {
    const response = await api.get<any[]>('/api/transactions');
    return response.data;
  }

  async fetchRevenueChart(jwt: string, chartType: string): Promise<any[]> {
    const response = await api.get<any[]>('/api/seller/revenue/chart', {
      params: { type: chartType },
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }
}
