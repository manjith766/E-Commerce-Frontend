// src/services/interfaces/IOrderService.ts
import { Order, OrderItem } from '../../types/orderTypes';
import { Address } from '../../types/userTypes';
import { ApiResponse } from '../../types/authTypes';

export interface IOrderService {
  fetchUserOrderHistory(jwt: string): Promise<Order[]>;
  fetchOrderById(jwt: string, orderId: number): Promise<Order>;
  createOrder(jwt: string, address: Address, paymentGateway: string): Promise<any>;
  cancelOrder(jwt: string, orderId: number): Promise<Order>;
  fetchOrderItemById(jwt: string, orderItemId: number): Promise<OrderItem>;
  paymentSuccess(jwt: string, paymentId: string, paymentLinkId: string): Promise<ApiResponse>;
}
