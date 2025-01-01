'use client';

import { useState } from 'react';
import DonateModal from '../../components/DonateModal';
import ShareModal from '../../components/ShareModal';
import VolunteerModal from '../../components/VolunteerModal';

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

  const handleDonateClick = (amount: number) => {
    setSelectedAmount(amount);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Support Our Cause</h1>
        
        <div className="prose max-w-none">
          <div className="mb-12 text-center">
            <p className="text-xl text-gray-600 mb-6">
              Your donation helps us continue our mission of improving cow healthcare and supporting farmers across the region.
              Every contribution makes a difference in ensuring better health and care for cattle.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">How Your Donation Helps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Healthcare Support</h3>
                </div>
                <p className="text-gray-600">
                  Provides essential medical care and vaccinations for cows in need
                </p>
              </div>
              
              <div className="card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Farmer Education</h3>
                </div>
                <p className="text-gray-600">
                  Supports training programs and workshops for farmers
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Choose Your Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                className="card text-center hover:border-green-500 cursor-pointer border-2 border-transparent transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleDonateClick(500)}
              >
                <h3 className="text-xl font-semibold mb-2">Basic Care</h3>
                <div className="text-3xl font-bold text-green-600 mb-4">₹500</div>
                <p className="text-gray-600 mb-4">Provides basic medical care for one cow</p>
                <button className="btn-secondary w-full">Select</button>
              </div>

              <div 
                className="card text-center hover:border-green-500 cursor-pointer border-2 border-green-500 transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleDonateClick(1000)}
              >
                <div className="absolute top-0 right-0 -mt-2 -mr-2">
                  <span className="bg-green-500 text-white px-2 py-1 text-sm rounded">Popular</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Extended Care</h3>
                <div className="text-3xl font-bold text-green-600 mb-4">₹1000</div>
                <p className="text-gray-600 mb-4">Provides extended care and vaccinations</p>
                <button className="btn-primary w-full">Select</button>
              </div>

              <div 
                className="card text-center hover:border-green-500 cursor-pointer border-2 border-transparent transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleDonateClick(2000)}
              >
                <h3 className="text-xl font-semibold mb-2">Complete Care</h3>
                <div className="text-3xl font-bold text-green-600 mb-4">₹2000</div>
                <p className="text-gray-600 mb-4">Provides complete healthcare package</p>
                <button className="btn-secondary w-full">Select</button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Other Ways to Help</h2>
            <p className="text-gray-600 mb-6">
              Can't donate? You can still help by spreading the word about our cause
              or volunteering your time and expertise.
            </p>
            <div className="flex justify-center gap-4">
              <button className="btn-secondary" onClick={() => setIsShareModalOpen(true)}>Share</button>
              <button className="btn-secondary" onClick={() => setIsVolunteerModalOpen(true)}>Volunteer</button>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      {selectedAmount && (
        <DonateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          amount={selectedAmount}
        />
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Volunteer Modal */}
      <VolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />
    </div>
  );
}
