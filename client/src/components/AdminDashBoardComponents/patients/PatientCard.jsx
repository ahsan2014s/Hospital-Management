import React from 'react';

const PatientCard = ({ patient }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
          <p className="text-sm text-gray-600">ID: {patient.patientId}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          patient.status === 'admitted' ? 'bg-green-100 text-green-800' :
          patient.status === 'discharged' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {patient.status}
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Age:</span>
          <span className="text-gray-900">{new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Gender:</span>
          <span className="text-gray-900 capitalize">{patient.gender}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Phone:</span>
          <span className="text-gray-900">{patient.phone}</span>
        </div>
        {patient.roomNumber && (
          <div className="flex justify-between">
            <span className="text-gray-600">Room:</span>
            <span className="text-gray-900">{patient.roomNumber}</span>
          </div>
        )}
        <div className="pt-2 border-t border-gray-200">
          <span className="text-gray-600 text-xs">Emergency Contact:</span>
          <p className="text-gray-900 text-sm">{patient.emergencyContact.name} ({patient.emergencyContact.relation})</p>
          <p className="text-gray-600 text-xs">{patient.emergencyContact.phone}</p>
        </div>
        {patient.allergies && patient.allergies.length > 0 && (
          <div className="pt-2">
            <span className="text-red-600 text-xs font-medium">Allergies:</span>
            <p className="text-red-700 text-sm">{patient.allergies.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientCard;