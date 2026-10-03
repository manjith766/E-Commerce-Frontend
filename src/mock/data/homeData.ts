// src/mock/data/homeData.ts
import { HomeData, HomeCategory } from '../../types/homeDataTypes';
import { homeCategories } from '../../data/homeCategories';
import { demoDeals } from './deals';

const gridCategories: HomeCategory[] = homeCategories
  .filter((c) => c.section === 'GRID')
  .map((c, i) => ({ ...c, id: i + 1 }));

const shopByCategories: HomeCategory[] = homeCategories
  .filter((c) => c.section === 'SHOP_BY_CATEGORIES')
  .map((c, i) => ({ ...c, id: i + 100 }));

const electricCategories: HomeCategory[] = homeCategories
  .filter((c) => c.section === 'ELECTRIC_CATEGORIES')
  .map((c, i) => ({ ...c, id: i + 200 }));

const dealCategories: HomeCategory[] = demoDeals.map((d) => d.category);

export const demoHomeData: HomeData = {
  id: 1,
  grid: gridCategories,
  shopByCategories: shopByCategories,
  electricCategories: electricCategories,
  deals: demoDeals,
  dealCategories: dealCategories,
};
