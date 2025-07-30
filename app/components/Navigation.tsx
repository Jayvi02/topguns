'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 theme-bg/95 backdrop-blur-sm border-b theme-border/30 transition-all duration-300 hover:theme-bg/98">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="text-xl font-bold theme-text font-mono hover:theme-text-secondary transition-colors duration-200">
              TopGuns_Firearms.exe
            </Link>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 flex justify-center max-w-md mx-auto">
            <form onSubmit={handleSearch} className="relative w-full max-w-sm">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search firearms..."
                  className="w-full px-4 py-2 pl-10 pr-4 theme-bg border theme-border theme-text placeholder-theme-text-tertiary focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-theme-accent font-mono text-sm transition-all duration-200"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 theme-text-tertiary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:theme-text-secondary transition-colors"
                  >
                    <svg
                      className="h-4 w-4 theme-text-tertiary hover:theme-text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right side - Navigation Links */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            <Link href="/products" className="theme-text hover:theme-text-secondary transition-all duration-200 font-mono hover:scale-105 transform">
              [FIREARMS]
            </Link>
            <Link href="/cart" className="theme-text hover:theme-text-secondary transition-all duration-200 font-mono hover:scale-105 transform">
              [CART]
            </Link>            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/profile" 
                  className="text-sm theme-text-secondary hover:theme-text font-mono transition-all duration-200 hover:scale-105 transform"
                >
                  [{user?.name || 'USER'}]
                </Link>
                <button
                  onClick={handleLogout}
                  className="theme-accent hover:theme-hover text-theme-hover-text px-4 py-2 rounded-none border theme-border transition-all duration-200 font-mono font-bold hover:scale-105 transform hover:shadow-lg hover:shadow-theme-accent/25"
                >
                  [LOGOUT]
                </button>
              </div>
            ) : (
              <Link href="/login" className="theme-accent hover:theme-hover text-theme-hover-text px-4 py-2 rounded-none border theme-border transition-all duration-200 font-mono font-bold hover:scale-105 transform hover:shadow-lg hover:shadow-theme-accent/25">
                [LOGIN]
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 