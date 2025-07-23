import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';
import { useColorHelpers } from '../../hooks/useColorHelpers';

const CDCPandemics = ({ cdcData }) => {
  const { getSeverityColor } = useColorHelpers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {cdcData.loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {cdcData.pandemics.map((pandemic) => (
            <div key={pandemic.id} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{pandemic.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(pandemic.severity)}`}>
                    {pandemic.severity} risk
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {pandemic.status}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{pandemic.description}</p>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Current Recommendations:</h4>
                <ul className="space-y-1">
                  {pandemic.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Last updated: {pandemic.lastUpdate}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CDCPandemics;