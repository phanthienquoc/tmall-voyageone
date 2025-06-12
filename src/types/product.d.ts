export interface IProduct {
  createdTime: number
  productId: string
  code: string
  mfCode: string | null
  model: string
  title: string
  shortTitle: string
  industry: string
  brand: string
  category: string
  tkofCategoryId: string
  clientProductURL: string
  color: string
  description: string
  shortDescription: string
  material: string
  origin: string
  productImages: string[]
  packageImages: string[]
  productType: string
  sizeChartType: string
  sizeChartImage: string | null
  sizeType: string
  usage: string | null
  saleType: string
  publishSeason: string | null
  attributes: string[] | null
  customAttributes: CustomAttribute[]
  optAttributes: Record<string, string>[] // assuming key-value objects
  filingAttributes: Record<string, anstringy>[] // assuming key-value objects
  items: ProductItem[]
}

export interface CustomAttribute {
  itemForeignName?: string
  foreignIngredient?: string
  [key: string]: string | undefined
}

export interface ProductItem {
  sku: string
  outerSku: string | null
  size: string
  variationValue: string | null
  barcode: string
  mfBarcode: string | null
  additionBarcode: string[] | null
  weight: number
  weightUnit: string
  dimension: string | null
  currency: string
  priceMsrp: number
  priceCost: number
  priceRetail: number
  saleCurrency: string
  saleMsrp: number
  saleRetail: number
  saleCost: number
  qty: number
  taxRate: number | null
  alive: boolean
  inventoryInfos: string[] | null
}
export interface ProductDetail extends Product {
  items: ProductItem[]
  customAttributes: CustomAttribute[]
}
export interface ProductListResponse {
  total: number
  page: number
  pageSize: number
  products: Product[]
}