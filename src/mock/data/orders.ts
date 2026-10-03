// src/mock/data/orders.ts
// Demo orders for mock mode.

import { Order, OrderStatus } from '../../types/orderTypes';
import { demoCustomer, demoAddresses, demoSellers } from './users';
import { demoProducts } from './products';
import { Transaction } from '../../types/Transaction';
import { Payouts } from '../../types/payoutsType';

const now = new Date();
const dayMs = 86400000;

// ─── Demo Orders ────────────────────────────────────────────

export const demoOrders: Order[] = [
  {
    id: 1, orderId: 'ORD-20240801-ABC123',
    user: demoCustomer, sellerId: 1,
    orderItems: [
      { id: 1, order: {} as Order, product: demoProducts[0], size: 'L', quantity: 1, mrpPrice: 1299, sellingPrice: 699, userId: 1 },
      { id: 2, order: {} as Order, product: demoProducts[3], size: 'M', quantity: 1, mrpPrice: 2199, sellingPrice: 1299, userId: 1 },
    ],
    orderDate: new Date(now.getTime() - 15 * dayMs).toISOString(),
    shippingAddress: demoAddresses[0],
    paymentDetails: { paymentMethod: 'RAZORPAY', transactionId: 'pay_mock_001', paymentId: 'pay_id_001', status: 'COMPLETED' },
    totalMrpPrice: 3498, totalSellingPrice: 1998, discount: 1500,
    orderStatus: OrderStatus.DELIVERED, totalItem: 2,
    deliverDate: new Date(now.getTime() - 10 * dayMs).toISOString(),
  },
  {
    id: 2, orderId: 'ORD-20240810-DEF456',
    user: demoCustomer, sellerId: 1,
    orderItems: [
      { id: 3, order: {} as Order, product: demoProducts[8], size: 'Free Size', quantity: 1, mrpPrice: 12999, sellingPrice: 7999, userId: 1 },
    ],
    orderDate: new Date(now.getTime() - 10 * dayMs).toISOString(),
    shippingAddress: demoAddresses[0],
    paymentDetails: { paymentMethod: 'RAZORPAY', transactionId: 'pay_mock_002', paymentId: 'pay_id_002', status: 'COMPLETED' },
    totalMrpPrice: 12999, totalSellingPrice: 7999, discount: 5000,
    orderStatus: OrderStatus.SHIPPED, totalItem: 1,
    deliverDate: new Date(now.getTime() - 3 * dayMs).toISOString(),
  },
  {
    id: 3, orderId: 'ORD-20240820-GHI789',
    user: demoCustomer, sellerId: 2,
    orderItems: [
      { id: 4, order: {} as Order, product: demoProducts[13], size: '256GB', quantity: 1, mrpPrice: 27999, sellingPrice: 22999, userId: 1 },
    ],
    orderDate: new Date(now.getTime() - 5 * dayMs).toISOString(),
    shippingAddress: demoAddresses[1],
    paymentDetails: { paymentMethod: 'RAZORPAY', transactionId: 'pay_mock_003', paymentId: 'pay_id_003', status: 'COMPLETED' },
    totalMrpPrice: 27999, totalSellingPrice: 22999, discount: 5000,
    orderStatus: OrderStatus.PENDING, totalItem: 1,
    deliverDate: new Date(now.getTime() + 5 * dayMs).toISOString(),
  },
  {
    id: 4, orderId: 'ORD-20240825-JKL012',
    user: demoCustomer, sellerId: 1,
    orderItems: [
      { id: 5, order: {} as Order, product: demoProducts[5], size: '32', quantity: 1, mrpPrice: 2999, sellingPrice: 1799, userId: 1 },
      { id: 6, order: {} as Order, product: demoProducts[1], size: 'XL', quantity: 2, mrpPrice: 999, sellingPrice: 549, userId: 1 },
    ],
    orderDate: new Date(now.getTime() - 3 * dayMs).toISOString(),
    shippingAddress: demoAddresses[0],
    paymentDetails: { paymentMethod: 'RAZORPAY', transactionId: 'pay_mock_004', paymentId: 'pay_id_004', status: 'COMPLETED' },
    totalMrpPrice: 4997, totalSellingPrice: 2897, discount: 2100,
    orderStatus: OrderStatus.PENDING, totalItem: 3,
    deliverDate: new Date(now.getTime() + 7 * dayMs).toISOString(),
  },
  {
    id: 5, orderId: 'ORD-20240830-MNO345',
    user: demoCustomer, sellerId: 1,
    orderItems: [
      { id: 7, order: {} as Order, product: demoProducts[11], size: 'M', quantity: 1, mrpPrice: 1499, sellingPrice: 799, userId: 1 },
    ],
    orderDate: new Date(now.getTime() - 20 * dayMs).toISOString(),
    shippingAddress: demoAddresses[0],
    paymentDetails: { paymentMethod: 'RAZORPAY', transactionId: 'pay_mock_005', paymentId: 'pay_id_005', status: 'COMPLETED' },
    totalMrpPrice: 1499, totalSellingPrice: 799, discount: 700,
    orderStatus: OrderStatus.CANCELLED, totalItem: 1,
    deliverDate: '',
  },
];

// ─── Demo Transactions ──────────────────────────────────────

export const demoTransactions: Transaction[] = demoOrders
  .filter(o => o.orderStatus !== OrderStatus.CANCELLED)
  .map((order, idx) => ({
    id: idx + 1,
    customer: demoCustomer,
    order,
    seller: demoSellers[order.sellerId - 1],
    date: order.orderDate,
  }));

// ─── Demo Payouts ───────────────────────────────────────────

export const demoPayouts: Payouts[] = [
  {
    id: 1,
    transactions: demoTransactions.filter(t => t.seller.id === 1),
    seller: demoSellers[0],
    amount: 12495,
    status: 'SUCCESS',
    date: new Date(now.getTime() - 7 * dayMs).toISOString(),
  },
  {
    id: 2,
    transactions: [],
    seller: demoSellers[0],
    amount: 5999,
    status: 'PENDING',
    date: new Date(now.getTime() - 2 * dayMs).toISOString(),
  },
];
