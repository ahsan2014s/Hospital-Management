import React from 'react';
import { DollarSign, Users, UserPlus, Bed } from 'lucide-react';

const StatsCards = ({ statsCards }) => {
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'DollarSign':
        return <DollarSign className="w-6 h-6" />;
      case 'Users':
        return <Users className="w-6 h-6" />;
      case 'UserPlus':
        return <UserPlus className="w-6 h-6" />;
      case 'Bed':
        return <Bed className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last month
              </p>
            </div>
            <div className={`p-3 rounded-full ${stat.color}`}>
              {renderIcon(stat.icon)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;