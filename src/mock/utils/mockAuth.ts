// src/mock/utils/mockAuth.ts
import { User } from '../../types/userTypes';
import { DEMO_CREDENTIALS, DEMO_OTP, demoCustomer, demoSellerUser, demoAdminUser } from '../data/users';

export function getMockUserByToken(token: string | null): User | null {
  if (!token) return null;
  if (token.includes('ROLE_ADMIN') || token.includes('admin')) {
    return demoAdminUser;
  }
  if (token.includes('ROLE_SELLER') || token.includes('seller')) {
    return demoSellerUser;
  }
  return demoCustomer;
}

export function validateMockOtp(otp: string): boolean {
  return otp === DEMO_OTP || otp === '123456';
}

export function getMockUserByEmail(email: string): { role: string; user: User } | null {
  return DEMO_CREDENTIALS[email.toLowerCase().trim()] || null;
}
