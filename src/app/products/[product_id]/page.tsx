import ProductTmallView from './component'

import { extractProductCode } from '@/utils/slugify'
import { getProductDetail } from '@/api/products'
import { Metadata } from 'next'
import './style.css'

interface Props {
  params: { product_id: string }
}

export async function generateMetadata({
  params,
}: {
  params: { product_id: string }
}): Promise<Metadata> {
  const code = extractProductCode(params.product_id)
  const product = await getProductDetail(code)

  return {
    title: `${product.title} | My Store`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.productImages?.map((url: string) => ({ url })),
    },
  }
}


export default async function ProductDetailPage({ params }: Props) {
  const { product_id } = params // ✅ no need to await

  const code = extractProductCode(product_id)
  const product = await getProductDetail(code)

  if (!product) return <p className="p-4">Product not found</p>

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="mt-4">
        <ProductTmallView {...product} />
      </div>
    </div>
  )
}

