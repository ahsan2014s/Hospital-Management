import React from 'react';
import { Calendar, Activity, Clock, TrendingUp } from 'lucide-react';

const StatsGrid = ({ todayStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Today</span>
        </div>
        <p className="text-sm text-gray-600 mb-1">Appointments</p>
        <p className="text-xl font-semibold">{todayStats.totalPatients}</p>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <Activity className="w-5 h-5 text-green-600" />
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
        </div>
        <p className="text-sm text-gray-600 mb-1">Seen Today</p>
        <p className="text-xl font-semibold">{todayStats.completed}</p>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <Clock className="w-5 h-5 text-orange-600" />
          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Waiting</span>
        </div>
        <p className="text-sm text-gray-600 mb-1">In Queue</p>
        <p className="text-xl font-semibold">{todayStats.waiting}</p>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Active</span>
        </div>
        <p className="text-sm text-gray-600 mb-1">In Progress</p>
        <p className="text-xl font-semibold">{todayStats.inProgress}</p>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Avg</span>
        </div>
        <p className="text-sm text-gray-600 mb-1">Wait Time</p>
        <p className="text-xl font-semibold">{todayStats.avgWaitTime}</p>
      </div>
    </div>
  );
};

export default StatsGrid;