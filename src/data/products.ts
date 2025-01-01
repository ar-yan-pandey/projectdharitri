export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'feed' | 'supplements' | 'healthcare' | 'equipment';
  image?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Cattle Feed',
    description: 'High-quality balanced nutrition for optimal cattle health and growth.',
    price: 1200,
    category: 'feed'
  },
  {
    id: '2',
    name: 'Mineral Supplement Mix',
    description: 'Essential minerals and vitamins for cattle development.',
    price: 800,
    category: 'supplements'
  },
  {
    id: '3',
    name: 'Cattle First Aid Kit',
    description: 'Complete medical kit for emergency cattle care.',
    price: 2500,
    category: 'healthcare'
  },
  {
    id: '4',
    name: 'Automatic Water Dispenser',
    description: 'Modern solution for consistent water supply.',
    price: 3500,
    category: 'equipment'
  },
  {
    id: '5',
    name: 'Protein-Rich Feed Mix',
    description: 'Special feed mix for enhanced milk production.',
    price: 1500,
    category: 'feed'
  },
  {
    id: '6',
    name: 'Calcium Booster',
    description: 'Calcium supplement for stronger bones and better milk quality.',
    price: 600,
    category: 'supplements'
  },
  {
    id: '7',
    name: 'Digital Thermometer',
    description: 'Quick and accurate temperature measurement.',
    price: 1200,
    category: 'healthcare'
  },
  {
    id: '8',
    name: 'Automated Feed Dispenser',
    description: 'Smart feeding solution for consistent nutrition.',
    price: 4500,
    category: 'equipment'
  },
  {
    id: '9',
    name: 'Grass Feed Mix',
    description: 'Natural grass-based feed for healthy digestion.',
    price: 1100,
    category: 'feed'
  }
];

export const categories = [
  { id: 'feed', name: 'Feed' },
  { id: 'supplements', name: 'Supplements' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'equipment', name: 'Equipment' }
] as const;
