'use client';

import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

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

interface UpdateCowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cowData: any) => void;
  cow: Cow | null;
}

type UpdateField = 
  | 'age'
  | 'weight'
  | 'milk_production'
  | 'health_status'
  | 'last_checkup'
  | 'next_vaccination'
  | null;

const fieldLabels: Record<UpdateField & string, string> = {
  age: 'Age',
  weight: 'Weight',
  milk_production: 'Milk Production',
  health_status: 'Health Status',
  last_checkup: 'Last Checkup Date',
  next_vaccination: 'Next Vaccination Date'
};

const UpdateCowModal: React.FC<UpdateCowModalProps> = ({ isOpen, onClose, onSubmit, cow }) => {
  const [selectedField, setSelectedField] = useState<UpdateField>(null);
  const [newValue, setNewValue] = useState('');
  const [error, setError] = useState('');

  const validateInput = (field: string, value: string): boolean => {
    if (!value.trim()) {
      setError('This field cannot be empty');
      return false;
    }

    switch (field) {
      case 'age':
        // Allow just numbers or numbers with units
        if (!value.match(/^\d+(\.\d+)?(\s*(years?|months?|days?))?$/i)) {
          setError('Please enter a valid age (e.g., "2" or "2 years")');
          return false;
        }
        break;
      case 'weight':
        // Allow just numbers or numbers with units
        if (!value.match(/^\d+(\.\d+)?(\s*(kg|pounds?|lbs?)?)?$/i)) {
          setError('Please enter a valid weight (e.g., "450" or "450 kg")');
          return false;
        }
        break;
      case 'milk_production':
        // Allow just numbers or numbers with units
        if (!value.match(/^\d+(\.\d+)?(\s*(L\/day|liters?\/day)?)?$/i)) {
          setError('Please enter valid milk production (e.g., "15" or "15 L/day")');
          return false;
        }
        break;
      case 'health_status':
        if (!['Healthy', 'Under Medication', 'Sick'].includes(value)) {
          setError('Please select a valid health status');
          return false;
        }
        break;
      case 'last_checkup':
      case 'next_vaccination':
        if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) {
          setError('Please select a valid date');
          return false;
        }
        break;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedField || !cow) return;

    if (!validateInput(selectedField, newValue)) {
      return;
    }

    console.log('Submitting update:', selectedField, newValue);

    // Only pass the id and the field being updated
    const updateData = {
      id: cow.id,
      [selectedField]: newValue.trim()
    };

    console.log('Update data:', updateData);
    await onSubmit(updateData);
    onClose();
  };

  const renderFieldInput = () => {
    if (!selectedField) return null;

    switch (selectedField) {
      case 'health_status':
        return (
          <select
            value={newValue}
            onChange={(e) => {
              setNewValue(e.target.value);
              setError('');
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select status</option>
            <option value="Healthy">Healthy</option>
            <option value="Under Medication">Under Medication</option>
            <option value="Sick">Sick</option>
          </select>
        );
      case 'last_checkup':
      case 'next_vaccination':
        return (
          <input
            type="date"
            value={newValue}
            onChange={(e) => {
              setNewValue(e.target.value);
              setError('');
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        );
      default:
        return (
          <input
            type="text"
            value={newValue}
            onChange={(e) => {
              setNewValue(e.target.value);
              setError('');
            }}
            placeholder={getPlaceholder(selectedField)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        );
    }
  };

  const getPlaceholder = (field: string): string => {
    switch (field) {
      case 'age':
        return 'e.g., 2 years';
      case 'weight':
        return 'e.g., 450 kg';
      case 'milk_production':
        return 'e.g., 15 L/day';
      default:
        return `Enter new ${fieldLabels[field]}`;
    }
  };

  if (!isOpen || !cow) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Update {cow.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {!selectedField ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">What would you like to update?</p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(fieldLabels).map(([field, label]) => (
                <button
                  key={field}
                  onClick={() => {
                    setSelectedField(field as UpdateField);
                    setNewValue(cow[field as keyof Cow]?.toString() || '');
                    setError('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {fieldLabels[selectedField]}
              </label>
              {renderFieldInput()}
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedField(null);
                  setError('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Back
              </button>
              <div className="space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateCowModal;
