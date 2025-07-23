// CDCAlerts.jsx

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useColorHelpers } from '../../hooks/useColorHelpers';

const CDCAlerts = ({ cdcData, setActiveTab }) => {
  const { getSeverityColor } = useColorHelpers();

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">CDC Health Alerts</h2>
        <button 
          onClick={() => setActiveTab('cdc-pandemics')}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          View all <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="space-y-3">
        {cdcData.pandemics.slice(0, 2).map((pandemic) => (
          <div key={pandemic.id} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{pandemic.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(pandemic.severity)}`}>
                {pandemic.severity}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{pandemic.description}</p>
            <p className="text-xs text-gray-500">Updated: {pandemic.lastUpdate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CDCAlerts;