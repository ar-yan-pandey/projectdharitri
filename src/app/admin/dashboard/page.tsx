'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabase';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  totalUsers: number;
  totalDonations: number;
  totalAmount: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalDonations: 0,
    totalAmount: 0
  });

  useEffect(() => {
    checkUser();
  }, [router]);

  const checkUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      if (user) {
        // Check if user is admin
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        if (!profile || profile.role !== 'admin') {
          router.push('/dashboard');
          return;
        }

        setUser(user);
        fetchStats();
      } else {
        router.push('/auth');
      }
    } catch (error) {
      console.error('Error loading user:', error);
      router.push('/auth');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Fetch total users
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch donations stats
      const { data: donations } = await supabase
        .from('donations')
        .select('amount');

      const totalDonations = donations?.length || 0;
      const totalAmount = donations?.reduce((sum, donation) => sum + donation.amount, 0) || 0;

      setStats({
        totalUsers: usersCount || 0,
        totalDonations,
        totalAmount
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-gray-500">Welcome back, {user?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
            <p className="mt-2 text-3xl font-bold text-primary">{stats.totalUsers}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Donations</h3>
            <p className="mt-2 text-3xl font-bold text-primary">{stats.totalDonations}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Amount</h3>
            <p className="mt-2 text-3xl font-bold text-primary">₹{stats.totalAmount.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button
                onClick={() => router.push('/admin/users')}
                className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Manage Users
              </button>
              <button
                onClick={() => router.push('/admin/donations')}
                className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                View Donations
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <p className="text-gray-500">Coming soon...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
