// dummy

import React from 'react';
import { CreditCard } from 'lucide-react';

const HealthCard = ({ healthCard }) => {
  return (
    <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Health Card Information</h2>
      {healthCard ? (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-4 md:p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">Health Insurance Card</h3>
              <p className="text-blue-100">Primary Coverage</p>
            </div>
            <CreditCard className="w-6 md:w-8 h-6 md:h-8 flex-shrink-0" />
          </div>
          <div className="space-y-2">
            <p className="flex flex-col sm:flex-row">
              <span className="text-blue-200 font-medium">Member ID:</span> 
              <span className="sm:ml-2">{healthCard.memberId}</span>
            </p>
            <p className="flex flex-col sm:flex-row">
              <span className="text-blue-200 font-medium">Group:</span> 
              <span className="sm:ml-2">{healthCard.group}</span>
            </p>
            <p className="flex flex-col sm:flex-row">
              <span className="text-blue-200 font-medium">Plan:</span> 
              <span className="sm:ml-2">{healthCard.plan}</span>
            </p>
            <p className="flex flex-col sm:flex-row">
              <span className="text-blue-200 font-medium">Effective:</span> 
              <span className="sm:ml-2">{healthCard.effective}</span>
            </p>
            {healthCard.provider && (
              <p className="flex flex-col sm:flex-row">
                <span className="text-blue-200 font-medium">Provider:</span> 
                <span className="sm:ml-2">{healthCard.provider}</span>
              </p>
            )}
            {healthCard.copay && (
              <p className="flex flex-col sm:flex-row">
                <span className="text-blue-200 font-medium">Copay:</span> 
                <span className="sm:ml-2">{healthCard.copay}</span>
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p>No health card information available</p>
        </div>
      )}
    </div>
  );
};

export default HealthCard;