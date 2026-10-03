// src/services/api/ApiAuthService.ts
import { IAuthService } from '../interfaces/IAuthService';
import { ApiResponse, AuthResponse, LoginRequest, SignupRequest, ResetPasswordRequest } from '../../types/authTypes';
import { User } from '../../types/userTypes';
import { api } from '../../Config/Api';

export class ApiAuthService implements IAuthService {
  async sendLoginSignupOtp(email: string): Promise<ApiResponse> {
    const response = await api.post<ApiResponse>('/auth/sent/login-signup-otp', { email });
    return response.data;
  }

  async signin(req: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signin', req);
    if (response.data.jwt) {
      localStorage.setItem('jwt', response.data.jwt);
    }
    return response.data;
  }

  async signup(req: SignupRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signup', req);
    if (response.data.jwt) {
      localStorage.setItem('jwt', response.data.jwt);
    }
    return response.data;
  }

  async fetchUserProfile(jwt: string): Promise<User> {
    const response = await api.get<User>('/api/users/profile', {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async resetPasswordRequest(email: string): Promise<ApiResponse> {
    const response = await api.post<ApiResponse>('/auth/reset-password-request', { email });
    return response.data;
  }

  async resetPassword(req: ResetPasswordRequest): Promise<ApiResponse> {
    const response = await api.post<ApiResponse>('/auth/reset-password', req);
    return response.data;
  }
}
