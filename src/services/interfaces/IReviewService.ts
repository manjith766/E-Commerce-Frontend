// src/services/interfaces/IReviewService.ts
import { Review, CreateReviewRequest, ApiResponse } from '../../types/reviewTypes';

export interface IReviewService {
  fetchProductReviews(productId: number): Promise<Review[]>;
  createReview(jwt: string, productId: number, req: CreateReviewRequest): Promise<Review>;
  updateReview(jwt: string, reviewId: number, req: CreateReviewRequest): Promise<Review>;
  deleteReview(jwt: string, reviewId: number): Promise<ApiResponse>;
}
