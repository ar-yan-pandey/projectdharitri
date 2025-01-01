'use client';

import { useState } from 'react';
import AddCowModal from '../../components/AddCowModal';
import UpdateCowModal from '../../components/UpdateCowModal';
import CowHistoryModal from '../../components/CowHistoryModal';

const cows = [
  {
    id: 1,
    name: 'Lakshmi',
    breed: 'Gir',
    age: '4 years',
    lastCheckup: '2023-12-15',
    weight: '450 kg',
    milkProduction: '18 L/day',
    nextVaccination: '2024-01-15',
    healthStatus: 'Healthy',
    checkupHistory: [
      { date: '2023-12-15', notes: 'Regular checkup - All parameters normal' },
      { date: '2023-11-15', notes: 'Routine health inspection - Good condition' },
      { date: '2023-10-15', notes: 'Monthly checkup - Slight cold, prescribed medication' }
    ],
    vaccinationHistory: [
      { date: '2023-09-15', vaccine: 'FMD Vaccination' },
      { date: '2023-06-15', vaccine: 'Brucellosis Vaccination' },
      { date: '2023-03-15', vaccine: 'HS Vaccination' }
    ]
  },
  {
    id: 2,
    name: 'Nandini',
    breed: 'Sahiwal',
    age: '3 years',
    lastCheckup: '2023-12-20',
    weight: '420 kg',
    milkProduction: '15 L/day',
    nextVaccination: '2024-01-20',
    healthStatus: 'Healthy',
    checkupHistory: [
      { date: '2023-12-20', notes: 'Regular checkup - All parameters normal' },
      { date: '2023-11-20', notes: 'Monthly inspection - Healthy' }
    ],
    vaccinationHistory: [
      { date: '2023-10-20', vaccine: 'FMD Vaccination' },
      { date: '2023-07-20', vaccine: 'Brucellosis Vaccination' }
    ]
  },
  {
    id: 3,
    name: 'Gauri',
    breed: 'Red Sindhi',
    age: '5 years',
    lastCheckup: '2023-12-10',
    weight: '480 kg',
    milkProduction: '20 L/day',
    nextVaccination: '2024-01-10',
    healthStatus: 'Under Medication',
    checkupHistory: [
      { date: '2023-12-10', notes: 'Emergency checkup - Fever and reduced appetite' },
      { date: '2023-11-10', notes: 'Regular checkup - All parameters normal' },
      { date: '2023-10-10', notes: 'Monthly inspection - Healthy' }
    ],
    vaccinationHistory: [
      { date: '2023-08-10', vaccine: 'FMD Vaccination' },
      { date: '2023-05-10', vaccine: 'Brucellosis Vaccination' },
      { date: '2023-02-10', vaccine: 'HS Vaccination' }
    ]
  }
];

export default function MyCowsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedCow, setSelectedCow] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddCow = (cowData: any) => {
    // Here you would typically make an API call to save the cow data
    console.log('New cow data:', cowData);
    // For now, we'll just log the data
    // You can implement the actual data saving logic later
  };

  const handleUpdateCow = (cowData: any) => {
    // Here you would typically make an API call to update the cow data
    console.log('Updated cow data:', cowData);
    // For now, we'll just log the data
    // You can implement the actual data updating logic later
  };

  const handleUpdateClick = (cow: any) => {
    setSelectedCow(cow);
    setIsUpdateModalOpen(true);
  };

  const handleHistoryClick = (cow: any) => {
    setSelectedCow(cow);
    setIsHistoryModalOpen(true);
  };

  const filteredCows = cows.filter(cow => 
    cow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cow.breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Cows</h1>
              <p className="mt-1 text-gray-500">Manage and monitor your cattle</p>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary flex items-center gap-2 self-start md:self-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Cow
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Cows Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCows.map((cow) => (
            <div 
              key={cow.id} 
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="relative h-48 bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-20 h-20 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                  </svg>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{cow.name}</h2>
                    <p className="text-gray-500">{cow.breed}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    cow.healthStatus === 'Healthy' 
                      ? 'bg-green-50 text-green-700 ring-1 ring-green-600/10'
                      : 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/10'
                  }`}>
                    {cow.healthStatus}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium text-gray-900">{cow.age}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="font-medium text-gray-900">{cow.weight}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Milk Production</p>
                    <p className="font-medium text-gray-900">{cow.milkProduction}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Last Checkup</p>
                      <p className="font-medium text-gray-900">{cow.lastCheckup}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Next Vaccination</p>
                      <p className="font-medium text-red-600">{cow.nextVaccination}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button 
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => handleHistoryClick(cow)}
                  >
                    View History
                  </button>
                  <button 
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                    onClick={() => handleUpdateClick(cow)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCows.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No cows found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ? 'Try different search terms' : 'Get started by adding a new cow'}
            </p>
          </div>
        )}
      </div>

      {/* Add Cow Modal */}
      <AddCowModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCow}
      />

      {/* Update Cow Modal */}
      {selectedCow && (
        <UpdateCowModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onSubmit={handleUpdateCow}
          cowData={selectedCow}
        />
      )}

      {/* History Modal */}
      {selectedCow && (
        <CowHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
          cowData={selectedCow}
        />
      )}
    </div>
  );
}
