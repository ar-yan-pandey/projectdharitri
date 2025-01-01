import React from 'react';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VolunteerModal: React.FC<VolunteerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Volunteer With Us</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold text-blue-900">Coming Soon!</span>
            </div>
            <p className="text-blue-800">
              We are currently working on our volunteer program and will be opening applications shortly.
            </p>
          </div>

          <p className="text-gray-600">
            Our volunteer program will provide opportunities to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Work directly with our veterinary teams</li>
            <li>Support farmer education initiatives</li>
            <li>Help with community outreach programs</li>
            <li>Assist in organizing healthcare camps</li>
          </ul>

          <div className="bg-gray-50 rounded-lg p-4 mt-4">
            <p className="text-gray-700">
              Want to be notified when we start accepting volunteers? Follow us on our social media channels for updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerModal;
