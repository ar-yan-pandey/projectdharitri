'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FiCalendar, FiActivity, FiAlertCircle } from 'react-icons/fi';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'vaccination' | 'checkup';
  cowId?: number;
  cowName: string;
  description?: string;
  allDay?: boolean;
}

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch cows data
      const { data: cows } = await supabase
        .from('cows')
        .select('*')
        .eq('user_id', user.id);

      if (!cows) return;

      const calendarEvents: Event[] = [];

      // Add vaccination events
      cows.forEach(cow => {
        if (cow.next_vaccination) {
          calendarEvents.push({
            id: `vac-${cow.id}`,
            title: `Vaccination: ${cow.name}`,
            start: new Date(cow.next_vaccination),
            end: new Date(cow.next_vaccination),
            type: 'vaccination',
            cowId: cow.id,
            cowName: cow.name,
            description: `Scheduled vaccination for ${cow.name}`,
            allDay: true,
          });
        }

        // Add last checkup as a past event
        if (cow.last_checkup) {
          calendarEvents.push({
            id: `check-${cow.id}-last`,
            title: `Last Checkup: ${cow.name}`,
            start: new Date(cow.last_checkup),
            end: new Date(cow.last_checkup),
            type: 'checkup',
            cowId: cow.id,
            cowName: cow.name,
            description: `Last health checkup for ${cow.name}`,
            allDay: true,
          });
        }

        // Add next checkup event (3 months from last checkup)
        if (cow.last_checkup) {
          const lastCheckup = new Date(cow.last_checkup);
          const nextCheckup = new Date(lastCheckup);
          nextCheckup.setMonth(nextCheckup.getMonth() + 3);

          calendarEvents.push({
            id: `check-${cow.id}-next`,
            title: `Next Checkup Due: ${cow.name}`,
            start: nextCheckup,
            end: nextCheckup,
            type: 'checkup',
            cowId: cow.id,
            cowName: cow.name,
            description: `Scheduled health checkup for ${cow.name}`,
            allDay: true,
          });
        }
      });

      setEvents(calendarEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const eventStyleGetter = (event: Event) => {
    let backgroundColor = '#10B981'; // Default color
    let style: React.CSSProperties = {
      backgroundColor,
      borderRadius: '4px',
      opacity: 1,
      color: 'white',
      border: 'none',
      display: 'block',
    };

    switch (event.type) {
      case 'vaccination':
        style.backgroundColor = '#3B82F6'; // Blue
        break;
      case 'checkup':
        if (event.title.includes('Last')) {
          style.backgroundColor = '#6B7280'; // Gray for past checkups
        } else {
          style.backgroundColor = '#F59E0B'; // Yellow for upcoming checkups
        }
        break;
    }

    return { style };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Farm Calendar</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Vaccinations</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Upcoming Checkups</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Past Checkups</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div style={{ height: '700px' }}>
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter}
            onSelectEvent={(event) => setSelectedEvent(event as Event)}
            views={['month', 'week', 'day']}
            defaultView="month"
            selectable
            popup
          />
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              {selectedEvent.type === 'vaccination' ? (
                <FiActivity className="w-6 h-6 text-blue-500" />
              ) : (
                <FiAlertCircle className="w-6 h-6 text-yellow-500" />
              )}
              <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
            </div>
            <div className="space-y-3">
              <p className="text-gray-600">
                <span className="font-medium">Date:</span>{' '}
                {format(selectedEvent.start, 'PPP')}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Cow:</span>{' '}
                {selectedEvent.cowName}
              </p>
              {selectedEvent.description && (
                <p className="text-gray-600">
                  <span className="font-medium">Details:</span>{' '}
                  {selectedEvent.description}
                </p>
              )}
            </div>
            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-6 w-full bg-emerald-600 text-white rounded-lg px-4 py-2 hover:bg-emerald-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
