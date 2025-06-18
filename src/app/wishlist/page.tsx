import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

const wishlistItems = [
  {
    id: 1,
    name: 'Product 1',
    price: 99.99,
    image: '/product1.jpg',
    inStock: true
  },
  {
    id: 2,
    name: 'Product 2',
    price: 149.99,
    image: '/product2.jpg',
    inStock: true
  },
  {
    id: 3,
    name: 'Product 3',
    price: 79.99,
    image: '/product3.jpg',
    inStock: false
  }
];

export default function WishlistPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Heart className="text-[#f63]" size={28} />
          <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
        </div>
        <p className="text-gray-600">{wishlistItems.length} items</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto text-gray-400 mb-4" size={48} />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600">Start adding items you love!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 relative">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>
              
              <div className="relative w-full h-48 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-lg font-bold text-[#f63] mb-4">${item.price.toFixed(2)}</p>

              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {item.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                <button
                  disabled={!item.inStock}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white transition-colors
                    ${item.inStock 
                      ? 'bg-gradient-to-r from-[#f63] to-[#f53] hover:from-[#f53] hover:to-[#f63]' 
                      : 'bg-gray-300 cursor-not-allowed'
                    }`}
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
