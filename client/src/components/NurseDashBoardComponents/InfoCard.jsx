import React from 'react';

const InfoCard = ({ 
  title, 
  value, 
  colorScheme = 'blue',
  size = 'large' 
}) => {
  const colorClasses = {
    blue: {
      background: 'bg-blue-50',
      title: 'text-blue-800',
      value: 'text-blue-600'
    },
    green: {
      background: 'bg-green-50',
      title: 'text-green-800',
      value: 'text-green-600'
    },
    orange: {
      background: 'bg-orange-50',
      title: 'text-orange-800',
      value: 'text-orange-600'
    },
    purple: {
      background: 'bg-purple-50',
      title: 'text-purple-800',
      value: 'text-purple-600'
    },
    teal: {
      background: 'bg-teal-50',
      title: 'text-teal-800',
      value: 'text-teal-600'
    },
    yellow: {
      background: 'bg-yellow-50',
      title: 'text-yellow-800',
      value: 'text-yellow-700'
    }
  };

  const colors = colorClasses[colorScheme];
  const textSize = size === 'large' ? 'text-2xl' : 'text-lg';

  return (
    <div className={`${colors.background} rounded-lg p-4`}>
      <h4 className={`font-semibold ${colors.title} mb-2`}>{title}</h4>
      <p className={`${textSize} font-bold ${colors.value}`}>
        {value}
      </p>
    </div>
  );
};

export default InfoCard;