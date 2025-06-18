// store/useProductStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IProduct } from '@/types/product';

interface ProductStore {
  products: IProduct[];
  selectedProduct: IProduct | null;
  loading: boolean;
  getProducts: (codes: string[]) => Promise<void>;
  getProductDetail: (code: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>()(
  devtools((set) => ({
    products: [],
    selectedProduct: null,
    loading: false,

    getProducts: async (codes) => {
      set({ loading: true });
      try {
        const res = await fetch(`https://sandbox.voyageone.com/v2/restapi/product/market/list`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_VOYAGEONE_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageNo: 1,
            pageSize: 100,
            codes,
          }),
        });
        
        const data = await res.json();

        const enrichedProducts = data.data.record.map((product: any) => ({
          ...product,
          rating: Math.floor(Math.random() * 5) + 1, // TODO: Replace with actual rating
          salePrice: product.items?.[0]?.priceRetail 
            ? Math.random() > 0.5 
              ? product.items[0].priceRetail * 0.8 
              : undefined
            : undefined,
        }));

        set({ products: enrichedProducts, loading: false });
      } catch (err) {
        console.error('Failed to fetch product list', err);
        set({ loading: false });
      }
    },

    getProductDetail: async (code) => {
      console.log('[useProductStore] Fetching product detail for getProductDetail:', code);
      try {
        const res = await fetch(`https://sandbox.voyageone.com/v2/restapi/product/market/list`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_VOYAGEONE_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageNo: 1,
            pageSize: 1,
            codes: [code],
          }),
        });
        
        const data = await res.json();
        const product = data.data.record[0];

        if (product) {
          const enrichedProduct = {
            ...product,
            rating: Math.floor(Math.random() * 5) + 1, // TODO: Replace with actual rating
            salePrice: product.items?.[0]?.priceRetail 
              ? Math.random() > 0.5 
                ? product.items[0].priceRetail * 0.8 
                : undefined
              : undefined,
          };
          
          set({ selectedProduct: enrichedProduct });
        }
      } catch (err) {
        console.error('Failed to fetch product detail', err);
      }
    },
  }))
);
