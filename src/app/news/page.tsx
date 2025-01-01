'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type News = {
  id: string;
  title: string;
  image_url: string;
  category: string;
  content: string;
  created_at: string;
};

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [imageError, setImageError] = useState(false);

  const categories = ['All', 'Healthcare', 'Feed', 'Management', 'Events'];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error: any) {
      console.error('Error fetching news:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = news.filter(
    item => selectedCategory === 'All' || item.category === selectedCategory
  );

  const featuredNews = news[0]; // Latest news as featured
  const remainingNews = news.slice(1);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section with Latest News */}
        {featuredNews && (
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative h-[500px] rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedNews(featuredNews)}
            >
              <Image
                src={featuredNews.image_url}
                alt={featuredNews.title}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="inline-block px-4 py-2 bg-green-500 rounded-full text-sm font-medium mb-4">
                  {featuredNews.category}
                </span>
                <h1 className="text-4xl font-bold mb-4 group-hover:text-green-400 transition-colors">
                  {featuredNews.title}
                </h1>
                <p className="text-gray-200 text-lg mb-2 line-clamp-2">
                  {featuredNews.content}
                </p>
                <p className="text-gray-400">
                  {new Date(featuredNews.created_at).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* Categories Filter */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                ${selectedCategory === category
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => setSelectedNews(item)}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={() => setImageError(true)}
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full mb-3">
                  {item.category}
                </span>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
                <p className="text-gray-600 line-clamp-2">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* News Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedNews(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-80">
                <Image
                  src={selectedNews.image_url}
                  alt={selectedNews.title}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <span className="inline-block px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full mb-4">
                  {selectedNews.category}
                </span>
                <h2 className="text-3xl font-bold mb-2">{selectedNews.title}</h2>
                <p className="text-gray-500 text-sm mb-6">
                  {new Date(selectedNews.created_at).toLocaleDateString()}
                </p>
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">{selectedNews.content}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
