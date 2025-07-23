// DoctorCard.jsx

import React from 'react';
import { User, Star } from 'lucide-react';

const DoctorCard = ({ doctor }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center mb-3">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
        {doctor.photo ? (
          <img src={doctor.photo} alt={doctor.name} className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <User className="w-6 h-6 text-blue-600" />
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{doctor.name || 'Dr. John Smith'}</h3>
        <p className="text-sm text-gray-600">{doctor.expertise || 'General Practitioner'}</p>
      </div>
    </div>
    
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="text-sm text-gray-600 ml-1">{doctor.rating || '4.8'} ({doctor.reviews || '156'} reviews)</span>
      </div>
      <span className="text-sm text-green-600 font-medium">
        {doctor.availability || 'Available Today'}
      </span>
    </div>
    
    {doctor.location && (
      <p className="text-sm text-gray-500 mb-3">{doctor.location}</p>
    )}
    
    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
      Book Appointment
    </button>
  </div>
);

export default DoctorCard;