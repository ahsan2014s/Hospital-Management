import React from 'react';
import { Package, AlertCircle } from 'lucide-react';

const InventoryContent = ({ inventory }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Inventory Management</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Current Inventory</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Add New Item
          </button>
        </div>
        <div className="overflow-x-auto">
          {/* Inventory Summary for Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600">Total Items</p>
                    <p className="text-xl font-bold text-blue-900">{inventory.length}</p>
                  </div>
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-600">Low Stock Items</p>
                    <p className="text-xl font-bold text-yellow-900">
                      {inventory.filter(item => item.currentStock <= item.minStock).length}
                    </p>
                  </div>
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">Well Stocked</p>
                    <p className="text-xl font-bold text-green-900">
                      {inventory.filter(item => item.currentStock > item.minStock * 1.5).length}
                    </p>
                  </div>
                  <Package className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryContent;