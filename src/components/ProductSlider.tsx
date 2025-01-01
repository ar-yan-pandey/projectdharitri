'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const products = [
  {
    id: 1,
    name: 'Premium Cattle Feed',
    description: 'High-quality nutritious feed for optimal health and milk production',
    image: '/images/product1.jpg',
    price: '₹1,200'
  },
  {
    id: 2,
    name: 'Health Supplements',
    description: 'Essential vitamins and minerals for cattle wellness',
    image: '/images/product2.jpg',
    price: '₹800'
  },
  {
    id: 3,
    name: 'Cattle Care Kit',
    description: 'Complete kit for basic cattle healthcare and maintenance',
    image: '/images/product3.jpg',
    price: '₹2,500'
  },
  {
    id: 4,
    name: 'Milking Equipment',
    description: 'Modern milking equipment for efficient dairy operations',
    image: '/images/product4.jpg',
    price: '₹15,000'
  }
];

export default function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { translations } = useLanguage();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const visibleProducts = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % products.length;
      items.push(products[index]);
    }
    return items;
  };

  return (
    <div className="relative py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {translations?.products?.featured || 'Featured Products'}
        </h2>
        
        <div className="relative">
          <div className="flex justify-between items-center gap-8">
            {visibleProducts().map((product) => (
              <div
                key={product.id}
                className="flex-1 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  <p className="text-2xl font-bold text-primary mb-4">{product.price}</p>
                  <Link href="/products" className="btn-primary inline-block w-full text-center">
                    {translations?.products?.viewDetails || 'View Details'}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <IoChevronBack className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <IoChevronForward className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
