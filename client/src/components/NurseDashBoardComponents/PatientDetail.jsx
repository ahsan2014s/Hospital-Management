import React from 'react';
import InfoCard from './InfoCard';
import DoctorsList from './DoctorsList';
import MedicationsList from './MedicationsList';

const PatientDetail = ({ patient }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {patient.firstName} {patient.lastName}
            </h2>
            <p className="text-gray-600">Room {patient.room} • Age {patient.age}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Admitted</p>
            <p className="font-semibold">{new Date(patient.admissionDate).toLocaleDateString()}</p>
          </div>
        </div>
        
        <InfoCard
          title="Current Condition"
          value={patient.condition}
          colorScheme="yellow"
          size="medium"
        />
      </div>

      <DoctorsList doctors={patient.assignedDoctors} />
      <MedicationsList medications={patient.medications} />
    </div>
  );
};

export default PatientDetail;