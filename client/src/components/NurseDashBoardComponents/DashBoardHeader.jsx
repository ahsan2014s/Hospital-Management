import React from 'react';
import { Calendar } from 'lucide-react';

const DashboardHeader = ({ activeTab, selectedPatient, nurseData }) => {
  const getTitle = () => {
    if (activeTab === 'overview') {
      return 'Dashboard Overview';
    }
    return `${selectedPatient?.firstName} ${selectedPatient?.lastName}`;
  };

  const getSubtitle = () => {
    if (activeTab === 'overview') {
      return `${new Date().toLocaleDateString()} • ${nurseData.shift}`;
    }
    return `Room ${selectedPatient?.room} • ${selectedPatient?.condition}`;
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{getTitle()}</h2>
          <p className="text-gray-600 mt-1">{getSubtitle()}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700">{new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;