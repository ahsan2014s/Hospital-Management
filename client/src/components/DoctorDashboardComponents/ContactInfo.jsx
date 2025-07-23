import React from 'react';
import { Phone, Mail, MapPin, Users } from 'lucide-react';

const ContactInfo = ({ doctorInfo }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center">
          <Phone className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-gray-700">{doctorInfo.phone}</span>
        </div>
        <div className="flex items-center">
          <Mail className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-gray-700">{doctorInfo.email}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-gray-700">{doctorInfo.department}</span>
        </div>
        <div className="flex items-center">
          <Users className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-gray-700">{doctorInfo.patients} Total Patients</span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;