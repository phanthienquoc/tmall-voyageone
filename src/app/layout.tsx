'use client';
import { useState } from 'react';
import { Inter } from 'next/font/google';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import Sidebar from '@/components/Sidebar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const GA_MEASUREMENT_ID = 'G-7T7R7P4008';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <div className="min-h-screen bg-gray-50">
          <nav>
            <ShopeeHeader />
          </nav>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-6 min-h-[calc(100vh-4rem)]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

function ShopeeHeader() {
  const [sku, setSku] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (sku.trim()) {
      router.push(`/products/${encodeURIComponent(sku.toString())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#f63] to-[#f53] text-white text-sm shadow-md">
      {/* Google Analytics Tag */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
      </Script>
      
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center gap-2">
          <span className="hidden md:inline">Tmall Store</span>
        </div>

        {/* Search box */}
        <div className="flex-1 mx-6 max-w-2xl relative bg-white rounded-sm">
          <input
            type="text"
            placeholder="Input SKU or Item Id to search"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 pl-4 pr-12 rounded-sm text-black focus:outline-none focus:ring-2 focus:ring-[#f63]"
          />
          <button
            onClick={handleSearch}
            className="absolute right-0 top-0 bottom-0 px-4 bg-white text-[#f63] rounded-sm hover:bg-gray-50 transition-colors"
          >
            <Search size={18} />
          </button>
        </div>

        {/* Cart */}
        <div className="text-white cursor-pointer">
          {/* Add your cart or other elements here */}
        </div>
      </div>
    </header>
  );
}
