'use client';

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import UpdateCowModal from './UpdateCowModal';
import { FiEdit2, FiTrash2, FiDroplet, FiActivity, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Cow {
  id: number;
  name: string;
  breed: string;
  age: string;
  weight: string;
  milk_production: string;
  health_status: string;
  last_checkup: string | null;
  next_vaccination: string | null;
}

interface CowListProps {
  cows: Cow[];
  onCowsUpdate: () => void;
}

const CowList: React.FC<CowListProps> = ({ cows, onCowsUpdate }) => {
  const [selectedCow, setSelectedCow] = useState<Cow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateCow = async (cowData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('No user found');
        return;
      }

      const { id, ...updateData } = cowData;
      console.log('Updating cow:', id);
      console.log('With data:', updateData);

      const cleanedData = Object.fromEntries(
        Object.entries(updateData).filter(([_, v]) => v != null && v !== '')
      );

      const { error: updateError } = await supabase
        .from('cows')
        .update(cleanedData)
        .eq('id', id)
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setIsModalOpen(false);
      setSelectedCow(null);
      await onCowsUpdate();
    } catch (error: any) {
      console.error('Error updating cow:', error);
      alert(error?.message || 'Failed to update cow. Please try again.');
    }
  };

  const handleDeleteCow = async (cowId: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('cows')
        .delete()
        .eq('id', cowId)
        .eq('user_id', user.id);

      if (error) throw error;
      onCowsUpdate();
    } catch (error) {
      console.error('Error deleting cow:', error);
      alert('Failed to delete cow. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cows.map((cow) => (
          <motion.div
            key={cow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{cow.name}</h3>
                  <p className="text-sm text-gray-500">{cow.breed}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedCow(cow);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this cow?')) {
                        handleDeleteCow(cow.id);
                      }
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center text-gray-600">
                    <FiActivity className="w-4 h-4 mr-2" />
                    <span className="text-sm">Age</span>
                  </div>
                  <p className="text-gray-900 font-medium">{cow.age}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-gray-600">
                    <FiActivity className="w-4 h-4 mr-2" />
                    <span className="text-sm">Weight</span>
                  </div>
                  <p className="text-gray-900 font-medium">{cow.weight}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-gray-600">
                    <FiDroplet className="w-4 h-4 mr-2" />
                    <span className="text-sm">Milk Production</span>
                  </div>
                  <p className="text-gray-900 font-medium">{cow.milk_production}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-gray-600">
                    <FiActivity className="w-4 h-4 mr-2" />
                    <span className="text-sm">Health</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cow.health_status === 'Healthy'
                        ? 'bg-green-100 text-green-800'
                        : cow.health_status === 'Sick'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {cow.health_status}
                  </span>
                </div>
              </div>

              {/* Dates Section */}
              {(cow.last_checkup || cow.next_vaccination) && (
                <div className="border-t pt-4 space-y-2">
                  {cow.last_checkup && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FiCalendar className="w-4 h-4 mr-2" />
                      <span>Last Checkup: {new Date(cow.last_checkup).toLocaleDateString()}</span>
                    </div>
                  )}
                  {cow.next_vaccination && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FiCalendar className="w-4 h-4 mr-2" />
                      <span>Next Vaccination: {new Date(cow.next_vaccination).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && selectedCow && (
        <UpdateCowModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCow(null);
          }}
          onSubmit={handleUpdateCow}
          cow={selectedCow}
        />
      )}
    </div>
  );
};

export default CowList;
