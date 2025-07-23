import React from 'react';

const DepartmentPerformance = ({ departmentStats }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
      <div className="space-y-4">
        {departmentStats.map((dept, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{dept.name}</p>
              <p className="text-sm text-gray-600">
                {dept.currentPatients} patients • {Math.round((dept.currentPatients / dept.capacity) * 100)}% occupancy
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-600">${dept.monthlyRevenue.toLocaleString()}</p>
              <p className="text-xs text-gray-500">monthly revenue</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentPerformance;