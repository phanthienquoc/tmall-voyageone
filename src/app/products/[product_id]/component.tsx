/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Heart, ShoppingCart, TrendingUp, Scale, Shield, Box, Truck } from 'lucide-react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';

// Assuming IProduct and ProductItem are the types of the product and its variants
interface ProductItem {
  sku: string;
  size: string;
  barcode: string;
  weight: number;
  weightUnit: string;
  currency: string;
  priceMsrp: number;
  priceCost: number;
  priceRetail: number;
  saleCurrency: string;
  saleMsrp: number;
  saleRetail: number;
  saleCost: number;
  qty: number;
  taxRate: string | null;
  alive: boolean;
  inventoryInfos: any; // Define the type if needed
}

interface IProduct {
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
  attributes: any | null;
  customAttributes: Array<{
    itemForeignName: string;
    foreignIngredient: string;
  }>;
  optAttributes: any[];
  filingAttributes: any[];
  items: ProductItem[];
}

const ProductTmallView = (product: IProduct) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Get the default price from the first item
  const defaultPrice = product.items?.[0]?.priceRetail;
  const salePrice = product.items?.[0]?.priceRetail; // Example sale price, adjust as needed

  // Slider settings for product images
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    customPaging: (i: number) => (
      <div className="w-[60px] h-[60px] overflow-hidden rounded-lg border-2 border-gray-200 hover:border-[#f63] transition-colors">
        <Image
          width={80}
          height={80}
          src={product.productImages[i]}
          alt={`Product view ${i + 1}`}
          className="object-cover w-full h-full hover:scale-110 transition-transform"
        />
      </div>
    ),
    dotsClass: 'slick-dots custom-thumb-dots',
  };

  // Features list
  const features = [
    { icon: <Truck size={20} />, text: 'Free shipping on orders over $50' },
    { icon: <Shield size={20} />, text: '100% Authentic guarantee' },
    { icon: <Box size={20} />, text: '30-day return policy' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="text-gray-500 hover:text-[#f63]">
              Home
            </a>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <a href="/products" className="text-gray-500 hover:text-[#f63]">
              Products
            </a>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium">{product.title}</li>
        </ol>
      </nav>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Product Images */}
        <div className="relative">
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
            <Slider {...sliderSettings}>
              {product.productImages.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image}
                    alt={`${product.title} - View ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="flex flex-col space-y-6">
          {/* Header Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

            {product.brand && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                <TrendingUp size={16} className="mr-2" />
                {product.brand}
              </div>
            )}

            {/* Price */}
            <div className="flex items-end gap-4">
              <div className="text-3xl font-bold text-[#f63]">${salePrice.toFixed(2)}</div>
              {salePrice !== defaultPrice && (
                <>
                  <div className="text-xl text-gray-500 line-through">
                    ${defaultPrice.toFixed(2)}
                  </div>

                  <div className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    Save {Math.round((1 - salePrice / defaultPrice) * 100)}%
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Product Features */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-y border-gray-200">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-600">
                {feature.icon}
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div> */}

          {/* Size Selection */}
          {product.items && product.items.length > 0 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Size</label>
              <div className="flex flex-wrap gap-3">
                {product.items.map((item) => (
                  <button
                    key={item.sku}
                    onClick={() => setSelectedSize(item.size)}
                    className={`
                      px-4 py-2 rounded-lg border-2 transition-all
                      ${
                        selectedSize === item.size
                          ? 'border-[#f63] text-[#f63] bg-[#f63]/5'
                          : 'border-gray-200 hover:border-[#f63] text-gray-700'
                      }
                      ${item.qty === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    disabled={item.qty === 0}
                  >
                    {item.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border-2 border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:text-[#f63] disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:text-[#f63]"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {product.items?.[0]?.qty || 0} items available
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button className="flex-1 bg-gradient-to-r from-[#f63] to-[#f53] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#f53] hover:to-[#f63] transition-all flex items-center justify-center gap-2">
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button className="p-4 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-[#f63] hover:text-[#f63] transition-all">
              <Heart size={20} />
            </button>
          </div>

          {/* Product Description */}
          {product.description && (
            <div className="prose prose-sm max-w-none pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Product Description</h3>
              <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
            </div>
          )}

          {/* Additional Details */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold">Product Details</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {product.material && (
                <div>
                  <dt className="text-sm text-gray-500">Material</dt>
                  <dd className="text-sm font-medium text-gray-900">{product.material}</dd>
                </div>
              )}
              {product.origin && (
                <div>
                  <dt className="text-sm text-gray-500">Origin</dt>
                  <dd className="text-sm font-medium text-gray-900">{product.origin}</dd>
                </div>
              )}
              {product.category && (
                <div>
                  <dt className="text-sm text-gray-500">Category</dt>
                  <dd className="text-sm font-medium text-gray-900">{product.category}</dd>
                </div>
              )}
              {product.sizeType && (
                <div>
                  <dt className="text-sm text-gray-500">Size Type</dt>
                  <dd className="text-sm font-medium text-gray-900">{product.sizeType}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTmallView;
