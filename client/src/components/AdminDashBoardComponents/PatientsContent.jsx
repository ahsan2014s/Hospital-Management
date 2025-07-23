import React from 'react';
import PatientCard from './patients/PatientCard';

const PatientsContent = ({ patients }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <PatientCard key={patient._id} patient={patient} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientsContent;