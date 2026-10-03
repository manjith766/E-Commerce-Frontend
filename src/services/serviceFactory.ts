// src/services/serviceFactory.ts
import { IS_MOCK_MODE } from '../Config/environment';
import { IAuthService } from './interfaces/IAuthService';
import { IProductService } from './interfaces/IProductService';
import { ICartService } from './interfaces/ICartService';
import { IOrderService } from './interfaces/IOrderService';
import { IReviewService } from './interfaces/IReviewService';
import { IWishlistService } from './interfaces/IWishlistService';
import { ISellerService } from './interfaces/ISellerService';
import { IAdminService } from './interfaces/IAdminService';
import { IAiChatBotService } from './interfaces/IAiChatBotService';

// Mock implementations
import { MockAuthService } from './mock/MockAuthService';
import { MockProductService } from './mock/MockProductService';
import { MockCartService } from './mock/MockCartService';
import { MockOrderService } from './mock/MockOrderService';
import { MockReviewService } from './mock/MockReviewService';
import { MockWishlistService } from './mock/MockWishlistService';
import { MockSellerService } from './mock/MockSellerService';
import { MockAdminService } from './mock/MockAdminService';
import { MockAiChatBotService } from './mock/MockAiChatBotService';

// API implementations
import { ApiAuthService } from './api/ApiAuthService';
import { ApiProductService } from './api/ApiProductService';
import { ApiCartService } from './api/ApiCartService';
import { ApiOrderService } from './api/ApiOrderService';
import { ApiReviewService } from './api/ApiReviewService';
import { ApiWishlistService } from './api/ApiWishlistService';
import { ApiSellerService } from './api/ApiSellerService';
import { ApiAdminService } from './api/ApiAdminService';
import { ApiAiChatBotService } from './api/ApiAiChatBotService';

export const authService: IAuthService = IS_MOCK_MODE ? new MockAuthService() : new ApiAuthService();
export const productService: IProductService = IS_MOCK_MODE ? new MockProductService() : new ApiProductService();
export const cartService: ICartService = IS_MOCK_MODE ? new MockCartService() : new ApiCartService();
export const orderService: IOrderService = IS_MOCK_MODE ? new MockOrderService() : new ApiOrderService();
export const reviewService: IReviewService = IS_MOCK_MODE ? new MockReviewService() : new ApiReviewService();
export const wishlistService: IWishlistService = IS_MOCK_MODE ? new MockWishlistService() : new ApiWishlistService();
export const sellerService: ISellerService = IS_MOCK_MODE ? new MockSellerService() : new ApiSellerService();
export const adminService: IAdminService = IS_MOCK_MODE ? new MockAdminService() : new ApiAdminService();
export const aiChatBotService: IAiChatBotService = IS_MOCK_MODE ? new MockAiChatBotService() : new ApiAiChatBotService();
