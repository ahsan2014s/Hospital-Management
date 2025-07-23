import React from 'react';
import StaffRegistrationForm from './staff/StaffRegistrationForm';

const StaffContent = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Staff Registration</h2>
      <StaffRegistrationForm />
    </div>
  );
};

export default StaffContent;