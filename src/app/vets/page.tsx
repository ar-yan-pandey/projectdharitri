'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiMapPin, FiPhone } from 'react-icons/fi';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { Vet } from '@/types/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

export default function VetsPage() {
  const [vets, setVets] = useState<Vet[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [specialization, setSpecialization] = useState('All Specializations');

  useEffect(() => {
    fetchVets();
  }, []);

  const fetchVets = async () => {
    const { data, error } = await supabase
      .from('vets')
      .select('*');

    if (error) {
      console.error('Error fetching vets:', error);
      return;
    }

    if (data) {
      setVets(data);
    }
  };

  const filteredVets = vets.filter((vet) => {
    const matchesSearch = 
      vet.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vet.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vet.speciality.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialization = 
      specialization === 'All Specializations' ||
      vet.speciality === specialization;

    return matchesSearch && matchesSpecialization;
  });

  const specializations = ['All Specializations', ...new Set(vets.map(vet => vet.speciality))];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find a Veterinarian</h1>
          <p className="text-xl text-gray-600">
            Connect with experienced veterinarians specializing in cattle care
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Search by name, location, or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="block w-full md:w-64 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVets.map((vet) => (
            <div 
              key={vet.id} 
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Card Header with Image and Basic Info */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={vet.image_url || '/placeholder-vet.jpg'}
                  alt={vet.full_name}
                  fill
                  className="object-cover object-[center_25%] transform group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold drop-shadow-md">{vet.full_name}</h2>
                    <p className="text-green-400 font-medium drop-shadow-md">{vet.speciality}</p>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${
                          star <= vet.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    {vet.rating.toFixed(1)} rating
                  </span>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700 hover:text-gray-900 transition-colors">
                    <FiMapPin className="h-5 w-5 text-green-500 mr-3" />
                    <span>{vet.city}, {vet.state}</span>
                  </div>
                  <div className="flex items-center text-gray-700 hover:text-gray-900 transition-colors">
                    <FiPhone className="h-5 w-5 text-green-500 mr-3" />
                    <a href={`tel:${vet.phone_number}`} className="hover:underline">
                      {vet.phone_number}
                    </a>
                  </div>
                </div>

                {/* Book Appointment Button */}
                <button
                  onClick={() => window.location.href = `tel:${vet.phone_number}`}
                  className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl 
                           font-medium hover:from-green-600 hover:to-green-700 transform hover:-translate-y-0.5 
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 
                           focus:ring-offset-2 shadow-lg hover:shadow-xl"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
