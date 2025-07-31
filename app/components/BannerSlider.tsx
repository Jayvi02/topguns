'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  textPosition: 'left' | 'center' | 'right';
}

const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    title: '[TACTICAL_SUPERIORITY]',
    subtitle: 'Premium Military-Grade Arsenal',
    description: 'Discover our elite collection of tactical firearms and accessories. Built for professionals who demand excellence.',
    buttonText: '[EXPLORE_ARSENAL]',
    buttonLink: '/products?category=tactical',
    backgroundImage: '/images/guns/AR-15 Tactical Rifle.webp',
    textPosition: 'center'
  },
  {
    id: 2,
    title: '[PRECISION_MASTERS]',
    subtitle: 'Long-Range Sniper Systems',
    description: 'Engineered for accuracy. Our precision rifles deliver unmatched performance for long-range operations.',
    buttonText: '[VIEW_SNIPERS]',
    buttonLink: '/products?category=rifles',
    backgroundImage: '/images/guns/Remington 700.jpg',
    textPosition: 'center'
  },
  {
    id: 3,
    title: '[CONCEALED_PROTECTION]',
    subtitle: 'Compact Defense Solutions',
    description: 'Reliable, compact firearms for personal protection. Trusted by professionals worldwide.',
    buttonText: '[SHOP_HANDGUNS]',
    buttonLink: '/products?category=handguns',
    backgroundImage: '/images/guns/Glock 19 Gen 5.jpeg',
    textPosition: 'center'
  },
  {
    id: 4,
    title: '[AMMUNITION_DEPOT]',
    subtitle: 'Premium Grade Ammunition',
    description: 'High-quality ammunition for training, sport, and professional use. Every shot counts.',
    buttonText: '[STOCK_AMMO]',
    buttonLink: '/products?category=ammunition',
    backgroundImage: '/images/guns/9mm FMJ Ammunition.jpg',
    textPosition: 'center'
  }
];

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getTextAlignment = (position: string) => {
    switch (position) {
      case 'left': return 'text-left items-start';
      case 'right': return 'text-right items-end';
      case 'center': return 'text-center items-center';
      default: return 'text-left items-start';
    }
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(1px)'
              }}
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <div className={`max-w-4xl mx-auto flex flex-col ${getTextAlignment(slide.textPosition)}`}>
                <h1 className="text-4xl md:text-6xl font-extrabold theme-text font-mono mb-4 tracking-wider">
                  {slide.title}
                </h1>
                
                <h2 className="text-xl md:text-2xl theme-text-secondary font-mono mb-6">
                  {slide.subtitle}
                </h2>
                
                <p className="text-base md:text-lg theme-text max-w-2xl mb-8 font-mono leading-relaxed">
                  {slide.description}
                </p>
                
                <div className="flex space-x-4">
                  <Link
                    href={slide.buttonLink}
                    className="px-8 py-3 theme-accent hover:theme-hover text-theme-hover-text border theme-border font-mono font-bold transition-all duration-300 hover:scale-105 transform hover:shadow-lg hover:shadow-theme-accent/25"
                  >
                    {slide.buttonText}
                  </Link>
                  <Link
                    href="/products"
                    className="px-8 py-3 border theme-border theme-text hover:theme-text-secondary font-mono transition-all duration-300 hover:scale-105 transform"
                  >
                    [VIEW_ALL]
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 theme-bg/80 backdrop-blur-sm border theme-border theme-text hover:theme-text-secondary transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 theme-bg/80 backdrop-blur-sm border theme-border theme-text hover:theme-text-secondary transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 border transition-all duration-300 ${
                index === currentSlide
                  ? 'theme-accent border-theme-accent'
                  : 'bg-white/30 border-white/50 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
