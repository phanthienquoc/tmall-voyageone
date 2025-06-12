// store/useProductStore.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface Product {
  code: string
  name?: string
  [key: string]: any
}

interface ProductStore {
  products: Product[]
  selectedProduct: Product | null
  loading: boolean
  getProducts: (codes: string[]) => Promise<void>
  getProductDetail: (code: string) => Promise<void>
}

export const useProductStore = create<ProductStore>()(
  devtools((set) => ({
    products: [],
    selectedProduct: null,
    loading: false,

    getProducts: async (codes) => {
      set({ loading: true })
      try {
        const res = await fetch(`https://sandbox.voyageone.com/v2/restapi/product/market/list`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VOYAGEONE_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageNo: 1,
            pageSize: 100,
            codes,
          }),
        })
        const data = await res.json()

        set({ products: data.data.record, loading: false })
      } catch (err) {
        console.error('Failed to fetch product list', err)
        set({ loading: false })
      }
    },

    getProductDetail: async (code) => {
      set({ loading: true })
      try {
        const res = await fetch(`https://sandbox.voyageone.com/v2/restapi/product/market/info`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VOYAGEONE_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        })

        const data = await res.json()
        set({ selectedProduct: data.data, loading: false })
      } catch (err) {
        console.error('Failed to fetch product detail', err)
        set({ loading: false })
      }
    },
  }))
)
