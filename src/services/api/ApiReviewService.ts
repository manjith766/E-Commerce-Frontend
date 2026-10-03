// src/services/api/ApiReviewService.ts
import { IReviewService } from '../interfaces/IReviewService';
import { Review, CreateReviewRequest, ApiResponse } from '../../types/reviewTypes';
import { api } from '../../Config/Api';

export class ApiReviewService implements IReviewService {
  async fetchProductReviews(productId: number): Promise<Review[]> {
    const response = await api.get<Review[]>(`/api/products/${productId}/reviews`);
    return response.data;
  }

  async createReview(jwt: string, productId: number, req: CreateReviewRequest): Promise<Review> {
    const response = await api.post<Review>(`/api/products/${productId}/reviews`, req, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async updateReview(jwt: string, reviewId: number, req: CreateReviewRequest): Promise<Review> {
    const response = await api.patch<Review>(`/api/reviews/${reviewId}`, req, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async deleteReview(jwt: string, reviewId: number): Promise<ApiResponse> {
    const response = await api.delete<ApiResponse>(`/api/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }
}
