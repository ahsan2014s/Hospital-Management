import React from 'react';
import { Pill } from 'lucide-react';

const MedicationsList = ({ medications }) => {
  const getMedicationStatus = (nextDue) => {
    const isDue = new Date(`2024-07-20 ${nextDue}`) <= new Date();
    return {
      className: isDue 
        ? 'bg-red-100 text-red-800' 
        : 'bg-green-100 text-green-800',
      label: `Due: ${nextDue}`
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Pill className="w-5 h-5 mr-2" />
        Current Medications
      </h3>
      <div className="space-y-3">
        {medications.map(medication => {
          const status = getMedicationStatus(medication.nextDue);
          
          return (
            <div key={medication._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{medication.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
                  {status.label}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Dosage</p>
                  <p className="font-medium">{medication.dosage}</p>
                </div>
                <div>
                  <p className="text-gray-500">Frequency</p>
                  <p className="font-medium">{medication.frequency}</p>
                </div>
                <div>
                  <p className="text-gray-500">Route</p>
                  <p className="font-medium">{medication.route}</p>
                </div>
                <div>
                  <p className="text-gray-500">Next Due</p>
                  <p className="font-medium">{medication.nextDue}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MedicationsList;