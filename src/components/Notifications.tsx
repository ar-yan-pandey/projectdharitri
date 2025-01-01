'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FiBell, FiCheckCircle, FiAlertCircle, FiCalendar } from 'react-icons/fi';
import { format } from 'date-fns';

interface Notification {
  id: string;
  type: 'vaccination' | 'checkup' | 'health' | 'production';
  title: string;
  message: string;
  date: string;
  read: boolean;
  cowId?: number;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch cows data for generating notifications
      const { data: cows } = await supabase
        .from('cows')
        .select('*')
        .eq('user_id', user.id);

      if (!cows) return;

      const currentDate = new Date('2025-01-01T02:27:41+05:30');
      const notificationsList: Notification[] = [];

      // Check for upcoming vaccinations (within 7 days)
      cows.forEach(cow => {
        if (cow.next_vaccination) {
          const vaccinationDate = new Date(cow.next_vaccination);
          const daysDiff = Math.ceil((vaccinationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

          if (daysDiff <= 7 && daysDiff >= 0) {
            notificationsList.push({
              id: `vac-${cow.id}`,
              type: 'vaccination',
              title: 'Upcoming Vaccination',
              message: `${cow.name} is due for vaccination in ${daysDiff} days`,
              date: currentDate.toISOString(),
              read: false,
              cowId: cow.id,
            });
          }
        }
      });

      // Check for health status
      cows.forEach(cow => {
        if (cow.health_status === 'Sick') {
          notificationsList.push({
            id: `health-${cow.id}`,
            type: 'health',
            title: 'Health Alert',
            message: `${cow.name} is marked as sick and needs attention`,
            date: currentDate.toISOString(),
            read: false,
            cowId: cow.id,
          });
        }
      });

      // Check for low milk production
      cows.forEach(cow => {
        const production = parseFloat(cow.milk_production);
        if (production < 15) { // Threshold for low production
          notificationsList.push({
            id: `prod-${cow.id}`,
            type: 'production',
            title: 'Low Production Alert',
            message: `${cow.name}'s milk production is below average (${production}L/day)`,
            date: currentDate.toISOString(),
            read: false,
            cowId: cow.id,
          });
        }
      });

      setNotifications(notificationsList.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'vaccination':
        return <FiCalendar className="w-5 h-5 text-blue-500" />;
      case 'health':
        return <FiAlertCircle className="w-5 h-5 text-red-500" />;
      case 'production':
        return <FiCheckCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <FiBell className="w-5 h-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
      >
        <FiBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-2 px-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-4 px-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-emerald-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="ml-3 w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {format(new Date(notification.date), 'PPp')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
