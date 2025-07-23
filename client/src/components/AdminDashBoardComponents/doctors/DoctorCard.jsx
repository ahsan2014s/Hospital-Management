import React from 'react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
          <p className="text-sm text-gray-600">{doctor.specialization}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          doctor.status === 'active' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {doctor.status}
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Department:</span>
          <span className="text-gray-900">{doctor.department}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">License:</span>
          <span className="text-gray-900">{doctor.licenseNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Phone:</span>
          <span className="text-gray-900">{doctor.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Email:</span>
          <span className="text-gray-900 text-xs">{doctor.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Hire Date:</span>
          <span className="text-gray-900">{new Date(doctor.hireDate).toLocaleDateString()}</span>
        </div>
        <div className="pt-2 border-t border-gray-200">
          <span className="text-gray-600 text-xs">Salary:</span>
          <p className="text-green-600 font-semibold">${doctor.salary.toLocaleString()}/year</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;