import React from 'react';

const WelcomeSection = ({ userName }) => (
  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 md:p-6 text-white">
    <h1 className="text-xl md:text-2xl font-bold mb-2">Welcome back, {userName || 'User'}!</h1>
    <p className="text-blue-100">Here's an overview of your health status</p>
  </div>
);

export default WelcomeSection;