import React from 'react';
import { User } from 'lucide-react';

const Sidebar = ({ 
  nurseData, 
  activeTab, 
  selectedPatient, 
  onNavigateToOverview, 
  onNavigateToPatient 
}) => {
  return (
    <div className="w-80 bg-white shadow-lg overflow-y-auto">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800">Nurse Dashboard</h1>
        <p className="text-gray-600">Welcome, {nurseData.firstName}</p>
      </div>
      
      <nav className="p-4">
        <button
          onClick={onNavigateToOverview}
          className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
            activeTab === 'overview' 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <User className="w-4 h-4 inline mr-2" />
          Nurse Overview
        </button>
        
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Assigned Patients ({nurseData.assignedPatients.length})
          </h3>
          {nurseData.assignedPatients.map(patient => (
            <button
              key={patient._id}
              onClick={() => onNavigateToPatient(patient)}
              className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                selectedPatient?._id === patient._id 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="font-medium">{patient.firstName} {patient.lastName}</div>
              <div className="text-sm opacity-75">Room {patient.room}</div>
              <div className="text-xs opacity-60 mt-1">
                {patient.medications.length} medications • {patient.assignedDoctors.length} doctors
              </div>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;