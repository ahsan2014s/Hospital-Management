import React from 'react';

const ErrorDisplay = ({ error, onRetry }) => {
  return (
    <div className="flex h-screen bg-gray-100 items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 text-xl">{error}</p>
        <button 
          onClick={onRetry} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;