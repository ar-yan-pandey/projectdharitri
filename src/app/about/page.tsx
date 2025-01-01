import TeamSection from '../../components/TeamSection';
import Link from 'next/link';

export default function AboutPage() {
  const team = [
    {
      name: 'Soham Dey',
      role: 'Lead Actionist',
      image: '/team/placeholder.png'
    },
    {
      name: 'Palak Karn',
      role: 'Actionist',
      image: '/team/placeholder.png'
    },
    {
      name: 'Suparna Raha',
      role: 'Actionist',
      image: '/team/placeholder.png'
    },
    {
      name: 'Sudip Debnath',
      role: 'Actionist',
      image: '/team/placeholder.png'
    },
    {
      name: 'Paree Bagla',
      role: 'Actionist',
      image: '/team/placeholder.png'
    },
    {
      name: 'Aryan Raj',
      role: 'Actionist',
      image: '/team/placeholder.png'
    },
    {
      name: 'Sagnik Sarkar',
      role: 'Actionist',
      image: '/team/placeholder.png'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-800">About Dharitri</h1>
        
        <div className="prose max-w-none space-y-12">
          <div className="p-6 rounded-lg bg-gradient-to-br from-green-50/50 to-white">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              Dharitri is dedicated to revolutionizing cow healthcare by providing a comprehensive platform
              that connects farmers with quality products, expert veterinarians, and essential information.
              Our goal is to ensure that every cow receives the best possible care, leading to improved
              health outcomes and enhanced productivity for farmers.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">What We Offer</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Comprehensive information about cow health and management</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Access to verified healthcare products and supplements</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Connection with certified veterinarians</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Digital tools for tracking cow health and maintenance</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-lg bg-gradient-to-br from-green-50/50 to-white">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-green-50 rounded-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
                <div className="text-gray-600">Farmers Helped</div>
              </div>
              <div className="p-6 bg-green-50 rounded-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-gray-600">Verified Vets</div>
              </div>
              <div className="p-6 bg-green-50 rounded-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">5000+</div>
                <div className="text-gray-600">Cows Tracked</div>
              </div>
            </div>
          </div>

          <TeamSection />
        </div>
      </div>
    </div>
  );
}
