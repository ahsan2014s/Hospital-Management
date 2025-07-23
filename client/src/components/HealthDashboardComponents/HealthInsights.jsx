import React from 'react';

const HealthInsights = ({ insights }) => (
  <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 shadow-sm">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">Health Insights</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {insights && insights.length > 0 ? insights.map((insight, index) => (
        <div key={index} className={`p-4 rounded-lg ${
          insight.type === 'success' ? 'bg-green-50' :
          insight.type === 'info' ? 'bg-blue-50' : 'bg-purple-50'
        }`}>
          <h3 className={`font-medium mb-2 ${
            insight.type === 'success' ? 'text-green-800' :
            insight.type === 'info' ? 'text-blue-800' : 'text-purple-800'
          }`}>{insight.title}</h3>
          <p className={`text-sm ${
            insight.type === 'success' ? 'text-green-700' :
            insight.type === 'info' ? 'text-blue-700' : 'text-purple-700'
          }`}>{insight.message}</p>
        </div>
      )) : (
        <div className="col-span-3 text-center text-gray-500 py-4">
          No health insights available
        </div>
      )}
    </div>
  </div>
);

export default HealthInsights;