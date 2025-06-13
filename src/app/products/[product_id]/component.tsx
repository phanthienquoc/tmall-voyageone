/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import Image from 'next/image'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './style.css'



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
    // Slider settings for product images
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        customPaging: (i: number) => (
            <div className="w-[50px] h-[50px] overflow-hidden rounded border border-gray-300">
                <Image
                    width={80}
                    height={80}
                    unoptimized
                    src={product.productImages[i]}
                    alt={`thumb-${i}`}
                    className="object-cover w-full h-full"
                />
            </div>
        ),
        dotsClass: 'slick-dots custom-thumb-dots',
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* 🔹 Header */}
            <header className="border-b pb-4">
                <h1 className="text-2xl font-bold">{product?.title}</h1>
            </header>

            {/* 🔹 Main Content */}
            <section className="flex flex-col md:flex-row gap-24 mt-4">
                {/* Left Block - Image */}
                <div className="w-full md:w-1/3 mr-[32px]">
                    <div className="rounded p-2">
                        {/* Image Slider */}
                        <Slider {...sliderSettings}>
                            {product?.productImages.map((src: string, idx: number) => (
                                <div key={idx}>
                                    <Image
                                        src={src}
                                        width={600}
                                        height={600}
                                        alt={`product-image-${idx}`}
                                        unoptimized
                                        className="w-full h-[300px] object-cover rounded"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                {/* Right Block - Product Info */}
                <div className="w-full md:w-2/3 space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Brand:{product?.brand}</p>
                        <p className="text-sm text-gray-500">Category:{product?.category}</p>

                        <p className="text-sm text-gray-500">Industry: {product?.industry}</p>
                    </div>

                    {/* 🔹 Description and Attributes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div>
                            <h2 className="font-semibold text-lg mb-2">Description</h2>
                            <p>{product?.description}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg mb-2">Attributes</h2>
                            <ul className="text-sm space-y-1">
                                <li><strong>Color:</strong> {product?.color}</li>
                                <li><strong>Material:</strong> {product?.material}</li>
                                <li><strong>Origin:</strong> {product?.origin}</li>
                                <li><strong>Foreign Name:</strong> {product?.customAttributes[0]?.itemForeignName}</li>
                                <li><strong>Foreign Ingredient:</strong> {product?.customAttributes[0]?.foreignIngredient}</li>
                            </ul>
                        </div>
                    </div>

                    {/* 🔹 Variants Table */}
                    <div className="mt-6">
                        <h2 className="font-semibold text-lg mb-2">Variants</h2>
                        <table className="w-full text-sm border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-2">SKU</th>
                                    <th className="border p-2">Size</th>
                                    <th className="border p-2">Barcode</th>
                                    <th className="border p-2">Weight (g)</th>
                                    <th className="border p-2">Retail Price ($)</th>
                                    <th className="border p-2">Quantity</th>
                                    <th className="border p-2">Alive</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product?.items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="border p-2">{item.sku}</td>
                                        <td className="border p-2">{item.size}</td>
                                        <td className="border p-2">{item.barcode}</td>
                                        <td className="border p-2">{item.weight}</td>
                                        <td className="border p-2">{item.priceRetail}</td>
                                        <td className="border p-2">{item.qty}</td>
                                        <td className="border p-2">{item.alive ? '✅' : '❌'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductTmallView;
