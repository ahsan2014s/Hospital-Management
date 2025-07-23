import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorScreen = ({ error }) => (
  <div className="flex h-screen bg-gray-100 items-center justify-center">
    <div className="text-center max-w-md mx-auto p-6">
      <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Data</h2>
      <p className="text-gray-600 mb-4">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default ErrorScreen;