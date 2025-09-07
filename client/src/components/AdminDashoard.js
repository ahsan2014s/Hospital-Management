import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  UserPlus, 
  Calendar, 
  Bed, 
  Package, 
  DollarSign, 
  FileText, 
  Settings, 
  Activity,
  Stethoscope,
  Heart,
  TrendingUp,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';

import ApiService from '../services/adminAPI';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    statsCards: [],
    recentActivities: [],
    departmentStats: [],
    financialSummary: {}
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [reportsData, setReportsData] = useState({});
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'nurses', label: 'Nurses', icon: Heart },
    { id: 'staff', label: 'Register', icon: UserPlus },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'rooms', label: 'Room Management', icon: Bed },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'financials', label: 'Financials', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          statsResponse, 
          activitiesResponse, 
          departmentsResponse, 
          patientsResponse,
          doctorsResponse,
          nursesResponse,
          appointmentsResponse,
          inventoryResponse,
          roomsResponse,
          reportsResponse
        ] = await Promise.all([
          ApiService.getDashboardStats(),
          ApiService.getRecentActivities(),
          ApiService.getDepartments(),
          ApiService.getPatients(),
          ApiService.getDoctors(),
          ApiService.getNurses(),
          ApiService.getAppointments(),
          ApiService.getInventory(),
          ApiService.getRoomData(),
          ApiService.getReportsData()
        ]);
        
        setDashboardData({
          statsCards: statsResponse.data || [],
          recentActivities: activitiesResponse.data || [],
          departmentStats: departmentsResponse.data || [],
          financialSummary: statsResponse.financialSummary || {}
        });
        setPatients(patientsResponse.data || []);
        setDoctors(doctorsResponse.data || []);
        setNurses(nursesResponse.data || []);
        setAppointments(appointmentsResponse.data || []);
        setInventory(inventoryResponse.data || []);
        setRoomData(roomsResponse.data || []);
        setReportsData(reportsResponse.data || {});
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set fallback empty arrays to prevent map errors
        setDashboardData({
          statsCards: [],
          recentActivities: [],
          departmentStats: [],
          financialSummary: {}
        });
        setPatients([]);
        setDoctors([]);
        setNurses([]);
        setAppointments([]);
        setInventory([]);
        setRoomData([]);
        setReportsData({});
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardData.statsCards.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color}`}>
                      {stat.icon === 'DollarSign' && <DollarSign className="w-6 h-6" />}
                      {stat.icon === 'Users' && <Users className="w-6 h-6" />}
                      {stat.icon === 'UserPlus' && <UserPlus className="w-6 h-6" />}
                      {stat.icon === 'Bed' && <Bed className="w-6 h-6" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Department Performance */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
                <div className="space-y-4">
                  {dashboardData.departmentStats.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{dept.name}</p>
                        <p className="text-sm text-gray-600">{dept.currentPatients} patients • {Math.round((dept.currentPatients / dept.capacity) * 100)}% occupancy</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${dept.monthlyRevenue.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">monthly revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {dashboardData.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'admission' ? 'bg-blue-100' :
                        activity.type === 'surgery' ? 'bg-green-100' :
                        activity.type === 'maintenance' ? 'bg-orange-100' :
                        'bg-purple-100'
                      }`}>
                        <Activity className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">
                          {activity.patient || activity.item || activity.staff}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="flex items-center justify-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Add New Patient
                </button>
                <button className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Appointment
                </button>
                <button className="flex items-center justify-center p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Register Doctor
                </button>
                <button className="flex items-center justify-center p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                  <FileText className="w-5 h-5 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'patients':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patients.map((patient) => (
                  <div key={patient._id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                        <p className="text-sm text-gray-600">ID: {patient.patientId}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'admitted' ? 'bg-green-100 text-green-800' :
                        patient.status === 'discharged' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.status}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age:</span>
                        <span className="text-gray-900">{new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gender:</span>
                        <span className="text-gray-900 capitalize">{patient.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="text-gray-900">{patient.phone}</span>
                      </div>
                      {patient.roomNumber && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Room:</span>
                          <span className="text-gray-900">{patient.roomNumber}</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-gray-200">
                        <span className="text-gray-600 text-xs">Emergency Contact:</span>
                        <p className="text-gray-900 text-sm">{patient.emergencyContact.name} ({patient.emergencyContact.relation})</p>
                        <p className="text-gray-600 text-xs">{patient.emergencyContact.phone}</p>
                      </div>
                      {patient.allergies && patient.allergies.length > 0 && (
                        <div className="pt-2">
                          <span className="text-red-600 text-xs font-medium">Allergies:</span>
                          <p className="text-red-700 text-sm">{patient.allergies.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'staff':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Staff Registration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Doctor</option>
                  <option>Nurse</option>
                  <option>Technician</option>
                  <option>Administrator</option>
                  <option>Support Staff</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Cardiology</option>
                  <option>Emergency</option>
                  <option>Surgery</option>
                  <option>Pediatrics</option>
                  <option>Radiology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="md:col-span-2">
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                  Register Staff Member
                </button>
              </div>
            </div>
          </div>
        );

      case 'financials':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Management</h2>
              
              {/* Financial Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-green-900">Monthly Revenue</h3>
                      <p className="text-2xl font-bold text-green-700">
                        ${dashboardData.financialSummary.monthlyRevenue?.toLocaleString() || '0'}
                      </p>
                      <p className="text-sm text-green-600">
                        +{dashboardData.financialSummary.revenueChange || 0}% from last month
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-red-900">Monthly Expenses</h3>
                      <p className="text-2xl font-bold text-red-700">
                        ${dashboardData.financialSummary.monthlyExpenses?.toLocaleString() || '0'}
                      </p>
                      <p className="text-sm text-red-600">
                        +{dashboardData.financialSummary.expensesChange || 0}% from last month
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900">Net Profit</h3>
                      <p className="text-2xl font-bold text-blue-700">
                        ${dashboardData.financialSummary.netProfit?.toLocaleString() || '0'}
                      </p>
                      <p className="text-sm text-blue-600">
                        +{dashboardData.financialSummary.profitChange || 0}% from last month
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Department Revenue */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Revenue</h3>
                <div className="space-y-4">
                  {dashboardData.departmentStats.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div>
                        <h4 className="font-medium text-gray-900">{dept.name}</h4>
                        <p className="text-sm text-gray-600">
                          {dept.currentPatients} patients • {Math.round((dept.currentPatients / dept.capacity) * 100)}% occupancy
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-green-600">${dept.monthlyRevenue.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">monthly revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'reports':
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

        
      case 'doctors':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Doctors Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <div key={doctor._id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        doctor.status === 'active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {doctor.status}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Department:</span>
                        <span className="text-gray-900">{doctor.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">License:</span>
                        <span className="text-gray-900">{doctor.licenseNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="text-gray-900">{doctor.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="text-gray-900 text-xs">{doctor.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hire Date:</span>
                        <span className="text-gray-900">{new Date(doctor.hireDate).toLocaleDateString()}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <span className="text-gray-600 text-xs">Salary:</span>
                        <p className="text-green-600 font-semibold">${doctor.salary.toLocaleString()}/year</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'nurses':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nurses Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nurses.map((nurse) => (
                  <div key={nurse._id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{nurse.name}</h3>
                        <p className="text-sm text-gray-600">{nurse.department} - {nurse.shift} shift</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        nurse.status === 'active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {nurse.status}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Department:</span>
                        <span className="text-gray-900">{nurse.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">License:</span>
                        <span className="text-gray-900">{nurse.licenseNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shift:</span>
                        <span className="text-gray-900 capitalize">{nurse.shift}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="text-gray-900">{nurse.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="text-gray-900 text-xs">{nurse.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hire Date:</span>
                        <span className="text-gray-900">{new Date(nurse.hireDate).toLocaleDateString()}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <span className="text-gray-600 text-xs">Salary:</span>
                        <p className="text-green-600 font-semibold">${nurse.salary.toLocaleString()}/year</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'appointments':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointments Management</h2>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment._id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient & Doctor</h3>
                        <p className="text-sm text-gray-600">Patient ID: {appointment.patientId}</p>
                        <p className="text-sm text-gray-600">Doctor ID: {appointment.doctorId}</p>
                        <p className="text-sm text-gray-600">Department: {appointment.department}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Appointment Details</h3>
                        <p className="text-sm text-gray-600">Date: {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">Time: {new Date(appointment.appointmentDate).toLocaleTimeString()}</p>
                        <p className="text-sm text-gray-600">Duration: {appointment.duration} minutes</p>
                        <p className="text-sm text-gray-600">Type: {appointment.type}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Status & Payment</h3>
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                          appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {appointment.status}
                        </div>
                        <p className="text-sm text-gray-600">Fee: ${appointment.fees}</p>
                        <p className="text-sm text-gray-600">Reason: {appointment.reason}</p>
                      </div>
                    </div>
                    {appointment.notes && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Notes:</h4>
                        <p className="text-sm text-gray-600">{appointment.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'rooms':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roomData.map((room, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{room.department}</h3>
                        <p className="text-sm text-gray-600">{room.location}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        room.occupancy > 90 ? 'bg-red-100 text-red-800' :
                        room.occupancy > 70 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {room.occupancy}% occupied
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Capacity:</span>
                        <span className="text-lg font-semibold text-gray-900">{room.capacity}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Current Patients:</span>
                        <span className="text-lg font-semibold text-blue-600">{room.currentPatients}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Available Rooms:</span>
                        <span className="text-lg font-semibold text-green-600">{room.availableRooms}</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            room.occupancy > 90 ? 'bg-red-500' :
                            room.occupancy > 70 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${room.occupancy}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        case 'settings':
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
      case 'inventory':
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
              )
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{menuItems.find(item => item.id === activeSection)?.label}</h2>
            <p className="text-gray-600">Content for {activeSection} section will be implemented here.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
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

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setActiveSection('settings')}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;