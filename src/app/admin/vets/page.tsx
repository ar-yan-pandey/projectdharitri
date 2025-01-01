'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabase';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import Image from 'next/image';

type Vet = {
  id: string;
  full_name: string;
  speciality: string;
  state: string;
  city: string;
  phone_number: string;
  image_url: string;
  availability: {
    [key: string]: { start: string | null; end: string | null };
  };
  rating: number;
  created_at: string;
  updated_at: string;
};

interface VetFormData {
  full_name: string;
  speciality: string;
  state: string;
  city: string;
  phone_number: string;
  image_url: string;
  availability: {
    [key: string]: { start: string | null; end: string | null };
  };
  rating: number;
}

const defaultAvailability = {
  monday: { start: "09:00", end: "18:00" },
  tuesday: { start: "09:00", end: "18:00" },
  wednesday: { start: "09:00", end: "18:00" },
  thursday: { start: "09:00", end: "18:00" },
  friday: { start: "09:00", end: "18:00" },
  saturday: { start: "09:00", end: "18:00" },
  sunday: { start: null, end: null }
};

export default function VetsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [vets, setVets] = useState<Vet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVet, setSelectedVet] = useState<Vet | null>(null);
  const [formData, setFormData] = useState<VetFormData>({
    full_name: '',
    speciality: '',
    state: '',
    city: '',
    phone_number: '',
    image_url: '',
    availability: defaultAvailability,
    rating: 5.0
  });

  useEffect(() => {
    checkUserAndFetchVets();
  }, []);

  const checkUserAndFetchVets = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (!user) {
        router.push('/auth');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!profile || profile.role !== 'admin') {
        router.push('/dashboard');
        return;
      }

      setUser(user);
      await fetchVets();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load vets');
    }
  };

  const fetchVets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setVets(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch vets');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      full_name: '',
      speciality: '',
      state: '',
      city: '',
      phone_number: '',
      image_url: '',
      availability: defaultAvailability,
      rating: 5.0
    });
    setSelectedVet(null);
  };

  const handleEditVet = async () => {
    if (!selectedVet) return;

    try {
      if (!formData.full_name || !formData.speciality) {
        toast.error('Name and speciality are required');
        return;
      }

      const updates = {
        full_name: formData.full_name.trim(),
        speciality: formData.speciality.trim(),
        state: formData.state.trim(),
        city: formData.city.trim(),
        phone_number: formData.phone_number.trim(),
        image_url: formData.image_url.trim() || null,
        availability: formData.availability,
        rating: formData.rating
      };

      const { error } = await supabase
        .from('vets')
        .update(updates)
        .eq('id', selectedVet.id)
        .select();

      if (error) throw error;

      toast.success('Vet updated successfully');
      setIsEditModalOpen(false);
      resetForm();
      await fetchVets();
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to update vet');
    }
  };

  const handleDeleteVet = async () => {
    if (!selectedVet) return;

    try {
      const { error } = await supabase
        .from('vets')
        .delete()
        .eq('id', selectedVet.id);

      if (error) throw error;

      toast.success('Vet deleted successfully');
      setIsDeleteModalOpen(false);
      setSelectedVet(null);
      await fetchVets();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete vet');
    }
  };

  const handleCreateVet = async () => {
    try {
      if (!formData.full_name || !formData.speciality) {
        toast.error('Name and speciality are required');
        return;
      }

      const { error } = await supabase
        .from('vets')
        .insert([{
          full_name: formData.full_name.trim(),
          speciality: formData.speciality.trim(),
          state: formData.state.trim(),
          city: formData.city.trim(),
          phone_number: formData.phone_number.trim(),
          image_url: formData.image_url.trim() || null,
          availability: formData.availability,
          rating: formData.rating
        }]);

      if (error) throw error;

      toast.success('Vet created successfully');
      setIsCreateModalOpen(false);
      resetForm();
      await fetchVets();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create vet');
    }
  };

  const openEditModal = (vet: Vet) => {
    setSelectedVet(vet);
    setFormData({
      full_name: vet.full_name,
      speciality: vet.speciality,
      state: vet.state,
      city: vet.city,
      phone_number: vet.phone_number,
      image_url: vet.image_url || '',
      availability: vet.availability,
      rating: vet.rating
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (vet: Vet) => {
    setSelectedVet(vet);
    setIsDeleteModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Manage Veterinarians</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            <FiPlus /> Add New Vet
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vet</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vets.map((vet) => (
                  <tr key={vet.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <Image
                            src={vet.image_url || '/placeholder.jpg'}
                            alt={vet.full_name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{vet.full_name}</div>
                          <div className="text-sm text-green-600">{vet.speciality}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vet.phone_number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vet.city}, {vet.state}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${
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
                        <span className="ml-2 text-sm text-gray-600">{vet.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(vet)}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        <FiEdit2 className="inline-block w-5 h-5" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(vet)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="inline-block w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-2xl font-bold mb-6">Add New Veterinarian</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Speciality"
                  value={formData.speciality}
                  onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Rating"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateVet}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-2xl font-bold mb-6">Edit Veterinarian</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Speciality"
                  value={formData.speciality}
                  onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Rating"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditVet}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Delete Veterinarian</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {selectedVet?.full_name}? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteVet}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
