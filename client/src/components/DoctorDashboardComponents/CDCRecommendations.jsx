import React from 'react';
import { FileText } from 'lucide-react';

const CDCRecommendations = ({ cdcData }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">Clinical Guidelines</span>
        </div>
      </div>

      {cdcData.loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {cdcData.recommendations.map((rec) => (
            <div key={rec.id} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{rec.title}</h3>
                    <p className="text-sm text-gray-600">{rec.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                    rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.priority} priority
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{rec.summary}</p>
              <p className="text-gray-600 mb-4">{rec.details}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Published: {rec.date}</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Read Full Guidelines
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CDCRecommendations;