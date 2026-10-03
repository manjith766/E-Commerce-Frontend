// src/services/mock/MockOrderService.ts
import { IOrderService } from '../interfaces/IOrderService';
import { Order, OrderItem, OrderStatus } from '../../types/orderTypes';
import { Address } from '../../types/userTypes';
import { ApiResponse } from '../../types/authTypes';
import { demoOrders } from '../../mock/data/orders';
import { demoCustomer } from '../../mock/data/users';
import { mockStorage } from '../../mock/persistence/mockStorage';
import { generateId, generateOrderId } from '../../mock/utils/idGenerator';
import { Cart } from '../../types/cartTypes';

export class MockOrderService implements IOrderService {
  private getOrders(): Order[] {
    return mockStorage.getItem<Order[]>('orders', demoOrders);
  }

  private saveOrders(orders: Order[]): void {
    mockStorage.setItem('orders', orders);
  }

  async fetchUserOrderHistory(jwt: string): Promise<Order[]> {
    await new Promise((r) => setTimeout(r, 250));
    return this.getOrders();
  }

  async fetchOrderById(jwt: string, orderId: number): Promise<Order> {
    await new Promise((r) => setTimeout(r, 200));
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === Number(orderId));
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }
    return order;
  }

  async createOrder(jwt: string, address: Address, paymentGateway: string): Promise<any> {
    await new Promise((r) => setTimeout(r, 400));
    const cart = mockStorage.getItem<Cart | null>('user_cart', null);
    const orders = this.getOrders();
    const newId = generateId();
    const generatedOrderCode = generateOrderId();

    const orderItems: OrderItem[] = cart && cart.cartItems.length > 0
      ? cart.cartItems.map((ci, idx) => ({
        id: generateId() + idx,
        order: {} as Order,
        product: ci.product,
        size: ci.size,
        quantity: ci.quantity,
        mrpPrice: ci.mrpPrice,
        sellingPrice: ci.sellingPrice,
        userId: demoCustomer.id || 1,
      }))
      : [];

    const totalMrp = cart ? cart.totalMrpPrice : 1999;
    const totalSelling = cart ? cart.totalSellingPrice : 1499;

    const newOrder: Order = {
      id: newId,
      orderId: generatedOrderCode,
      user: demoCustomer,
      sellerId: 1,
      orderItems: orderItems,
      orderDate: new Date().toISOString(),
      shippingAddress: address,
      paymentDetails: {
        paymentMethod: paymentGateway || 'RAZORPAY',
        transactionId: `tx_mock_${Date.now()}`,
        paymentId: `pay_mock_${Date.now()}`,
        status: 'COMPLETED',
      },
      totalMrpPrice: totalMrp,
      totalSellingPrice: totalSelling,
      discount: totalMrp - totalSelling,
      orderStatus: OrderStatus.PENDING,
      totalItem: orderItems.length,
      deliverDate: new Date(Date.now() + 5 * 86400000).toISOString(),
    };

    orders.unshift(newOrder);
    this.saveOrders(orders);

    // Clear cart after order creation
    if (cart) {
      cart.cartItems = [];
      cart.totalItem = 0;
      cart.totalMrpPrice = 0;
      cart.totalSellingPrice = 0;
      cart.discount = 0;
      cart.couponCode = null;
      mockStorage.setItem('user_cart', cart);
    }

    return {
      payment_link_url: `/payment-success/${newId}?payment_id=pay_mock_${Date.now()}&payment_link_id=link_mock_${Date.now()}`,
      orderId: newId,
      order: newOrder,
    };
  }

  async cancelOrder(jwt: string, orderId: number): Promise<Order> {
    await new Promise((r) => setTimeout(r, 250));
    const orders = this.getOrders();
    const orderIndex = orders.findIndex((o) => o.id === Number(orderId));
    if (orderIndex === -1) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    orders[orderIndex].orderStatus = OrderStatus.CANCELLED;
    this.saveOrders(orders);
    return orders[orderIndex];
  }

  async fetchOrderItemById(jwt: string, orderItemId: number): Promise<OrderItem> {
    await new Promise((r) => setTimeout(r, 200));
    const orders = this.getOrders();
    for (const order of orders) {
      const item = order.orderItems.find((oi) => oi.id === Number(orderItemId));
      if (item) return item;
    }
    throw new Error(`Order item with ID ${orderItemId} not found`);
  }

  async paymentSuccess(jwt: string, paymentId: string, paymentLinkId: string): Promise<ApiResponse> {
    await new Promise((r) => setTimeout(r, 250));
    return {
      message: 'Payment processed successfully (Mock Mode)',
      status: true,
    };
  }
}
