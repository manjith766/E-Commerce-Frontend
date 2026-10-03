// src/services/api/ApiAdminService.ts
import { IAdminService } from '../interfaces/IAdminService';
import { Coupon } from '../../types/couponTypes';
import { Deal } from '../../types/dealTypes';
import { HomeCategory, HomeData } from '../../types/homeDataTypes';
import { api } from '../../Config/Api';

const COUPON_URL = '/api/coupons';
const ADMIN_URL = '/admin';

export class ApiAdminService implements IAdminService {
  async createCoupon(jwt: string, coupon: any): Promise<Coupon> {
    const response = await api.post<Coupon>(`${COUPON_URL}/admin/create`, coupon, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async deleteCoupon(jwt: string, id: number): Promise<any> {
    const response = await api.delete(`${COUPON_URL}/admin/delete/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async fetchAllCoupons(jwt: string): Promise<Coupon[]> {
    const response = await api.get<Coupon[]>(`${COUPON_URL}/admin/all`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }

  async createDeal(deal: any): Promise<Deal> {
    const response = await api.post<Deal>(`${ADMIN_URL}/deals`, deal, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    return response.data;
  }

  async fetchAllDeals(): Promise<Deal[]> {
    const response = await api.get<Deal[]>(`${ADMIN_URL}/deals`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    return response.data;
  }

  async deleteDeal(id: number): Promise<any> {
    const response = await api.delete(`${ADMIN_URL}/deals/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    return response.data;
  }

  async updateDeal(id: number, deal: any): Promise<Deal> {
    const response = await api.patch<Deal>(`${ADMIN_URL}/deals/${id}`, deal, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    return response.data;
  }

  async updateHomeCategory(id: number, data: any): Promise<any> {
    const response = await api.patch<HomeCategory>(`${ADMIN_URL}/home-category/${id}`, data);
    return response.data;
  }

  async fetchHomeCategories(): Promise<HomeCategory[]> {
    const response = await api.get<HomeCategory[]>(`${ADMIN_URL}/home-category`);
    return response.data;
  }

  async createHomeCategories(categories: HomeCategory[]): Promise<HomeCategory[]> {
    const response = await api.post('/home/categories', categories);
    return response.data;
  }

  async fetchHomePageData(): Promise<HomeData> {
    const response = await api.get<HomeData>('/home-page');
    return response.data;
  }
}
