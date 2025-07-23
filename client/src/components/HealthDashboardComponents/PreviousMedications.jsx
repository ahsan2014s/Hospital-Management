import React from 'react';
import { ClipboardList, Clock } from 'lucide-react';

const PreviousMedications = ({ medications }) => {
  return (
    <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Previous Medications</h2>
      <div className="space-y-4">
        {medications && medications.length > 0 ? medications.map((med, index) => (
          <div key={index} className="p-3 md:p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex items-start space-x-3">
              <ClipboardList className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 truncate">{med.name}</h3>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mt-1">Duration: {med.duration}</p>
                <p className="text-sm text-gray-600 mt-1">Reason: {med.reason}</p>
                {med.prescribedBy && (
                  <p className="text-sm text-gray-500 mt-1">Prescribed by: {med.prescribedBy}</p>
                )}
                {med.completedDate && (
                  <p className="text-sm text-gray-500 mt-1">Completed: {med.completedDate}</p>
                )}
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center text-gray-500 py-8">
            <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p>No previous medications found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousMedications;