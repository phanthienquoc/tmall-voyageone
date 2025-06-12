'use client'
import React from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import { IProduct, ProductItem } from '@/types/product'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './style.css'


const ProductTmallView = (product: IProduct) => {
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
    }


    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* 🔹 Header */}
            <header className="border-b pb-4">
                <h1 className="text-2xl font-bold">{product.title}</h1>
            </header>

            {/* 🔹 Main Content */}
            <section className="flex flex-col md:flex-row gap-24 mt-4">
                {/* Left Block - Image */}
                <div className="w-full md:w-1/3 mr-[32px]">
                    <div className="rounded p-2">

                        {/* Image Slider */}
                        <Slider {...sliderSettings}>
                            {product.productImages.map((src: string, idx: number) => (
                                <Image
                                    key={idx}
                                    src={src}
                                    width={1}
                                    height={1}
                                    alt="placeholder"
                                    unoptimized
                                    className='w-[300px] h-[300px] object-cover rounded'
                                />
                            ))}
                        </Slider>
                    </div>
                </div>

                {/* Right Block - Product Info */}
                <div className="w-full md:w-2/3 space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">{product.brand} | {product.category}</p>
                        <p className="text-sm text-gray-500">Category: Accessories</p>
                    </div>
                    <div>
                        {/* Info Section */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div>
                                <h2 className="font-semibold text-lg mb-2">Description</h2>
                                <p>{product.description}</p>
                            </div>
                            <div>
                                <ul className="text-sm space-y-1">
                                    <li><strong>Color:</strong> {product.color}</li>
                                    <li><strong>Material:</strong> {product.material}</li>
                                    <li><strong>Origin:</strong> {product.origin}</li>
                                    <li><strong>Foreign Name:</strong> {product.customAttributes[0]?.itemForeignName}</li>
                                    <li><strong>Foreign Ingredient:</strong> {product.customAttributes[0]?.foreignIngredient}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* Variants Table */}
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
                                    {product.items.map((item: ProductItem, idx: number) => (
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
                </div>
            </section>
        </div>
    )

}

export default ProductTmallView