// src/services/mock/MockReviewService.ts
import { IReviewService } from '../interfaces/IReviewService';
import { Review, CreateReviewRequest, ApiResponse } from '../../types/reviewTypes';
import { demoReviews } from '../../mock/data/reviews';
import { demoProducts } from '../../mock/data/products';
import { demoCustomer } from '../../mock/data/users';
import { mockStorage } from '../../mock/persistence/mockStorage';
import { generateId } from '../../mock/utils/idGenerator';

export class MockReviewService implements IReviewService {
  private getReviews(): Review[] {
    return mockStorage.getItem<Review[]>('reviews', demoReviews);
  }

  private saveReviews(reviews: Review[]): void {
    mockStorage.setItem('reviews', reviews);
  }

  async fetchProductReviews(productId: number): Promise<Review[]> {
    await new Promise((r) => setTimeout(r, 200));
    const reviews = this.getReviews();
    return reviews.filter((r) => r.product?.id === Number(productId));
  }

  async createReview(jwt: string, productId: number, req: CreateReviewRequest): Promise<Review> {
    await new Promise((r) => setTimeout(r, 300));
    const reviews = this.getReviews();
    const product = demoProducts.find((p) => p.id === Number(productId)) || demoProducts[0];

    const newReview: Review = {
      id: generateId(),
      reviewText: req.reviewText,
      rating: req.reviewRating,
      user: demoCustomer,
      product: product,
      productImages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    reviews.push(newReview);
    this.saveReviews(reviews);
    return newReview;
  }

  async updateReview(jwt: string, reviewId: number, req: CreateReviewRequest): Promise<Review> {
    await new Promise((r) => setTimeout(r, 250));
    const reviews = this.getReviews();
    const index = reviews.findIndex((r) => r.id === Number(reviewId));
    if (index === -1) {
      throw new Error(`Review with ID ${reviewId} not found`);
    }

    reviews[index].reviewText = req.reviewText;
    reviews[index].rating = req.reviewRating;
    reviews[index].updatedAt = new Date().toISOString();

    this.saveReviews(reviews);
    return reviews[index];
  }

  async deleteReview(jwt: string, reviewId: number): Promise<ApiResponse> {
    await new Promise((r) => setTimeout(r, 200));
    const reviews = this.getReviews();
    const filtered = reviews.filter((r) => r.id !== Number(reviewId));
    this.saveReviews(filtered);
    return {
      message: 'Review deleted successfully',
      status: true,
    };
  }
}
