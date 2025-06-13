import ProductTmallView from './component'

import { extractProductCode } from '@/utils/slugify'
import { getProductDetail } from '@/api/products'
import { Metadata } from 'next'
import './style.css'
import type { AppProps } from 'next/app'


interface Props extends AppProps {
  params: {
    product_id: string;
  };
}
export async function generateMetadata({
  params,
}: {
  params: { product_id: string }
}): Promise<Metadata> {
  const { product_id } = await params // ✅ no need to await
  const product = await getProductDetail(product_id)
  if(!product) return {
    title: 'Product Not Found | My Store',
    description: 'The product you are looking for does not exist.',
    openGraph: {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
      images: [],
    },
  }
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

export default async function PostPage(props: Props) {
  const { product_id } = await props.params 
    const product = await getProductDetail(product_id)

  return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="mt-4">
        <ProductTmallView {...product} />
      </div>
    </div>
  )
}



// export default async function ProductDetailPage({ params }: Props) {
//   const { product_id } = await params // ✅ no need to await
//   console.log('ProductDetailPage', product_id)
//   const code = product_id
//   // const code = extractProductCode(product_id)
//   const product = await getProductDetail(code)
//   console.log('generateMetadata', JSON.stringify(product, null, 2))
//   // If product is not found, return a simple message

//   if (!product) return <p className="p-4">Product not found</p>

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-6">
//       <div className="mt-4">
//         <ProductTmallView {...product} />
//       </div>
//     </div>
//   )
// }

