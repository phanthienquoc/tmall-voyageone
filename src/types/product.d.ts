export interface IProduct {
  createdTime: number;
  productId: string;
  code: string;
  mfCode: string | null;
  model: string;
  title: string;
  shortTitle: string;
  industry: string;
  brand: string;
  category: string;
  tkofCategoryId: string;
  clientProductURL: string;
  color: string;
  description: string;
  shortDescription: string;
  material: string;
  origin: string;
  productImages: string[];
  packageImages: string[];
  productType: string;
  sizeChartType: string;
  sizeChartImage: string | null;
  sizeType: string;
  usage: string | null;
  saleType: string;
  publishSeason: string | null;
  attributes: string[] | null;
  customAttributes: CustomAttribute[];
  optAttributes: Record<string, string>[]; // assuming key-value objects
  filingAttributes: Record<string, string>[]; // assuming key-value objects
  items: ProductItem[];
  // Additional fields for display
  name?: string;
  price?: number;
  salePrice?: number;
  stock?: number;
  rating?: number;
}

export interface CustomAttribute {
  itemForeignName?: string;
  foreignIngredient?: string;
  [key: string]: string | undefined;
}

export interface ProductItem {
  sku: string;
  size: string;
  barcode: string;
  weight: number;
  priceRetail: number;
  qty: number;
  alive: boolean;
}

export interface Product {
  items: ProductItem[];
  title: string;
  description: string;
  productImages?: string[];
}

export interface ProductDetail extends Product {
  items: ProductItem[];
  customAttributes: CustomAttribute[];
}
export interface ProductListResponse {
  total: number;
  page: number;
  pageSize: number;
  products: Product[];
}
