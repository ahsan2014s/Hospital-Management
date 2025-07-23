import React from 'react';
import { User } from 'lucide-react';
import InfoCard from './InfoCard';
import ContactInfo from './ContactInfo';

const NurseOverview = ({ nurseData }) => {
  const getMedicationsDue = () => {
    return nurseData.assignedPatients.reduce((total, patient) => 
      total + patient.medications.filter(med => 
        new Date(`2024-07-20 ${med.nextDue}`) <= new Date(`2024-07-20 ${new Date().getHours()}:${new Date().getMinutes()}`)
      ).length, 0
    );
  };

  const getActiveDoctors = () => {
    return new Set(nurseData.assignedPatients.flatMap(p => p.assignedDoctors.map(d => d.doctorId))).size;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {nurseData.firstName} {nurseData.lastName}
            </h2>
            <p className="text-gray-600">{nurseData.department} • {nurseData.licenseNumber}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactInfo 
            email={nurseData.email}
            phone={nurseData.phone}
            shift={nurseData.shift}
          />
          
          <div className="space-y-4">
            <InfoCard
              title="Assigned Patients"
              value={nurseData.assignedPatients.length}
              colorScheme="blue"
            />
            <InfoCard
              title="Hire Date"
              value={new Date(nurseData.hireDate).toLocaleDateString()}
              colorScheme="green"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Today's Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard
            title="Medications Due"
            value={getMedicationsDue()}
            colorScheme="orange"
          />
          <InfoCard
            title="Active Doctors"
            value={getActiveDoctors()}
            colorScheme="purple"
          />
          <InfoCard
            title="Department"
            value={nurseData.department}
            colorScheme="teal"
            size="medium"
          />
        </div>
      </div>
    </div>
  );
};

export default NurseOverview;