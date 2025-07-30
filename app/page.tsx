'use client';

import Link from 'next/link';
import Navigation from './components/Navigation';

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
              <div className="mb-4">
                <span className="theme-text font-mono text-sm">root@topguns:~$</span>
              </div>
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
          </div>
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
            ))}
          </div>
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
          </div>
        </div>
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
        </div>

        {/* Footer */}
        <footer className="theme-bg border-t theme-border/30">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center theme-text font-mono">
              <p>&copy; 2024 TopGuns_Firearms.exe | [SECURE_CONNECTION] | Please comply with all local, state, and federal laws when purchasing firearms.</p>
              <div className="mt-2 theme-text-tertiary text-xs">
                [ENCRYPTION: AES-256] [SSL: ENABLED] [PRIVACY: PROTECTED]
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 