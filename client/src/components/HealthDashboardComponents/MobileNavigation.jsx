import React from 'react';
import { sidebarItems } from '../../config/healthMenuItems';

const MobileNavigation = ({ activeTab, setActiveTab, isMobile }) => {
  if (!isMobile) return null;

  // Take first 5 items for bottom navigation
  const bottomNavItems = sidebarItems.slice(0, 6);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 shadow-lg">
      <div className="flex justify-around">
        {bottomNavItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <IconComponent 
                className={`w-5 h-5 mb-1 ${isActive ? 'text-blue-700' : 'text-gray-600'}`} 
              />
              <span className={`text-xs font-medium ${isActive ? 'text-blue-700' : 'text-gray-600'}`}>
                {item.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;