// src/services/mock/MockAuthService.ts
import { IAuthService } from '../interfaces/IAuthService';
import { ApiResponse, AuthResponse, LoginRequest, SignupRequest, ResetPasswordRequest } from '../../types/authTypes';
import { User, UserRole } from '../../types/userTypes';
import { mockStorage } from '../../mock/persistence/mockStorage';
import { DEMO_CREDENTIALS, demoCustomer, demoSellerUser, demoAdminUser } from '../../mock/data/users';
import { generateId, generateMockJwt } from '../../mock/utils/idGenerator';

export class MockAuthService implements IAuthService {
  async sendLoginSignupOtp(email: string): Promise<ApiResponse> {
    await new Promise((r) => setTimeout(r, 400));
    console.log(`[MockAuth] OTP sent to ${email}: 123456`);
    return {
      message: 'OTP sent successfully. Demo OTP is 123456',
      status: true,
    };
  }

  async signin(req: LoginRequest): Promise<AuthResponse> {
    await new Promise((r) => setTimeout(r, 400));
    const emailLower = req.email.toLowerCase().trim();
    const creds = DEMO_CREDENTIALS[emailLower];

    if (!creds && req.otp !== '123456') {
      throw new Error('Invalid email or OTP (Demo OTP is 123456)');
    }

    const role = creds ? creds.role : 'ROLE_CUSTOMER';
    const jwt = generateMockJwt(role);
    localStorage.setItem('jwt', jwt);

    return {
      jwt,
      message: 'Login successful (Mock Mode)',
      role,
    };
  }

  async signup(req: SignupRequest): Promise<AuthResponse> {
    await new Promise((r) => setTimeout(r, 400));
    const emailLower = req.email.toLowerCase().trim();
    const newUser: User = {
      id: generateId(),
      email: emailLower,
      fullName: req.fullName || 'New User',
      mobile: '9876543210',
      role: UserRole.ROLE_CUSTOMER,
      addresses: [],
    };

    mockStorage.setItem(`user_${emailLower}`, newUser);
    const jwt = generateMockJwt('ROLE_CUSTOMER');
    localStorage.setItem('jwt', jwt);

    return {
      jwt,
      message: 'Signup successful (Mock Mode)',
      role: 'ROLE_CUSTOMER',
    };
  }

  async fetchUserProfile(jwt: string): Promise<User> {
    await new Promise((r) => setTimeout(r, 300));
    if (jwt.includes('ROLE_ADMIN') || jwt.includes('admin')) {
      return demoAdminUser;
    }
    if (jwt.includes('ROLE_SELLER') || jwt.includes('seller')) {
      return demoSellerUser;
    }
    const stored = mockStorage.getItem<User>('current_customer', demoCustomer);
    return stored;
  }

  async resetPasswordRequest(email: string): Promise<ApiResponse> {
    await new Promise((r) => setTimeout(r, 300));
    return {
      message: 'Password reset link sent to ' + email,
      status: true,
    };
  }

  async resetPassword(req: ResetPasswordRequest): Promise<ApiResponse> {
    await new Promise((r) => setTimeout(r, 300));
    return {
      message: 'Password updated successfully',
      status: true,
    };
  }
}
