'use client'

import { useEffect } from 'react'
import { useProductStore } from '@/store/useProductStore'

export default function ProductPage() {
  const { products, selectedProduct, getProducts, loading } = useProductStore()

  useEffect(() => {
    getProducts(["locondo-SH01-FKU1306-1059"])
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Products</h1>
      {loading && <p>Loading...</p>}
      <ul className="mt-4 space-y-2">
        {products.map((product) => (
          <li key={product.code} className="border p-2">
            <a href={`/products/${product.code}`}>
              <p>{product.code}</p>

              <button
                className="text-blue-600"
              >
                View Detail
              </button>
            </a>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <div className="mt-6 border p-4">
          <h2 className="text-lg font-semibold">Product Detail</h2>
          <pre className="text-sm">{JSON.stringify(selectedProduct, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
