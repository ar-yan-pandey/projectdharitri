'use client';

import { useState } from 'react';
import CustomImage from './CustomImage';

type NewsCardProps = {
  title: string;
  category: string;
  content: string;
  imageUrl: string;
  createdAt: string;
};

export default function NewsCard({ title, category, content, imageUrl, createdAt }: NewsCardProps) {
  const [imageError, setImageError] = useState(false);

  const fallbackImage = '/images/placeholder.jpg'; // Make sure to add a placeholder image

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full bg-gray-100">
        <CustomImage
          src={imageError ? fallbackImage : imageUrl}
          alt={title}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {category}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 line-clamp-3">{content}</p>
      </div>
    </div>
  );
}
