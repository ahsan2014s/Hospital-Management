import React from 'react';
import { Stethoscope } from 'lucide-react';

const DoctorsList = ({ doctors }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Stethoscope className="w-5 h-5 mr-2" />
        Assigned Doctors
      </h3>
      <div className="space-y-3">
        {doctors.map(doctor => (
          <div key={doctor._id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-gray-800">{doctor.name}</h4>
                <p className="text-gray-600">{doctor.specialty}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">{doctor.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;