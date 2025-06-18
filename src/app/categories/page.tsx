import { Shirt, Watch, Laptop, Gift, Home, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    name: 'Fashion',
    description: 'Clothing, shoes, and accessories',
    icon: Shirt,
    color: 'from-pink-500 to-rose-500',
    href: '/categories/fashion'
  },
  {
    name: 'Electronics',
    description: 'Phones, laptops, and gadgets',
    icon: Laptop,
    color: 'from-blue-500 to-cyan-500',
    href: '/categories/electronics'
  },
  {
    name: 'Accessories',
    description: 'Watches, jewelry, and more',
    icon: Watch,
    color: 'from-purple-500 to-indigo-500',
    href: '/categories/accessories'
  },
  {
    name: 'Home & Living',
    description: 'Furniture and home decor',
    icon: Home,
    color: 'from-green-500 to-teal-500',
    href: '/categories/home-living'
  },
  {
    name: 'Gifts',
    description: 'Perfect presents for everyone',
    icon: Gift,
    color: 'from-yellow-500 to-amber-500',
    href: '/categories/gifts'
  },
  {
    name: 'All Products',
    description: 'Browse all categories',
    icon: ShoppingBag,
    color: 'from-[#f63] to-[#f53]',
    href: '/products'
  }
];

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.name}
              href={category.href}
              className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className={`flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-r ${category.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={32} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h2>
              <p className="text-gray-600">{category.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
