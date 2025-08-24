// componets/HealthDashboardComponents/Header.jsx
import React from 'react';
import { Bell, Settings, Menu } from 'lucide-react';
import { sidebarItems } from '../../config/healthMenuItems';
import LogoutComponent from '../common/LogoutComponent';

const Header = ({ activeTab, isMobile }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
          </h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </button>
          <LogoutComponent />
        </div>
      </div>
    </header>
  );
};

export default Header;