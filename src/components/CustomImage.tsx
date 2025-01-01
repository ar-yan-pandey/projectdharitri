'use client';

import Image from 'next/image';
import { useState } from 'react';

type CustomImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
};

export default function CustomImage({ src, alt, className, fill, sizes }: CustomImageProps) {
  const [error, setError] = useState(false);

  // Check if the URL is external
  const isExternal = src?.startsWith('http') || src?.startsWith('https');

  if (error || !src || src.toLowerCase() === 'none') {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <svg 
          className="w-16 h-16 text-gray-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    );
  }

  if (isExternal) {
    // For external images, use a regular img tag
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setError(true)}
        style={fill ? { objectFit: 'cover', width: '100%', height: '100%' } : undefined}
      />
    );
  }

  // For internal images, use Next.js Image component
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      sizes={sizes}
      onError={() => setError(true)}
    />
  );
}
