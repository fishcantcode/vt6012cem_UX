// Central product model for all components
export interface Product {
  image: string;
  brand: string;
  productName: string;
  price: number;
  oldPrice?: number;
  tags?: string[];
  volume: string;
  origin?: string;
  quality?: string;
  storage?: string;
  promotion?: string;
  promoDetail?: string;
  description?: string;
  favorite?: boolean;
}
