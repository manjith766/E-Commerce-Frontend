// src/services/mock/MockAdminService.ts
import { IAdminService } from '../interfaces/IAdminService';
import { Coupon } from '../../types/couponTypes';
import { Deal } from '../../types/dealTypes';
import { HomeCategory, HomeData } from '../../types/homeDataTypes';
import { demoCoupons } from '../../mock/data/coupons';
import { demoDeals } from '../../mock/data/deals';
import { demoHomeData } from '../../mock/data/homeData';
import { homeCategories } from '../../data/homeCategories';
import { mockStorage } from '../../mock/persistence/mockStorage';
import { generateId } from '../../mock/utils/idGenerator';

export class MockAdminService implements IAdminService {
  // Coupons
  private getCoupons(): Coupon[] {
    return mockStorage.getItem<Coupon[]>('coupons', demoCoupons);
  }

  private saveCoupons(coupons: Coupon[]): void {
    mockStorage.setItem('coupons', coupons);
  }

  async createCoupon(jwt: string, coupon: any): Promise<Coupon> {
    await new Promise((r) => setTimeout(r, 300));
    const coupons = this.getCoupons();
    const newCoupon: Coupon = {
      ...coupon,
      id: generateId(),
      active: coupon.active !== undefined ? coupon.active : true,
    };
    coupons.push(newCoupon);
    this.saveCoupons(coupons);
    return newCoupon;
  }

  async deleteCoupon(jwt: string, id: number): Promise<any> {
    await new Promise((r) => setTimeout(r, 200));
    const coupons = this.getCoupons();
    const filtered = coupons.filter((c) => c.id !== Number(id));
    this.saveCoupons(filtered);
    return { message: 'Coupon deleted successfully', status: true };
  }

  async fetchAllCoupons(jwt: string): Promise<Coupon[]> {
    await new Promise((r) => setTimeout(r, 200));
    return this.getCoupons();
  }

  // Deals
  private getDeals(): Deal[] {
    return mockStorage.getItem<Deal[]>('deals', demoDeals);
  }

  private saveDeals(deals: Deal[]): void {
    mockStorage.setItem('deals', deals);
  }

  async createDeal(deal: any): Promise<Deal> {
    await new Promise((r) => setTimeout(r, 300));
    const deals = this.getDeals();
    const newDeal: Deal = {
      ...deal,
      id: generateId(),
    };
    deals.push(newDeal);
    this.saveDeals(deals);
    return newDeal;
  }

  async fetchAllDeals(): Promise<Deal[]> {
    await new Promise((r) => setTimeout(r, 200));
    return this.getDeals();
  }

  async deleteDeal(id: number): Promise<any> {
    await new Promise((r) => setTimeout(r, 200));
    const deals = this.getDeals();
    const filtered = deals.filter((d) => d.id !== Number(id));
    this.saveDeals(filtered);
    return { message: 'Deal deleted successfully', status: true };
  }

  async updateDeal(id: number, deal: any): Promise<Deal> {
    await new Promise((r) => setTimeout(r, 250));
    const deals = this.getDeals();
    const index = deals.findIndex((d) => d.id === Number(id));
    if (index === -1) {
      throw new Error(`Deal with ID ${id} not found`);
    }
    deals[index] = { ...deals[index], ...deal };
    this.saveDeals(deals);
    return deals[index];
  }

  // Home Categories & Home Data
  private getHomeCategories(): HomeCategory[] {
    return mockStorage.getItem<HomeCategory[]>('admin_home_categories', homeCategories as HomeCategory[]);
  }

  private saveHomeCategories(cats: HomeCategory[]): void {
    mockStorage.setItem('admin_home_categories', cats);
  }

  async updateHomeCategory(id: number, data: any): Promise<any> {
    await new Promise((r) => setTimeout(r, 250));
    const cats = this.getHomeCategories();
    const index = cats.findIndex((c) => c.id === Number(id));
    if (index !== -1) {
      cats[index] = { ...cats[index], ...data };
      this.saveHomeCategories(cats);
      return cats[index];
    }
    const updated = { ...data, id };
    cats.push(updated);
    this.saveHomeCategories(cats);
    return updated;
  }

  async fetchHomeCategories(): Promise<HomeCategory[]> {
    await new Promise((r) => setTimeout(r, 200));
    return this.getHomeCategories();
  }

  async createHomeCategories(categories: HomeCategory[]): Promise<HomeCategory[]> {
    await new Promise((r) => setTimeout(r, 300));
    this.saveHomeCategories(categories);
    return categories;
  }

  async fetchHomePageData(): Promise<HomeData> {
    await new Promise((r) => setTimeout(r, 200));
    const homeData = mockStorage.getItem<HomeData>('home_page_data', demoHomeData);
    return homeData;
  }
}
