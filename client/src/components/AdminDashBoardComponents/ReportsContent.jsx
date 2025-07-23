import React from 'react';
import { Users, Bed, UserPlus, Stethoscope, Heart } from 'lucide-react';

const ReportsContent = ({ patients, doctors, nurses, dashboardData }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h2>
        
        {/* Patient Statistics */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Total Patients</p>
                  <p className="text-2xl font-bold text-blue-900">{patients.length}</p>
                </div>
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Admitted</p>
                  <p className="text-2xl font-bold text-green-900">
                    {patients.filter(p => p.status === 'admitted').length}
                  </p>
                </div>
                <Bed className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Discharged</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {patients.filter(p => p.status === 'discharged').length}
                  </p>
                </div>
                <UserPlus className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Staff Statistics */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-cyan-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan-600">Total Doctors</p>
                  <p className="text-2xl font-bold text-cyan-900">{doctors.length}</p>
                </div>
                <Stethoscope className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-pink-600">Total Nurses</p>
                  <p className="text-2xl font-bold text-pink-900">{nurses.length}</p>
                </div>
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600">Total Staff</p>
                  <p className="text-2xl font-bold text-orange-900">{doctors.length + nurses.length}</p>
                </div>
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Department Performance Report */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance Report</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-4">
              {dashboardData.departmentStats.map((dept, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                      <p className="text-sm text-gray-600">Department</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-600">{dept.currentPatients}</p>
                      <p className="text-sm text-gray-600">Current Patients</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">${dept.monthlyRevenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-purple-600">{Math.round((dept.currentPatients / dept.capacity) * 100)}%</p>
                      <p className="text-sm text-gray-600">Occupancy Rate</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsContent;