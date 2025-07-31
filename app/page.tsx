'use client';

import Link from 'next/link';
import Navigation from './components/Navigation';
import BannerSlider from './components/BannerSlider';
import KillLeaderboard from './components/KillLeaderboard';

export default function Home() {
  const userReviews = [
    {
      name: 'John Wick',
      rating: 5.0,
      quote: 'This is my go to shop. quality badu!',
      verified: true,
      image: '/images/johnwick.jpg.jpg'
    },
    {
      name: 'David "Frank" Castle AKA The Punisher',
      rating: 4.5,
      quote: 'Fast shipping and discreet packaging. The selection is incredible and prices are competitive.',
      verified: true,
      image: '/images/punisher.jpg.jpg'
    },
    {
      name: 'Simon "Ghost" Riley',
      rating: 5.0,
      quote: 'Been a customer for my whole life. Never had any issues!',
      verified: true,
      image: '/images/ghost.jpg.jpg'
    },
    {
      name: 'The Jackal',
      rating: 4.5,
      quote: 'Best Snipers in the market!',
      verified: true,
      image: '/images/jackal.jpg.jpg'
    },
    {
      name: 'Agent 47',
      rating: 5.0,
      quote: 'Best',
      verified: true,
      image: '/images/47.jpg.jpg'
    },
    {
      name: 'James "007" Bond',
      rating: 5.0,
      quote: 'I\'am who i\'am today cuz of this shop. you can find any gun you want here!!',
      verified: true,
      image: '/images/007.jpg.jpg'
    },
    {
      name: 'Cpt John Price',
      rating: 4.5,
      quote: 'Best firearms marketplace I\'ve used.',
      verified: true,
      image: '/images/price.jpg.jpg'
    }
  ];

  // Duplicate the reviews array to create seamless loop
  const duplicatedReviews = [...userReviews, ...userReviews];

  // Function to render stars with half-star support
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            // Full star
            return (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          } else if (i === fullStars && hasHalfStar) {
            // Half star
            return (
              <div key={i} className="relative w-4 h-4">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="absolute top-0 left-0 w-4 h-4 text-yellow-400 overflow-hidden"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ clipPath: 'inset(0 50% 0 0)' }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            );
          } else {
            // Empty star
            return (
              <svg
                key={i}
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Blur */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/bg.jpg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)',
        }}
      />
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 z-0 bg-black/50" />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen">
        {/* Navigation */}
        <Navigation />

        {/* Spacer to prevent content from hiding under fixed nav */}
        <div className="h-16"></div>

        {/* Hero Section */}
        <div className="bg-transparent">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl pixel-font cyberpunk-blink" data-text="Welcome to TopGuns">
                Welcome to <span>TopGuns</span>
              </h1>
              <div className="mt-2 mb-4">
                <span className="theme-text-tertiary font-mono text-sm">[SYSTEM: ONLINE] [SECURITY: MAXIMUM] [ACCESS: GRANTED]</span>
              </div>
              <p className="mt-3 max-w-md mx-auto text-base theme-text sm:text-lg md:mt-5 md:text-xl md:max-w-3xl font-mono">
                Your trusted source for premium firearms, ammunition, and accessories. 
                <br />
                <span className="theme-text-tertiary">Shop with confidence and enjoy secure, compliant transactions.</span>
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-none border theme-border">
                  <Link
                    href="/products"
                    className="w-full flex items-center justify-center px-8 py-3 border theme-border text-base font-medium theme-text theme-bg hover:theme-hover md:py-4 md:text-lg md:px-10 transition-all duration-300 font-mono font-bold"
                  >
                    [SHOP_FIREARMS]
                  </Link>
                </div>
              </div>
            </div>
          </div>        </div>

        {/* Banner Slider */}
        <div className="py-8">
          <BannerSlider />
        </div>

        {/* Featured Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold theme-text text-center mb-8 font-mono">
            [FEATURED_CATEGORIES]
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'HANDGUNS', description: 'Reliable pistols and revolvers for personal defense and sport.', color: 'theme-border' },
              { name: 'RIFLES', description: 'Precision rifles for hunting, sport, and tactical use.', color: 'theme-border-secondary' },
              { name: 'AMMUNITION', description: 'Quality ammo for all your firearms.', color: 'theme-border' },
            ].map((category) => (
              <div key={category.name} className={`border ${category.color} theme-bg p-6 theme-text hover:theme-hover transition-all duration-300 font-mono`}>
                <h3 className="text-xl font-semibold mb-2">[{category.name}]</h3>
                <p className="mb-4 theme-text-secondary">{category.description}</p>
                <Link href={`/products?category=${category.name.toLowerCase()}`} className="theme-text underline hover:theme-text-secondary transition-colors font-mono">
                  [EXPLORE] →
                </Link>
              </div>
            ))}          </div>
        </div>

        {/* Kill Count Leaderboard */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <KillLeaderboard />
        </div>

              {/* Certified Users Reviews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold theme-text text-center mb-8 font-mono">
          [CERTIFIED_USERS]
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll space-x-6">
                          {duplicatedReviews.map((user, index) => (
                <div key={index} className="flex-shrink-0 w-80 theme-bg border theme-border p-6 rounded-none font-mono relative overflow-hidden">
                  {user.image && (
                    <div 
                      className="absolute inset-0 z-0"
                      style={{
                        backgroundImage: `url(${user.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(3px)',
                        opacity: 0.6
                      }}
                    />
                  )}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-gray-800/70 px-1 py-0.5 rounded">
                        <h3 className="text-lg font-semibold theme-text">[{user.name}]</h3>
                      </div>
                      {user.verified && (
                        <div className="bg-gray-800/70 px-1 py-0.5 rounded">
                          <span className="text-xs theme-text-tertiary">[VERIFIED]</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center mb-3">
                      {renderStars(user.rating)}
                      <span className="ml-2 text-sm theme-text-secondary">({user.rating}/5)</span>
                    </div>
                    <div className="bg-gray-800/70 px-2 py-1 rounded">
                      <p className="theme-text-secondary text-sm leading-relaxed">
                        "{user.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>        </div>
      </div>

        {/* System Status */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="border theme-border theme-bg p-6">
            <h3 className="theme-text font-mono font-bold mb-4">[SYSTEM_STATUS]</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono">
              <div className="theme-text-tertiary">● SERVER: ONLINE</div>
              <div className="theme-text-tertiary">● DATABASE: SECURE</div>
              <div className="theme-text-tertiary">● PAYMENT: ENCRYPTED</div>
            </div>
          </div>
        </div>        {/* Professional Footer */}
        <footer className="theme-bg border-t theme-border/30">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              
              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold theme-text font-mono">[COMPANY_INFO]</h3>
                <div className="space-y-2 text-sm theme-text-secondary font-mono">
                  <Link href="/about" className="block hover:theme-text transition-colors">
                    [ABOUT_US]
                  </Link>
                  <Link href="/contact" className="block hover:theme-text transition-colors">
                    [CONTACT_US]
                  </Link>
                  <Link href="/careers" className="block hover:theme-text transition-colors">
                    [CAREERS]
                  </Link>
                  <Link href="/news" className="block hover:theme-text transition-colors">
                    [NEWS_&_ARTICLES]
                  </Link>
                </div>
              </div>

              {/* Customer Support */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold theme-text font-mono">[CUSTOMER_SUPPORT]</h3>
                <div className="space-y-2 text-sm theme-text-secondary font-mono">
                  <Link href="/faq" className="block hover:theme-text transition-colors">
                    [FAQ]
                  </Link>
                  <Link href="/shipping" className="block hover:theme-text transition-colors">
                    [SHIPPING_INFO]
                  </Link>
                  <Link href="/returns" className="block hover:theme-text transition-colors">
                    [RETURNS_&_EXCHANGES]
                  </Link>
                  <Link href="/support" className="block hover:theme-text transition-colors">
                    [TECHNICAL_SUPPORT]
                  </Link>
                </div>
              </div>

              {/* Legal & Policies */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold theme-text font-mono">[LEGAL_&_POLICIES]</h3>
                <div className="space-y-2 text-sm theme-text-secondary font-mono">
                  <Link href="/privacy" className="block hover:theme-text transition-colors">
                    [PRIVACY_POLICY]
                  </Link>
                  <Link href="/terms" className="block hover:theme-text transition-colors">
                    [TERMS_OF_SERVICE]
                  </Link>
                  <Link href="/compliance" className="block hover:theme-text transition-colors">
                    [FIREARMS_COMPLIANCE]
                  </Link>
                  <Link href="/licensing" className="block hover:theme-text transition-colors">
                    [LICENSING_INFO]
                  </Link>
                </div>
              </div>

              {/* Connect & Follow */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold theme-text font-mono">[CONNECT_&_FOLLOW]</h3>
                
                {/* Social Media Links */}
                <div className="space-y-3">
                  <div className="flex space-x-4">
                    <a href="#" className="theme-text-secondary hover:theme-text transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>                    <a href="#" className="theme-text-secondary hover:theme-text transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="#" className="theme-text-secondary hover:theme-text transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>                    <a href="#" className="theme-text-secondary hover:theme-text transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </div>
                  
                  {/* Newsletter Signup */}
                  <div className="space-y-2">
                    <p className="text-xs theme-text-tertiary font-mono">[NEWSLETTER_SIGNUP]</p>
                    <div className="flex">
                      <input 
                        type="email" 
                        placeholder="your@email.com"
                        className="flex-1 px-3 py-2 text-xs theme-bg border theme-border theme-text font-mono focus:outline-none focus:ring-1 focus:ring-theme-accent"
                      />
                      <button className="px-3 py-2 theme-accent hover:theme-hover text-theme-hover-text text-xs font-mono border-l-0 transition-colors">
                        [SUBSCRIBE]
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t theme-border/30 pt-6">
              <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                
                {/* Copyright */}
                <div className="text-center lg:text-left">
                  <p className="text-sm theme-text font-mono">
                    &copy; 2025 TopGuns_Firearms.exe | [SECURE_CONNECTION]
                  </p>
                  <p className="text-xs theme-text-tertiary font-mono mt-1">
                    Please comply with all local, state, and federal laws when purchasing firearms.
                  </p>
                </div>

                {/* Payment Methods */}
                <div className="flex flex-col items-center lg:items-end space-y-2">
                  <p className="text-xs theme-text-tertiary font-mono">[SECURE_PAYMENT_METHODS]</p>
                  <div className="flex space-x-2">
                    {/* Visa */}
                    <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    {/* Mastercard */}
                    <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MC</span>
                    </div>
                    {/* American Express */}
                    <div className="w-8 h-5 bg-blue-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AMEX</span>
                    </div>
                    {/* Discover */}
                    <div className="w-8 h-5 bg-orange-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">DISC</span>
                    </div>
                    {/* PayPal */}
                    <div className="w-8 h-5 bg-blue-700 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">PP</span>
                    </div>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="flex flex-col items-center lg:items-end space-y-2">
                  <p className="text-xs theme-text-tertiary font-mono">[SECURITY_&_CERTIFICATIONS]</p>
                  <div className="flex space-x-2 text-xs theme-text-tertiary font-mono">
                    <span>[SSL_SECURED]</span>
                    <span>•</span>
                    <span>[AES-256_ENCRYPTED]</span>
                    <span>•</span>
                    <span>[PCI_COMPLIANT]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 