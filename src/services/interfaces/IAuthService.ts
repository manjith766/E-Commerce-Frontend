// src/services/interfaces/IAuthService.ts
import { ApiResponse, AuthResponse, LoginRequest, SignupRequest, ResetPasswordRequest } from '../../types/authTypes';
import { User } from '../../types/userTypes';

export interface IAuthService {
  sendLoginSignupOtp(email: string): Promise<ApiResponse>;
  signin(req: LoginRequest): Promise<AuthResponse>;
  signup(req: SignupRequest): Promise<AuthResponse>;
  fetchUserProfile(jwt: string): Promise<User>;
  resetPasswordRequest(email: string): Promise<ApiResponse>;
  resetPassword(req: ResetPasswordRequest): Promise<ApiResponse>;
}
