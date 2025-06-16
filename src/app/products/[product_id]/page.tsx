import { Metadata } from 'next';
import Script from 'next/script';
import ProductTmallView from './component';
import { getProductDetail } from '@/api/products';
import './style.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product_id: string }>;
}): Promise<Metadata> {
  const { product_id } = await params;
  const product = await getProductDetail(product_id);

  if (!product)
    return {
      title: 'Product Not Found | My Store',
      description: 'The product you are looking for does not exist.',
      openGraph: {
        title: 'Product Not Found',
        description: 'The product you are looking for does not exist.',
        images: [],
      },
      robots: 'index, follow',
      metadataBase: new URL('https://tmall-voyageone-axxd.vercel.app'),
      alternates: {
        canonical: `/product/${product_id}`,
      },
    };

  return {
    title: `${product.title} | My Store`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.productImages?.map((url: string) => ({ url })),
    },
    robots: 'index, follow',
    metadataBase: new URL('https://tmall-voyageone-axxd.vercel.app'),
    alternates: {
      canonical: `/product/${product_id}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ product_id: string }> }) {
  const { product_id } = await params;
  const product = await getProductDetail(product_id);

  if (!product) {
    return <p className="p-4">Product not found</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Script id="product-jsonld" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: product.title,
          image: product.productImages,
          description: product.description,
          sku: product.sku || product.product_id,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        })}
      </Script>
      <div className="mt-4">
        <ProductTmallView {...product} />
      </div>
    </div>
  );
}
