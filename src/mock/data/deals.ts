// src/mock/data/deals.ts
import { Deal } from '../../types/dealTypes';

export const demoDeals: Deal[] = [
  {
    id: 1,
    discount: 25,
    category: {
      id: 1,
      categoryId: 'gaming_laptops',
      section: 'ELECTRIC_CATEGORIES',
      name: 'Gaming Laptops',
      image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/computer/x/9/j/-original-imahyjzh7m2zsqdg.jpeg?q=70',
    },
  },
  {
    id: 2,
    discount: 40,
    category: {
      id: 2,
      categoryId: 'smart_watches',
      section: 'ELECTRIC_CATEGORIES',
      name: 'Smartwatches',
      image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/f/g/g/-original-imagywnz46fngcks.jpeg?q=70',
    },
  },
  {
    id: 3,
    discount: 50,
    category: {
      id: 3,
      categoryId: 'men_formal_shoes',
      section: 'GRID',
      name: 'Men Formal Shoes',
      image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/7/z/r/8-mrj2154-8-aadi-black-original-imagvgaqg8zgzmcy.jpeg?q=70',
    },
  },
  {
    id: 4,
    discount: 30,
    category: {
      id: 4,
      categoryId: 'headphones_headsets',
      section: 'ELECTRIC_CATEGORIES',
      name: 'Headphones',
      image: 'https://rukminim2.flixcart.com/image/612/612/kz4gh3k0/headphone/c/v/r/-original-imagb7bmhdgghzxq.jpeg?q=70',
    },
  },
  {
    id: 5,
    discount: 35,
    category: {
      id: 5,
      categoryId: 'women_lehenga_cholis',
      section: 'GRID',
      name: 'Women Lehenga Cholis',
      image: 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/23807268/2023/6/29/9930b235-5318-4755-abbe-08f99e969e781688026636544LehengaCholi7.jpg',
    },
  },
];
