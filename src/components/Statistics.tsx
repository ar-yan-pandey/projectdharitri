'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FiUsers, FiDroplet, FiHeart, FiAlertCircle } from 'react-icons/fi';

interface Stats {
  totalCows: number;
  avgMilkProduction: number;
  healthyCows: number;
  sickCows: number;
}

export default function Statistics() {
  const [stats, setStats] = useState<Stats>({
    totalCows: 0,
    avgMilkProduction: 0,
    healthyCows: 0,
    sickCows: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch cows data
      const { data: cows } = await supabase
        .from('cows')
        .select('*')
        .eq('user_id', user.id);

      if (!cows) return;

      // Calculate statistics
      const totalCows = cows.length;
      const healthyCows = cows.filter(cow => cow.health_status === 'Healthy').length;
      const sickCows = totalCows - healthyCows;
      const avgMilkProduction = cows.reduce((acc, cow) => acc + parseFloat(cow.milk_production), 0) / totalCows;

      setStats({
        totalCows,
        avgMilkProduction,
        healthyCows,
        sickCows,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Farm Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm font-medium text-blue-600">Total</div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalCows}</h3>
          <p className="text-sm text-gray-500">Total Cows</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <FiDroplet className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-sm font-medium text-emerald-600">Production</div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {stats.avgMilkProduction.toFixed(1)} L
          </h3>
          <p className="text-sm text-gray-500">Average Daily Production</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FiHeart className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm font-medium text-green-600">Healthy</div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.healthyCows}</h3>
          <p className="text-sm text-gray-500">Healthy Cows</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FiAlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-sm font-medium text-red-600">Attention Needed</div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.sickCows}</h3>
          <p className="text-sm text-gray-500">Sick Cows</p>
        </div>
      </div>
    </div>
  );
}
