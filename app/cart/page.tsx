'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  images: string[];
  quantity: number;
  stock: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (productId: string) => {
    const updatedCart = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) {
    return (
      <div className="min-h-screen theme-bg flex items-center justify-center">
        <div className="text-xl theme-text font-mono">[LOADING_CART...]</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Pixel GIF Background */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/gif.GIF" 
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
        <h1 className="text-3xl font-bold theme-text mb-8 font-mono text-center">[SHOPPING_CART]</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="theme-text text-lg mb-4 font-mono">[YOUR_CART_IS_EMPTY]</p>
            <Link
              href="/products"
              className="inline-block theme-bg theme-text px-6 py-3 border theme-border hover:theme-hover transition-all duration-200 font-mono font-bold"
            >
              [CONTINUE_SHOPPING]
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="theme-bg border theme-border">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center p-6 border-b theme-border-secondary/30 last:border-b-0">
                    <img
                      src={item.images[0] || '/placeholder-gun.jpg'}
                      alt={item.name}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-semibold theme-text font-mono">[{item.name}]</h3>
                      <p className="theme-text-secondary">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 border theme-border flex items-center justify-center hover:theme-hover theme-text transition-all duration-200 font-mono"
                      >
                        -
                      </button>
                      <span className="w-12 text-center theme-text font-mono">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 border theme-border flex items-center justify-center hover:theme-hover theme-text transition-all duration-200 font-mono"
                      >
                        +
                      </button>
                    </div>
                    <div className="ml-6 text-right">
                      <p className="text-lg font-semibold theme-text">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-400 hover:text-red-300 text-sm transition-colors font-mono"
                      >
                        [REMOVE]
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="theme-bg border theme-border p-6">
                <h2 className="text-lg font-semibold theme-text mb-4 font-mono">[ORDER_SUMMARY]</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between theme-text-secondary font-mono">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between theme-text-secondary font-mono">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between theme-text-secondary font-mono">
                    <span>Tax</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t theme-border-secondary/30 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold theme-text font-mono">
                    <span>Total</span>
                    <span>${(total * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full theme-bg theme-text py-3 px-4 border theme-border hover:theme-hover transition-all duration-200 font-mono font-bold">
                    [PROCEED_TO_CHECKOUT]
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full theme-bg text-red-400 py-3 px-4 border border-red-500 hover:bg-red-500 hover:text-black transition-all duration-200 font-mono font-bold"
                  >
                    [CLEAR_CART]
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
} 