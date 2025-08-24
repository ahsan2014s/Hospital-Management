import React from 'react';
import { Bell, Settings, User } from 'lucide-react';
import { sidebarItems } from '../../config/sidebarConfig';
import LogoutComponent from '../common/LogoutComponent';


const Header = ({ activeTab, doctorInfo }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
              {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
          </h1>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Bell className="w-5 h-5" />
          </button>
          
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Settings className="w-5 h-5" />
          </button>
          
          <LogoutComponent />
        </div>
      </div>
    </header>
  );
};

export default Header;