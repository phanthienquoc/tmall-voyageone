'use client';

import { useEffect } from 'react';
import { useProductStore } from '@/store/useProductStore';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart, ShoppingCart, Tag } from 'lucide-react';
import { IProduct } from '@/types/product';

export default function ProductPage() {
  const { products, getProducts, loading } = useProductStore();

  useEffect(() => {
    getProducts(['locondo-SH01-FKU1306-1059']);
  }, [getProducts]);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 animate-pulse">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderProductCard = (product: IProduct) => {
    const displayPrice = product.items?.[0]?.priceRetail || 0;
    const displaySalePrice = product.salePrice;
    const hasDiscount = typeof displaySalePrice === 'number' && displaySalePrice < displayPrice;
    const displayName = product.title || product.shortTitle || product.code;
    const stock = product.items?.[0]?.qty || 0;
    const rating = product.rating || 0;
    const mainImage = product.productImages?.[0] || '';

    return (
      <div key={product.code} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        {/* Image and quick actions */}
        <div className="relative aspect-[3/4] bg-gray-100 rounded-t-xl overflow-hidden">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={displayName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <ShoppingCart size={48} strokeWidth={1} />
            </div>
          )}
          
          {/* Quick action buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              className="p-2 rounded-full bg-white/90 hover:bg-white shadow-sm hover:shadow text-gray-600 hover:text-red-500 transition-all"
              title="Add to Wishlist"
            >
              <Heart size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Discount badge */}
          {hasDiscount && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              {Math.round(((displayPrice - displaySalePrice) / displayPrice) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Product details */}
        <Link 
          href={`/products/${encodeURIComponent(product.code)}`}
          className="block p-4 hover:cursor-pointer"
        >
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < rating ? "text-yellow-400" : "text-gray-200"}
                fill={i < rating ? "currentColor" : "none"}
              />
            ))}
          </div>

          <h2 className="text-lg font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-[#f63] transition-colors">
            {displayName}
          </h2>

          {product.brand && (
            <div className="text-sm text-gray-600 mb-2">
              {product.brand}
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="space-y-1">
              {hasDiscount ? (
                <>
                  <div className="text-[#f63] font-semibold">
                    ${displaySalePrice.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    ${displayPrice.toFixed(2)}
                  </div>
                </>
              ) : (
                <div className="text-[#f63] font-semibold">
                  ${displayPrice.toFixed(2)}
                </div>
              )}
            </div>
            {stock > 0 && (
              <div className="text-sm text-gray-500">
                {stock} left
              </div>
            )}
          </div>

          <button 
            className="mt-4 w-full bg-white text-[#f63] border-2 border-[#f63] py-2 rounded-lg 
              hover:bg-gradient-to-r hover:from-[#f63] hover:to-[#f53] hover:text-white 
              transition-all duration-300 flex items-center justify-center gap-2 font-medium"
            title="Add to Cart"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
          <div className="flex items-center gap-4">
            <button 
              className="text-gray-600 hover:text-gray-900 transition-colors"
              title="Filter Products"
            >
              <Tag size={20} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map(renderProductCard)}
        </div>
      </div>
    </div>
  );
}
