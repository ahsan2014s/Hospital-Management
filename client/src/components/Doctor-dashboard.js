import React from 'react';
import { useState, useEffect } from 'react';

import { 
  Home, 
  Users, 
  AlertTriangle, 
  FileText, 
  User,
  Bell,
  Settings,
  Clock,
  MapPin,
  Phone,
  Mail,
  Stethoscope,
  Calendar,
  Activity,
  TrendingUp,
  Shield,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';

import { apiService } from '../services/api';

const DoctorsHealthDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    doctorInfo: {},
    waitingPatients: [],
    todayStats: {},
    cdcData: { pandemics: [], recommendations: [] }
  });



  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'waiting-list', label: 'Patients Waiting List', icon: Users },
    { id: 'cdc-pandemics', label: 'CDC Pandemic Info', icon: AlertTriangle },
    { id: 'cdc-recommendations', label: 'CDC Recommendations', icon: FileText }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Attempting to fetch dashboard data...'); // Debug log
        
        // Fetch all dashboard data from backend
        const response = await apiService.getDashboardData();
        
        console.log('API Response:', response); // Debug log
        
        if (response.success) {
          console.log('Data received:', response.data); // Debug log
          setData(response.data);
        } else {
          console.error('API returned success: false', response); // Debug log
          throw new Error(response.message || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        console.error('Detailed error:', err); // More detailed error log
        console.error('Error name:', err.name); // Error type
        console.error('Error message:', err.message); // Error message
        setError(`Failed to load dashboard data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'priority': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'routine': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'ready': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'waiting': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-800 p-4 rounded-lg">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { doctorInfo, waitingPatients, todayStats, cdcData } = data;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome, {doctorInfo.name}</h1>
            <p className="text-blue-100">{doctorInfo.specialty} • {doctorInfo.department}</p>
            <p className="text-blue-100 text-sm mt-1">{doctorInfo.yearsExperience} years experience • License: {doctorInfo.license}</p>
          </div>
          <div className="text-right">
            <Stethoscope className="w-12 h-12 text-blue-200 mb-2" />
            <p className="text-sm text-blue-100">Today: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Today</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Appointments</p>
          <p className="text-xl font-semibold">{todayStats.totalPatients}</p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5 text-green-600" />
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Seen Today</p>
          <p className="text-xl font-semibold">{todayStats.completed}</p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Waiting</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">In Queue</p>
          <p className="text-xl font-semibold">{todayStats.waiting}</p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Active</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">In Progress</p>
          <p className="text-xl font-semibold">{todayStats.inProgress}</p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Avg</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Wait Time</p>
          <p className="text-xl font-semibold">{todayStats.avgWaitTime}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Patients */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Next Patients</h2>
            <button 
              onClick={() => setActiveTab('waiting-list')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-3">
            {waitingPatients.slice(0, 3).map((patient) => (
              <div key={patient.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{patient.name}</p>
                  <p className="text-sm text-gray-600">{patient.reason}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(patient.priority)}`}>
                      {patient.priority}
                    </span>
                    <span className="text-xs text-gray-500">Wait: {patient.waitTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CDC Alerts */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">CDC Health Alerts</h2>
            <button 
              onClick={() => setActiveTab('cdc-pandemics')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-3">
            {cdcData.pandemics.slice(0, 2).map((pandemic) => (
              <div key={pandemic.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{pandemic.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(pandemic.severity)}`}>
                    {pandemic.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{pandemic.description}</p>
                <p className="text-xs text-gray-500">Updated: {pandemic.lastUpdate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Doctor Contact Info */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-gray-700">{doctorInfo.phone}</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-gray-700">{doctorInfo.email}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-gray-700">{doctorInfo.department}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-gray-700">{doctorInfo.patients} Total Patients</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWaitingList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Patients Waiting List</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wait Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {waitingPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">Age: {patient.age}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(patient.priority)}`}>
                      {patient.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.waitTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.lastVisit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Call</button>
                    <button className="text-green-600 hover:text-green-900">Start</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  const renderCDCPandemics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">CDC Pandemic Information</h2>
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {cdcData.loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {cdcData.pandemics.map((pandemic) => (
            <div key={pandemic.id} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{pandemic.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(pandemic.severity)}`}>
                    {pandemic.severity} risk
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {pandemic.status}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{pandemic.description}</p>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Current Recommendations:</h4>
                <ul className="space-y-1">
                  {pandemic.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Last updated: {pandemic.lastUpdate}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCDCRecommendations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">CDC Clinical Recommendations</h2>
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">Clinical Guidelines</span>
        </div>
      </div>

      {cdcData.loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {cdcData.recommendations.map((rec) => (
            <div key={rec.id} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{rec.title}</h3>
                    <p className="text-sm text-gray-600">{rec.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                    rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.priority} priority
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{rec.summary}</p>
              <p className="text-gray-600 mb-4">{rec.details}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Published: {rec.date}</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Read Full Guidelines
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'waiting-list':
        return renderWaitingList();
      case 'cdc-pandemics':
        return renderCDCPandemics();
      case 'cdc-recommendations':
        return renderCDCRecommendations();
      default:
        return renderDashboard();
    }
  };

return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{doctorInfo.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DoctorsHealthDashboard;