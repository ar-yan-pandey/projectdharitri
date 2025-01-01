'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        setNews(data || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [supabase]);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Updates</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Stay informed about our latest initiatives, success stories, and community impact</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse transform transition-all duration-300">
                <div className="h-64 bg-gray-200" />
                <div className="p-8">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
                  <div className="h-8 bg-gray-200 rounded mb-4" />
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Updates</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Stay informed about our latest initiatives, success stories, and community impact</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Link 
              key={item.id} 
              href={`/news/${item.id}`}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.image_url || '/images/default-news.jpg'}
                  alt={item.title}
                  fill
                  className="object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-8">
                <div className="flex items-center text-sm text-green-600 mb-4">
                  <FiCalendar className="mr-2" />
                  {new Date(item.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {item.content}
                </p>
                <div className="flex items-center text-green-600 font-medium">
                  Read More 
                  <FiArrowRight className="ml-2 transform transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/news" 
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors group"
          >
            View All Updates
            <FiArrowRight className="ml-2 transform transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
