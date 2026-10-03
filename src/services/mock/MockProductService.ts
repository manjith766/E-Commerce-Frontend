// src/services/mock/MockProductService.ts
import { IProductService, GetAllProductsParams } from '../interfaces/IProductService';
import { Product } from '../../types/productTypes';
import { demoProducts } from '../../mock/data/products';
import { mockStorage } from '../../mock/persistence/mockStorage';
import { demoSellers } from '../../mock/data/users';

export class MockProductService implements IProductService {
  private getProducts(): Product[] {
    return mockStorage.getItem<Product[]>('products', demoProducts);
  }

  async getProductById(productId: number): Promise<Product> {
    await new Promise((r) => setTimeout(r, 150));
    const products = this.getProducts();
    const product = products.find((p) => p.id === Number(productId));
    if (!product) {
      // If not in static list, synthesize a fallback product with that ID
      return {
        id: Number(productId),
        title: `Premium Collection Item #${productId}`,
        description: 'High quality handcrafted product featuring durable materials and modern design.',
        mrpPrice: 2999,
        sellingPrice: 1499,
        discountPercent: 50,
        quantity: 30,
        color: 'Classic Black',
        images: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
        ],
        numRatings: 4,
        sizes: 'S,M,L,XL',
        in_stock: true,
        seller: demoSellers[0],
        createdAt: new Date()
      };
    }
    return product;
  }

  async searchProducts(query: string): Promise<Product[]> {
    await new Promise((r) => setTimeout(r, 200));
    const products = this.getProducts();
    if (!query || query.trim() === '') {
      return products.slice(0, 30);
    }
    const q = query.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.color?.toLowerCase().includes(q) ||
        p.category?.name?.toLowerCase().includes(q) ||
        p.category?.categoryId?.toLowerCase().includes(q) ||
        p.category?.parentCategory?.name?.toLowerCase().includes(q) ||
        p.category?.parentCategory?.categoryId?.toLowerCase().includes(q)
    );
  }

  async getAllProducts(params: GetAllProductsParams): Promise<any> {
    await new Promise((r) => setTimeout(r, 200));
    let items = [...this.getProducts()];

    // Filter by category
    if (params.category) {
      const rawCat = params.category.toLowerCase().trim();
      const targetCats: string[] = [rawCat];
      if (rawCat === 'furniture' || rawCat === 'home_furniture') {
        if (!targetCats.includes('furniture')) targetCats.push('furniture');
        if (!targetCats.includes('home_furniture')) targetCats.push('home_furniture');
      }

      const matchCategory = (p: Product) => {
        const c1 = p.category?.categoryId?.toLowerCase();
        const n1 = p.category?.name?.toLowerCase();
        const c2 = p.category?.parentCategory?.categoryId?.toLowerCase();
        const n2 = p.category?.parentCategory?.name?.toLowerCase();
        const c3 = p.category?.parentCategory?.parentCategory?.categoryId?.toLowerCase();
        const n3 = p.category?.parentCategory?.parentCategory?.name?.toLowerCase();

        for (let i = 0; i < targetCats.length; i++) {
          const target = targetCats[i];
          if (c1 === target || n1 === target) return true;
          if (c2 === target || n2 === target) return true;
          if (c3 === target || n3 === target) return true;
          if (c1 && c1.includes(target)) return true;
          if (c2 && c2.includes(target)) return true;
        }
        return false;
      };

      items = items.filter(matchCategory);

      // Guarantee at least 10 products for any queried category
      if (items.length < 10) {
        const catLabel = params.category.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        const needed = 10 - items.length;
        const baseId = 90000 + Math.abs(params.category.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) * 10);
        
        const fallbackImages = [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
        ];

        for (let i = 0; i < needed; i++) {
          const mrp = 1999 + i * 500;
          const disc = 30 + (i % 4) * 10;
          const selling = Math.round((mrp * (1 - disc / 100)) / 10) * 10 - 1;
          items.push({
            id: baseId + i,
            title: `Premium ${catLabel} - Edition #${i + 1}`,
            description: `Exclusive high quality ${catLabel} crafted with superior materials and stylish modern aesthetics.`,
            mrpPrice: mrp,
            sellingPrice: selling,
            discountPercent: Math.round(((mrp - selling) / mrp) * 100),
            quantity: 25 + i * 5,
            color: ['Navy Blue', 'Classic Black', 'Pure White', 'Charcoal', 'Slate Grey'][i % 5],
            images: [
              fallbackImages[i % fallbackImages.length],
              fallbackImages[(i + 1) % fallbackImages.length]
            ],
            numRatings: 3 + (i % 3),
            category: {
              id: 9999,
              name: catLabel,
              categoryId: params.category,
              level: 3
            },
            sizes: 'S,M,L,XL',
            in_stock: true,
            seller: demoSellers[i % demoSellers.length],
            createdAt: new Date()
          });
        }
      }
    }

    // Filter by color
    if (params.color) {
      const color = params.color.toLowerCase();
      items = items.filter((p) => p.color?.toLowerCase().includes(color));
    }

    // Filter by size
    if (params.size) {
      const size = params.size.toUpperCase();
      items = items.filter((p) => p.sizes?.toUpperCase().includes(size));
    }

    // Filter by price range
    if (params.minPrice !== undefined && params.minPrice !== null) {
      items = items.filter((p) => p.sellingPrice >= Number(params.minPrice));
    }
    if (params.maxPrice !== undefined && params.maxPrice !== null) {
      items = items.filter((p) => p.sellingPrice <= Number(params.maxPrice));
    }

    // Filter by discount
    if (params.minDiscount !== undefined && params.minDiscount !== null) {
      items = items.filter((p) => (p.discountPercent || 0) >= Number(params.minDiscount));
    }

    // Sort
    if (params.sort === 'price_low') {
      items.sort((a, b) => a.sellingPrice - b.sellingPrice);
    } else if (params.sort === 'price_high') {
      items.sort((a, b) => b.sellingPrice - a.sellingPrice);
    }

    const pageSize = 12;
    const pageNumber = params.pageNumber || 0;
    const totalElements = items.length;
    const totalPages = Math.ceil(totalElements / pageSize) || 1;
    const startIndex = pageNumber * pageSize;
    const paginatedItems = items.slice(startIndex, startIndex + pageSize);

    return {
      content: paginatedItems,
      totalPages: totalPages,
      totalElements: totalElements,
      size: pageSize,
      number: pageNumber,
    };
  }
}

