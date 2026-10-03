// src/services/interfaces/IAdminService.ts
import { Coupon } from '../../types/couponTypes';
import { Deal } from '../../types/dealTypes';
import { HomeCategory, HomeData } from '../../types/homeDataTypes';

export interface IAdminService {
  // Coupons
  createCoupon(jwt: string, coupon: any): Promise<Coupon>;
  deleteCoupon(jwt: string, id: number): Promise<any>;
  fetchAllCoupons(jwt: string): Promise<Coupon[]>;

  // Deals
  createDeal(deal: any): Promise<Deal>;
  fetchAllDeals(): Promise<Deal[]>;
  deleteDeal(id: number): Promise<any>;
  updateDeal(id: number, deal: any): Promise<Deal>;

  // Home Categories & Home Data
  updateHomeCategory(id: number, data: any): Promise<any>;
  fetchHomeCategories(): Promise<HomeCategory[]>;
  createHomeCategories(categories: HomeCategory[]): Promise<HomeCategory[]>;
  fetchHomePageData(): Promise<HomeData>;
}
