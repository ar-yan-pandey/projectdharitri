'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface AddCowModalProps {
  onClose: () => void;
  onAdd: (data: any) => void;
}

const AddCowModal: React.FC<AddCowModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    weight: '',
    milk_production: '',
    health_status: 'Healthy',
    last_checkup: '',
    next_vaccination: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Add New Cow</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
              Breed
            </label>
            <input
              type="text"
              id="breed"
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="text"
              id="age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="milk_production" className="block text-sm font-medium text-gray-700">
              Milk Production (L/day)
            </label>
            <input
              type="number"
              id="milk_production"
              value={formData.milk_production}
              onChange={(e) => setFormData({ ...formData, milk_production: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="health_status" className="block text-sm font-medium text-gray-700">
              Health Status
            </label>
            <select
              id="health_status"
              value={formData.health_status}
              onChange={(e) => setFormData({ ...formData, health_status: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            >
              <option value="Healthy">Healthy</option>
              <option value="Sick">Sick</option>
              <option value="Under Observation">Under Observation</option>
            </select>
          </div>

          <div>
            <label htmlFor="last_checkup" className="block text-sm font-medium text-gray-700">
              Last Checkup Date
            </label>
            <input
              type="date"
              id="last_checkup"
              value={formData.last_checkup}
              onChange={(e) => setFormData({ ...formData, last_checkup: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="next_vaccination" className="block text-sm font-medium text-gray-700">
              Next Vaccination Date
            </label>
            <input
              type="date"
              id="next_vaccination"
              value={formData.next_vaccination}
              onChange={(e) => setFormData({ ...formData, next_vaccination: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Add Cow
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCowModal;
