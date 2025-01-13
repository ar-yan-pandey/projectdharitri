'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

const SDGSection = () => {
  const { translations } = useLanguage();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          {translations?.sdg?.title || 'Sustainable Development Goals'}
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          {translations?.sdg?.description || 'Project Dharitri contributes to the following UN Sustainable Development Goals:'}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* SDG 15 */}
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              <Image
                src="https://cdn-images-1.medium.com/max/1600/1*7MDLuoSaJjS-q5tZ_vJbVA.png"
                alt="SDG 15 - Life on Land"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">SDG 15: Life on Land</h3>
            <p className="text-gray-600 text-center">
              {translations?.sdg?.sdg15Description || 
                'Protecting, restoring and promoting sustainable use of terrestrial ecosystems through our cow protection and care initiatives.'}
            </p>
          </div>

          {/* SDG 9 */}
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              <Image
                src="https://th.bing.com/th/id/OIP.jOlPMG0KVj5j7wgGzqR9SwHaHa?rs=1&pid=ImgDetMain"
                alt="SDG 9 - Industry, Innovation and Infrastructure"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">SDG 9: Industry, Innovation and Infrastructure</h3>
            <p className="text-gray-600 text-center">
              {translations?.sdg?.sdg9Description || 
                'Building resilient infrastructure and fostering innovation through sustainable agricultural practices and modern gaushala management.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SDGSection;
