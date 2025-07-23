import React from 'react';
import { Activity } from 'lucide-react';

const RecentActivities = ({ recentActivities }) => {
  const getActivityBgColor = (type) => {
    switch (type) {
      case 'admission':
        return 'bg-blue-100';
      case 'surgery':
        return 'bg-green-100';
      case 'maintenance':
        return 'bg-orange-100';
      default:
        return 'bg-purple-100';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${getActivityBgColor(activity.type)}`}>
              <Activity className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-sm text-gray-600">
                {activity.patient || activity.item || activity.staff}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;