// src/services/api/ApiOrderService.ts
import { IOrderService } from '../interfaces/IOrderService';
import { Order, OrderItem } from '../../types/orderTypes';
import { Address } from '../../types/userTypes';
import { ApiResponse } from '../../types/authTypes';
import { api } from '../../Config/Api';

const API_URL = '/api/orders';

export class ApiOrderService implements IOrderService {
  async fetchUserOrderHistory(jwt: string): Promise<Order[]> {
    const response = await api.get<Order[]>(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async fetchOrderById(jwt: string, orderId: number): Promise<Order> {
    const response = await api.get<Order>(`${API_URL}/${orderId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async createOrder(jwt: string, address: Address, paymentGateway: string): Promise<any> {
    const response = await api.post<any>(API_URL, address, {
      headers: { Authorization: `Bearer ${jwt}` },
      params: { paymentMethod: paymentGateway },
    });
    if (response.data.payment_link_url) {
      window.location.href = response.data.payment_link_url;
    }
    return response.data;
  }

  async cancelOrder(jwt: string, orderId: number): Promise<Order> {
    const response = await api.put<Order>(`${API_URL}/${orderId}/cancel`, {}, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async fetchOrderItemById(jwt: string, orderItemId: number): Promise<OrderItem> {
    const response = await api.get<OrderItem>(`${API_URL}/item/${orderItemId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async paymentSuccess(jwt: string, paymentId: string, paymentLinkId: string): Promise<ApiResponse> {
    const response = await api.get<ApiResponse>(`/api/payment/${paymentId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
      params: { paymentLinkId },
    });
    return response.data;
  }
}
