'use client';
import { useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

type LayoutProps = React.PropsWithChildren<{}>;

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <nav>
        <ShopeeHeader />
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;

function ShopeeHeader() {
  const [sku, setSku] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (sku.trim()) {
      router.push(`/products/${encodeURIComponent(sku.toString())}`);
    }
  };

  // Handle Enter key press to trigger the search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger search when Enter is pressed
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#f63] to-[#f53] text-white text-sm">
      {/* Middle bar */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center gap-2">
          {/* Add your logo or other elements here */}
        </div>

        {/* Search box */}
        <div className="flex-1 mx-6 max-w-2xl relative bg-white rounded-sm">
          <input
            type="text"
            placeholder="Input SKU or Item Id to search"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            onKeyDown={handleKeyDown} // Listen for Enter key press
            className="w-full p-2 pl-4 pr-12 rounded-sm text-black"
          />
          <button
            onClick={handleSearch}
            className="absolute right-0 top-0 bottom-0 px-4 bg-white text-[#f63] rounded-sm"
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
