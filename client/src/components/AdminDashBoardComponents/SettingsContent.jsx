import React from 'react';

const SettingsContent = ({ doctors, nurses }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>
        
        <div className="space-y-6">
          {/* General Settings */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" defaultValue="City General Hospital" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" defaultValue="+1 (555) 123-4567" />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive email alerts for critical events</p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Low Stock Alerts</h4>
                  <p className="text-sm text-gray-600">Get notified when inventory is running low</p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                </div>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-900">System Version</p>
                  <p className="text-gray-600">v2.1.0</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Last Updated</p>
                  <p className="text-gray-600">January 15, 2024</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Database Status</p>
                  <p className="text-green-600">Connected</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Active Users</p>
                  <p className="text-gray-600">{doctors.length + nurses.length} staff members</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;