'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaUserMd, FaBoxOpen, FaHeadset, FaDatabase } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import NewsSlider from '../components/NewsSlider';
import FeaturedProducts from '../components/FeaturedProducts';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import LatestNews from '../components/LatestNews';

const stats = [
  { id: 1, value: 10000, suffix: '+', key: 'farmers', label: 'Happy Farmers', icon: '👨‍🌾' },
  { id: 2, value: 500, suffix: '+', key: 'vets', label: 'Expert Vets', icon: '👨‍⚕️' },
  { id: 3, value: 1000, suffix: '+', key: 'products', label: 'Products', icon: '📦' },
  { id: 4, value: 15, suffix: '+', key: 'states', label: 'States Covered', icon: '🗺️' },
];

const features = [
  {
    id: 1,
    icon: <FaUserMd className="w-6 h-6" />,
    key: 'Expert Veterinarians'
  },
  {
    id: 2,
    icon: <FaBoxOpen className="w-6 h-6" />,
    key: 'Quality Products'
  },
  {
    id: 3,
    icon: <FaHeadset className="w-6 h-6" />,
    key: '24/7 Support'
  },
  {
    id: 4,
    icon: <FaDatabase className="w-6 h-6" />,
    key: 'Digital Records'
  }
];

export default function Home() {
  const { translations } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/healthy-cow.jpg"
            alt="Background Cow"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-8" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold">
              {translations?.home?.hero?.title || 'Complete Cow Healthcare Solution'}
            </h1>
            <p className="text-xl md:text-2xl">
              {translations?.home?.hero?.subtitle || 'Empowering farmers with modern healthcare solutions for their cattle'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              {/* My Cows Button */}
              <Link href="/auth" className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-primary transition-all duration-300 ease-in-out bg-white rounded-xl hover:bg-gray-50 shadow-lg hover:shadow-xl hover:-translate-y-1">
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-xl opacity-30 bg-gradient-to-b from-black/5 to-transparent"></span>
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
                {translations?.home?.myCowsButton || 'My Cows'}
              </Link>

              {/* Vets Button */}
              <Link href="/vets" className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-emerald-600/90 to-emerald-600 rounded-xl hover:from-emerald-600 hover:to-emerald-600/90 hover:-translate-y-1">
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-xl opacity-30 bg-gradient-to-b from-white/20 to-transparent"></span>
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {translations?.home?.vetsButton || 'Find Vets'}
              </Link>

              {/* Products Button */}
              <Link href="/products" className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-emerald-600 transition-all duration-300 ease-in-out bg-white rounded-xl hover:bg-gray-50 shadow-lg hover:shadow-xl hover:-translate-y-1">
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-xl opacity-30 bg-gradient-to-b from-black/5 to-transparent"></span>
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {translations?.home?.productsButton || 'Products'}
              </Link>

              {/* Donate Button */}
              <Link href="/donate" className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-primary/90 to-primary rounded-xl hover:from-primary hover:to-primary/90 hover:-translate-y-1">
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-xl opacity-30 bg-gradient-to-b from-white/20 to-transparent"></span>
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {translations?.home?.donateButton || 'Donate Now'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Latest News Section */}
      <LatestNews />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {translations?.home?.features?.title || 'Why Choose Dharitri'}
            </h2>
            <p className="text-xl text-gray-600">
              {translations?.home?.features?.subtitle || 'Comprehensive solutions for your cattle\'s well-being'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const translatedFeature = translations?.home?.features?.items?.[index];
              return (
                <div
                  key={feature.id}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="text-green-600 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {translatedFeature?.title || feature.key}
                  </h3>
                  <p className="text-gray-600">
                    {translatedFeature?.description || ''}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-emerald-50 to-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 4px 4px, #10b981 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}/>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
            {stats.map((stat, index) => {
              const { ref, inView } = useInView({
                threshold: 0.3,
                triggerOnce: true
              });

              return (
                <div
                  key={stat.id}
                  ref={ref}
                  className="relative group"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <div className="relative p-8 text-center transform transition-all duration-300 hover:scale-105">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 bg-white rounded-2xl shadow-xl bg-opacity-70 backdrop-blur-sm border border-emerald-100/50 transition-all duration-300 group-hover:shadow-2xl group-hover:bg-opacity-90" />
                    
                    {/* Content */}
                    <div className="relative">
                      <div className="text-4xl mb-3">{stat.icon}</div>
                      <div className="flex items-center justify-center space-x-1">
                        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                          {inView && (
                            <CountUp
                              start={0}
                              end={stat.value}
                              duration={2.5}
                              separator=","
                              suffix={stat.suffix}
                              useEasing={true}
                            />
                          )}
                        </div>
                      </div>
                      <div className="mt-2 text-sm md:text-base font-medium text-gray-600">
                        {translations?.home?.stats?.[stat.key] || stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
