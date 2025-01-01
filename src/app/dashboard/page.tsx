'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import AddCowModal from '../../components/AddCowModal';
import Statistics from '../../components/Statistics';
import Calendar from '../../components/Calendar';
import CowList from '../../components/CowList';
import ProductManagement from '../../components/ProductManagement';
import { FiPlus, FiUser, FiLogOut } from 'react-icons/fi';

export default function Dashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('cows');
  const [cows, setCows] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // Effect to check auth and admin status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth');
        return;
      }
      setUserEmail(user.email || '');
      checkAdminStatus(user.id);
      fetchCows();
    };

    checkAuth();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error checking admin status:', error);
        return;
      }

      setIsAdmin(data?.role === 'admin');
    } catch (error) {
      console.error('Error in checkAdminStatus:', error);
    }
  };

  const handleAddCow = async (cowData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('cows')
        .insert({
          ...cowData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      setShowAddModal(false);
      await fetchCows();
    } catch (error) {
      console.error('Error adding cow:', error);
      alert('Failed to add cow. Please try again.');
    }
  };

  const fetchCows = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('No user found in fetchCows');
        return;
      }

      const { data, error } = await supabase
        .from('cows')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCows(data || []);
    } catch (error) {
      console.error('Error in fetchCows:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/auth');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-6">
          {/* User Profile Bar */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Welcome back,</p>
                  <p className="font-medium text-gray-900">{userEmail || 'Loading...'}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-full hover:bg-gray-100"
                title="Logout"
              >
                <FiLogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage your dairy farm efficiently
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <FiPlus className="mr-2 h-5 w-5" />
                  Add New Cow
                </button>
              </div>

              <div className="mt-6">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('cows')}
                    className={`py-4 px-6 text-sm font-medium ${
                      activeTab === 'cows'
                        ? 'border-b-2 border-emerald-500 text-emerald-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Cows
                  </button>
                  <button
                    onClick={() => setActiveTab('calendar')}
                    className={`py-4 px-6 text-sm font-medium ${
                      activeTab === 'calendar'
                        ? 'border-b-2 border-emerald-500 text-emerald-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Calendar
                  </button>
                </nav>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <Statistics />
                {activeTab === 'cows' ? (
                  <CowList cows={cows} onCowsUpdate={fetchCows} />
                ) : (
                  <Calendar />
                )}
              </div>
            </div>
          </div>

          {/* Product Management Section (Admin Only) */}
          {isAdmin && <ProductManagement />}
        </div>
      </div>

      {showAddModal && (
        <AddCowModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddCow}
        />
      )}
    </div>
  );
}
