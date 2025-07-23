import React from 'react';
import { User, ChevronRight } from 'lucide-react';
import { useColorHelpers } from '../../hooks/useColorHelpers';

const NextPatients = ({ waitingPatients, setActiveTab }) => {
  const { getPriorityColor } = useColorHelpers();

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Next Patients</h2>
        <button 
          onClick={() => setActiveTab('waiting-list')}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          View all <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="space-y-3">
        {waitingPatients.slice(0, 3).map((patient) => (
          <div key={patient.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{patient.name}</p>
              <p className="text-sm text-gray-600">{patient.reason}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(patient.priority)}`}>
                  {patient.priority}
                </span>
                <span className="text-xs text-gray-500">Wait: {patient.waitTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextPatients;