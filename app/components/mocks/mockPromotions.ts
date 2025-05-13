import product1 from '../res/product/product1.avif';
import product2 from '../res/product/product2.avif';
import product3 from '../res/product/product3.avif';

export type MockPromotionType = 'buy2for150' | 'freeGift' | 'redemption';

export interface MockPromotionProduct {
  id: string;
  image: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  volume?: string;
}

export interface MockPromotion {
  id: MockPromotionType;
  title: string;
  description: string;
  products: MockPromotionProduct[];
}

export const mockPromotions: MockPromotion[] = [
  {
    id: 'buy2for150',
    title: 'BUY 2 FOR 150',
    description: 'Buy any 2 selected products for $150!',
    products: [
      { id: 'p1', image: product1, name: 'Premium Lager', brand: 'Brand A', price: 80, oldPrice: 99, volume: '330ml x 6' },
      { id: 'p2', image: product2, name: 'Classic Ale', brand: 'Brand B', price: 85, oldPrice: 105, volume: '500ml x 4' },
    ]
  },
  {
    id: 'freeGift',
    title: 'BUY $200 FOR FREE GIFT',
    description: 'Spend $200 on selected items and get a free gift!',
    products: [
      { id: 'p3', image: product3, name: 'Organic Cider', brand: 'Brand C', price: 120, volume: '750ml' },
      { id: 'p1', image: product1, name: 'Premium Lager', brand: 'Brand A', price: 80, oldPrice: 99, volume: '330ml x 6' },
    ]
  },
  {
    id: 'redemption',
    title: '$12 REDEMPTION',
    description: 'Redeem this special product for just $12!',
    products: [
      { id: 'p2', image: product2, name: 'Classic Ale', brand: 'Brand B', price: 12, volume: '500ml x 4' },
    ]
  }
];
