// components/DoctorDashboardComponents/Sidebar.js
import React from 'react';
import { Stethoscope } from 'lucide-react';
import { sidebarItems } from '../../config/sidebarConfig';



const Sidebar = ({ doctorInfo, activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900">{doctorInfo.name}</p>
            <p className="text-sm text-gray-500">{doctorInfo.specialty}</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6 px-3">
        {sidebarItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-3 py-3 mb-2 text-left rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <IconComponent className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;