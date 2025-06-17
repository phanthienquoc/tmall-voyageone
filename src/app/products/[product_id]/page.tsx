import { Metadata } from 'next';
import Script from 'next/script';
import ProductTmallView from './component';
import { getProductDetail } from '@/api/products';
import { ProductItem } from '@/types/product';
import './style.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product_id: string }>;
}): Promise<Metadata> {
  const { product_id } = await params;
  const product = await getProductDetail(product_id);
  const baseUrl = 'https://tmall-voyageone-axxd.vercel.app';

  if (!product)
    return {
      title: 'Product Not Found | Tmall Official Store',
      description: 'The product you are looking for does not exist.',
      openGraph: {
        type: 'website',
        title: 'Product Not Found | Tmall Official Store',
        description: 'The product you are looking for does not exist.',
        siteName: 'Tmall Official Store',
        images: [],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Product Not Found | Tmall Official Store',
        description: 'The product you are looking for does not exist.',
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: `${baseUrl}/products/${product_id}`,
      },
    };

  // Format price for display
  const formattedPrice = product.price ? `$${product.price.toFixed(2)}` : '';
  const productTitle = `${product.title} - ${product.brand || 'Tmall'} | Official Store`;
  const productDescription =
    product.description ||
    `Buy ${product.title} from our official store. ${product.brand ? `Authentic ${product.brand} product.` : ''} ${
      product.material ? `Made from ${product.material}.` : ''
    } ${formattedPrice ? `Available at ${formattedPrice}` : ''}`;

  return {
    title: productTitle,
    description: productDescription,
    applicationName: 'Tmall Official Store',
    keywords: [product.title, product.brand, product.category, 'tmall', 'official store']
      .filter(Boolean)
      .join(', '),
    authors: [{ name: 'Tmall Official Store' }],
    openGraph: {
      type: 'website',
      title: productTitle,
      description: productDescription,
      siteName: 'Tmall Official Store',
      images:
        product.productImages?.map((url: string) => ({
          url,
          width: 800,
          height: 600,
          alt: `${product.title} - Product Image`,
        })) || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: productTitle,
      description: productDescription,
      images: product.productImages?.[0],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/products/${product_id}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ product_id: string }> }) {
  const { product_id } = await params;
  const product = await getProductDetail(product_id);

  if (!product) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p>We apologize, but the product you are looking for does not exist.</p>
      </div>
    );
  }

  // Enhanced structured data
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.productImages,
    sku: product.sku || product_id,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Tmall',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      price: product.price,
      availability: product.items?.some((item: ProductItem) => item.alive && item.qty > 0)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Tmall Official Store',
      },
      itemCondition: 'https://schema.org/NewCondition',
    },
    category: product.category,
    material: product.material,
    manufacturer: {
      '@type': 'Organization',
      name: product.brand || 'Tmall',
    },
  };

  return (
    <article className="p-6 max-w-4xl mx-auto space-y-6">
      <Script id="product-jsonld" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <div className="mt-4">
        <ProductTmallView {...product} />
      </div>
    </article>
  );
}
