'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import { useSearchParams } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
}

// Separate component for search functionality
function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);



  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      product.category.toLowerCase() === selectedCategory;
    
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', 'handguns', 'rifles', 'ammunition', 'accessories'];

  const addToCart = (product: Product) => {
    const savedCart = localStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    
    const existingItem = cart.find((item: any) => item._id === product._id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  if (loading) {
    return (
      <div className="min-h-screen theme-bg flex items-center justify-center">
        <div className="text-xl theme-text font-mono">[LOADING_FIREARMS...]</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Pixel GIF Background */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/pixel.GIF" 
          alt="Pixel Background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 z-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen bg-transparent">
        {/* Navigation */}
        <Navigation />

        {/* Spacer to prevent content from hiding under fixed nav */}
        <div className="h-16"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-4">
          <span className="theme-text font-mono text-sm">root@topguns:~$</span>
        </div>
        <h1 className="text-3xl font-bold theme-text mb-8 font-mono text-center">[FIREARMS_&_ACCESSORIES]</h1>
        
        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-6 text-center">
            <p className="theme-text font-mono">
              [SEARCH_RESULTS_FOR]: <span className="theme-text-secondary">"{searchQuery}"</span>
            </p>
            <p className="theme-text-tertiary text-sm font-mono">
              [{filteredProducts.length} {filteredProducts.length === 1 ? 'ITEM' : 'ITEMS'} FOUND]
            </p>
          </div>
        )}
        
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 border text-sm font-medium transition-all duration-200 font-mono ${
                  selectedCategory === category
                    ? 'theme-accent text-theme-hover-text border-theme-accent'
                    : 'theme-bg theme-text hover:theme-hover border-theme-border'
                }`}
              >
                [{category.toUpperCase()}]
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="theme-text text-lg font-mono">
              {searchQuery 
                ? `[NO_FIREARMS_FOUND_FOR: "${searchQuery}"]` 
                : '[NO_FIREARMS_FOUND_IN_CATEGORY]'
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => window.location.href = '/products'}
                className="mt-4 theme-bg theme-text px-6 py-3 border theme-border hover:theme-hover transition-all duration-200 font-mono font-bold"
              >
                [CLEAR_SEARCH]
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="theme-bg border theme-border overflow-hidden hover:theme-hover transition-all duration-300 font-mono">
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img
                    src={product.images[0] || '/placeholder-gun.jpg'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold theme-text mb-2">[{product.name}]</h3>
                  <p className="theme-text-secondary text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold theme-text">${product.price}</span>
                    <span className={`text-sm ${product.stock > 0 ? 'theme-text-tertiary' : 'text-red-400'}`}>
                      {product.stock > 0 ? `[${product.stock}_IN_STOCK]` : '[OUT_OF_STOCK]'}
                    </span>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full mt-3 theme-bg theme-text py-2 px-4 border theme-border hover:theme-hover disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed transition-all duration-200 font-mono font-bold"
                  >
                    [ADD_TO_CART]
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen theme-bg theme-text">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 theme-border mx-auto"></div>
            <p className="mt-4 text-xl">Loading products...</p>
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
} 