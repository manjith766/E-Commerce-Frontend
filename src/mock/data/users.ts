// src/mock/data/users.ts
// Demo users for customer, seller, and admin roles.

import { User, UserRole, Address } from '../../types/userTypes';
import { Seller, SellerReport } from '../../types/sellerTypes';

// ─── Demo Addresses ─────────────────────────────────────────

export const demoAddresses: Address[] = [
  {
    id: 1,
    name: 'John Smith',
    mobile: '9876543210',
    pinCode: '560001',
    address: '123 MG Road, Brigade Gateway',
    locality: 'Malleswaram',
    city: 'Bangalore',
    state: 'Karnataka',
  },
  {
    id: 2,
    name: 'John Smith',
    mobile: '9876543210',
    pinCode: '400001',
    address: '456 Marine Drive, Tower A',
    locality: 'Colaba',
    city: 'Mumbai',
    state: 'Maharashtra',
  },
];

// ─── Demo Customer ──────────────────────────────────────────

export const demoCustomer: User = {
  id: 1,
  email: 'customer@demo.com',
  fullName: 'John Smith',
  mobile: '9876543210',
  role: UserRole.ROLE_CUSTOMER,
  addresses: demoAddresses,
};

// ─── Demo Seller User ───────────────────────────────────────

export const demoSellerUser: User = {
  id: 2,
  email: 'seller@demo.com',
  fullName: 'Rajesh Kumar',
  mobile: '9876543211',
  role: UserRole.ROLE_SELLER,
  addresses: [],
};

// ─── Demo Admin User ────────────────────────────────────────

export const demoAdminUser: User = {
  id: 3,
  email: 'admin@demo.com',
  fullName: 'Admin User',
  mobile: '9876543212',
  role: UserRole.ROLE_ADMIN,
  addresses: [],
};

// ─── Demo Sellers (Seller entity) ───────────────────────────

export const demoSellers: Seller[] = [
  {
    id: 1,
    mobile: '9876543211',
    otp: '',
    gstin: '29ABCDE1234F1Z5',
    pickupAddress: {
      name: 'Rajesh Kumar',
      mobile: '9876543211',
      pincode: '560002',
      address: '789 Silk Board, Koramangala',
      locality: 'HSR Layout',
      city: 'Bangalore',
      state: 'Karnataka',
    },
    bankDetails: {
      accountNumber: '1234567890',
      ifscCode: 'SBIN0001234',
      accountHolderName: 'Rajesh Kumar',
    },
    sellerName: 'Rajesh Fashion Store',
    email: 'seller@demo.com',
    businessDetails: { businessName: 'Rajesh Fashion Pvt Ltd' },
    password: '',
    accountStatus: 'ACTIVE',
  },
  {
    id: 2,
    mobile: '9876543213',
    otp: '',
    gstin: '29FGHIJ5678K2Z6',
    pickupAddress: {
      name: 'Priya Sharma',
      mobile: '9876543213',
      pincode: '110001',
      address: '321 Connaught Place',
      locality: 'Central Delhi',
      city: 'Delhi',
      state: 'Delhi',
    },
    bankDetails: {
      accountNumber: '9876543210',
      ifscCode: 'HDFC0002345',
      accountHolderName: 'Priya Sharma',
    },
    sellerName: 'Priya Electronics Hub',
    email: 'priya.seller@demo.com',
    businessDetails: { businessName: 'Priya Electronics LLP' },
    password: '',
    accountStatus: 'ACTIVE',
  },
  {
    id: 3,
    mobile: '9876543214',
    otp: '',
    gstin: '29KLMNO9012P3Z7',
    pickupAddress: {
      name: 'Amit Patel',
      mobile: '9876543214',
      pincode: '380001',
      address: '55 CG Road',
      locality: 'Navrangpura',
      city: 'Ahmedabad',
      state: 'Gujarat',
    },
    bankDetails: {
      accountNumber: '5555666677',
      ifscCode: 'ICIC0003456',
      accountHolderName: 'Amit Patel',
    },
    sellerName: 'Amit Home Decor',
    email: 'amit.seller@demo.com',
    businessDetails: { businessName: 'Amit Decor Enterprises' },
    password: '',
    accountStatus: 'PENDING_VERIFICATION',
  },
];

export const demoSellerReport: SellerReport = {
  id: 1,
  seller: demoSellers[0],
  totalEarnings: 245000,
  totalSales: 189000,
  totalRefunds: 12000,
  totalTax: 34000,
  netEarnings: 199000,
  totalOrders: 156,
  canceledOrders: 8,
  totalTransactions: 148,
};

// ─── Credential map (for mock auth) ────────────────────────

export const DEMO_CREDENTIALS: Record<string, { role: string; user: User }> = {
  'customer@demo.com': { role: 'ROLE_CUSTOMER', user: demoCustomer },
  'seller@demo.com': { role: 'ROLE_SELLER', user: demoSellerUser },
  'admin@demo.com': { role: 'ROLE_ADMIN', user: demoAdminUser },
};

export const DEMO_OTP = '123456';
