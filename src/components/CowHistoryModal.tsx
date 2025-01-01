import React from 'react';

interface CowHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  cowData: {
    name: string;
    checkupHistory: {
      date: string;
      notes?: string;
    }[];
    vaccinationHistory: {
      date: string;
      vaccine?: string;
    }[];
  };
}

const CowHistoryModal: React.FC<CowHistoryModalProps> = ({ isOpen, onClose, cowData }) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Medical History - {cowData.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Checkup History */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Checkup History
            </h3>
            {cowData.checkupHistory.length > 0 ? (
              <div className="space-y-3">
                {cowData.checkupHistory.map((checkup, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {formatDate(checkup.date)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {index === 0 ? 'Latest' : `${index + 1} checkups ago`}
                      </span>
                    </div>
                    {checkup.notes && (
                      <p className="mt-1 text-sm text-gray-600">{checkup.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No checkup history available</p>
            )}
          </div>

          {/* Vaccination History */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Vaccination History
            </h3>
            {cowData.vaccinationHistory.length > 0 ? (
              <div className="space-y-3">
                {cowData.vaccinationHistory.map((vaccination, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {formatDate(vaccination.date)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {index === 0 ? 'Latest' : `${index + 1} vaccinations ago`}
                      </span>
                    </div>
                    {vaccination.vaccine && (
                      <p className="mt-1 text-sm text-gray-600">{vaccination.vaccine}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No vaccination history available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CowHistoryModal;
