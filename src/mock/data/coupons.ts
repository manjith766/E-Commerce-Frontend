// src/mock/data/coupons.ts
import { Coupon } from '../../types/couponTypes';

export const demoCoupons: Coupon[] = [
  {
    id: 1,
    code: 'WELCOME10',
    discountPercentage: 10,
    validityStartDate: '2026-01-01T00:00:00Z',
    validityEndDate: '2026-12-31T23:59:59Z',
    minimumOrderValue: 500,
    active: true,
  },
  {
    id: 2,
    code: 'FESTIVE20',
    discountPercentage: 20,
    validityStartDate: '2026-01-01T00:00:00Z',
    validityEndDate: '2026-12-31T23:59:59Z',
    minimumOrderValue: 1000,
    active: true,
  },
  {
    id: 3,
    code: 'MEGA30',
    discountPercentage: 30,
    validityStartDate: '2026-01-01T00:00:00Z',
    validityEndDate: '2026-12-31T23:59:59Z',
    minimumOrderValue: 2000,
    active: true,
  },
  {
    id: 4,
    code: 'FLAT15',
    discountPercentage: 15,
    validityStartDate: '2026-01-01T00:00:00Z',
    validityEndDate: '2026-12-31T23:59:59Z',
    minimumOrderValue: 750,
    active: true,
  },
  {
    id: 5,
    code: 'EXPIRED50',
    discountPercentage: 50,
    validityStartDate: '2025-01-01T00:00:00Z',
    validityEndDate: '2025-12-31T23:59:59Z',
    minimumOrderValue: 500,
    active: false,
  },
];
