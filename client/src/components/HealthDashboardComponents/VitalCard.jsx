import React from 'react';
import { iconMap } from '../../config/iconMap';
import { Heart } from 'lucide-react';

const VitalCard = ({ vital }) => {
  const IconComponent = iconMap[vital.icon] || Heart;
  
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <IconComponent className="w-5 h-5 text-blue-600" />
        <span className={`px-2 py-1 rounded-full text-xs ${
          vital.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {vital.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-1">{vital.label}</p>
      <p className="text-xl font-semibold">{vital.value} <span className="text-sm text-gray-500">{vital.unit}</span></p>
    </div>
  );
};

export default VitalCard;