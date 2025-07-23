import React from 'react';
import { X } from 'lucide-react';
import { menuItems } from '../../config/menuItems'; 

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeSection, setActiveSection }) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Hospital Admin</h1>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center px-4 py-3 text-left hover:bg-blue-50 hover:text-blue-600 transition-colors ${
              activeSection === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;