import React from 'react';

const ErrorDisplay = ({ error }) => {
  return (
    <div className="flex h-screen bg-gray-100 items-center justify-center">
      <div className="text-center">
        <div className="bg-red-100 text-red-800 p-4 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;