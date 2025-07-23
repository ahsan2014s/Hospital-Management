// MobileNavigation.jsx
import React, { useState } from 'react';
import { User, ChevronDown, ChevronUp } from 'lucide-react';

const MobileNavigation = ({
  nurseData,
  activeTab,
  selectedPatient,
  onNavigateToOverview,
  onNavigateToPatient
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      {/* Navigation Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={toggleExpansion}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {nurseData.firstName}
            </h2>
            <p className="text-sm text-gray-600">
              {activeTab === 'overview' 
                ? 'Overview' 
                : selectedPatient 
                  ? `${selectedPatient.firstName} ${selectedPatient.lastName}`
                  : 'Select Patient'
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {nurseData.assignedPatients?.length || 0} patients
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </div>

      {/* Expandable Navigation Content */}
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50">
          {/* Overview Button */}
          <button
            onClick={() => {
              onNavigateToOverview();
              setIsExpanded(false);
            }}
            className={`w-full text-left p-4 border-b border-gray-100 transition-colors ${
              activeTab === 'overview'
                ? 'bg-blue-50 border-l-4 border-l-blue-500'
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="font-medium text-gray-800">Nurse Overview</div>
            <div className="text-sm text-gray-600 mt-1">
              View all assigned patients
            </div>
          </button>

          {/* Patients List */}
          <div className="max-h-64 overflow-y-auto">
            <div className="p-2 bg-gray-100 border-b">
              <h3 className="text-sm font-medium text-gray-700">
                Assigned Patients ({nurseData.assignedPatients?.length || 0})
              </h3>
            </div>
            
            {nurseData.assignedPatients?.map(patient => (
              <button
                key={patient._id}
                onClick={() => {
                  onNavigateToPatient(patient);
                  setIsExpanded(false);
                }}
                className={`w-full text-left p-3 border-b border-gray-100 transition-colors ${
                  selectedPatient?._id === patient._id
                    ? 'bg-blue-50 border-l-4 border-l-blue-500'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-800">
                      {patient.firstName} {patient.lastName}
                    </div>
                    <div className="text-sm text-gray-600">
                      Room {patient.room}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {patient.medications.length} medications • {patient.assignedDoctors.length} doctors
                    </div>
                  </div>
                  {selectedPatient?._id === patient._id && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;