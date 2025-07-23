import React from 'react';
import { UserPlus, Calendar, Stethoscope, FileText } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: UserPlus,
      label: 'Add New Patient',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      icon: Calendar,
      label: 'Schedule Appointment',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      hoverColor: 'hover:bg-green-100'
    },
    {
      icon: Stethoscope,
      label: 'Register Doctor',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      hoverColor: 'hover:bg-purple-100'
    },
    {
      icon: FileText,
      label: 'Generate Report',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      hoverColor: 'hover:bg-orange-100'
    }
  ];

  const handleActionClick = (actionLabel) => {
    console.log(`${actionLabel} clicked`);
    // Add your action handling logic here
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <button
              key={index}
              onClick={() => handleActionClick(action.label)}
              className={`flex items-center justify-center p-4 ${action.bgColor} ${action.textColor} rounded-lg ${action.hoverColor} transition-colors`}
            >
              <IconComponent className="w-5 h-5 mr-2" />
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;