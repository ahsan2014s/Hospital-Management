import React from 'react';
import { Pill } from 'lucide-react';

const CurrentMedications = ({ medications }) => {
  return (
    <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Current Medications</h2>
      <div className="space-y-4">
        {medications && medications.length > 0 ? medications.map((med, index) => (
          <div key={index} className="p-3 md:p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div className="flex items-start space-x-3">
              <Pill className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{med.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Frequency: {med.frequency}</p>
                <p className="text-sm text-blue-600 mt-1">Next dose: {med.nextDose}</p>
                {med.prescribedBy && (
                  <p className="text-sm text-gray-600 mt-1">Prescribed by: {med.prescribedBy}</p>
                )}
                {med.instructions && (
                  <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">
                    Instructions: {med.instructions}
                  </p>
                )}
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center text-gray-500 py-8">
            <Pill className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p>No current medications found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentMedications;