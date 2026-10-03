// src/mock/data/reviews.ts
import { Review } from '../../types/reviewTypes';
import { demoCustomer } from './users';
import { demoProducts } from './products';

export const demoReviews: Review[] = [
  {
    id: 1,
    reviewText: 'Outstanding quality and fit! Exceeded my expectations. The fabric feels premium.',
    rating: 5,
    user: demoCustomer,
    product: demoProducts[0],
    productImages: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500',
    ],
    createdAt: '2026-02-15T10:30:00Z',
    updatedAt: '2026-02-15T10:30:00Z',
  },
  {
    id: 2,
    reviewText: 'Great product for the price. Fast shipping and neatly packaged.',
    rating: 4,
    user: demoCustomer,
    product: demoProducts[1],
    productImages: [],
    createdAt: '2026-02-18T14:20:00Z',
    updatedAt: '2026-02-18T14:20:00Z',
  },
  {
    id: 3,
    reviewText: 'Very comfortable and stylish. Got many compliments wearing this!',
    rating: 5,
    user: demoCustomer,
    product: demoProducts[2],
    productImages: [],
    createdAt: '2026-02-20T09:15:00Z',
    updatedAt: '2026-02-20T09:15:00Z',
  },
  {
    id: 4,
    reviewText: 'Good sound quality and battery life. Noise cancellation works well.',
    rating: 4.5,
    user: demoCustomer,
    product: demoProducts[6] || demoProducts[0],
    productImages: [],
    createdAt: '2026-02-22T16:45:00Z',
    updatedAt: '2026-02-22T16:45:00Z',
  },
];
