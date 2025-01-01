'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const newsItems = [
  {
    id: 1,
    title: 'New Vaccination Guidelines Released',
    date: 'December 30, 2023',
    excerpt: 'Updated vaccination schedules and recommendations for dairy cattle have been released by the National Dairy Association.',
  },
  {
    id: 2,
    title: 'Breakthrough in Cattle Feed Technology',
    date: 'December 28, 2023',
    excerpt: 'Scientists develop new feed supplement that improves milk production and cow health significantly.',
  },
  {
    id: 3,
    title: 'Government Launches Farmer Support Program',
    date: 'December 25, 2023',
    excerpt: 'New initiative provides financial assistance to dairy farmers for modernizing their facilities.',
  }
];

export default function NewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { translations } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {translations.latestNews || 'Latest News'}
        </h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-6 mx-12"
            >
              <div className="text-sm text-gray-500 mb-2">{newsItems[currentIndex].date}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {newsItems[currentIndex].title}
              </h3>
              <p className="text-gray-600">{newsItems[currentIndex].excerpt}</p>
              <Link 
                href="/news" 
                className="inline-block mt-4 text-green-600 hover:text-green-800 font-medium"
              >
                {translations.readMore || 'Read More'} →
              </Link>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
          >
            <FaChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
          >
            <FaChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
