import React from 'react';
import { Stethoscope } from 'lucide-react';

const WelcomeSection = ({ doctorInfo }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Welcome, {doctorInfo.name}</h1>
          <p className="text-blue-100">{doctorInfo.specialty} • {doctorInfo.department}</p>
          <p className="text-blue-100 text-sm mt-1">{doctorInfo.yearsExperience} years experience • License: {doctorInfo.license}</p>
        </div>
        <div className="text-right">
          <Stethoscope className="w-12 h-12 text-blue-200 mb-2" />
          <p className="text-sm text-blue-100">Today: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;