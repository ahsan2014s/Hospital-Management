import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Calendar, 
  Pill, 
  CreditCard, 
  ClipboardList, 
  User,
  Bell,
  Settings,
  Heart,
  Activity,
  Thermometer,
  Scale,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

import { healthAPI } from '../services/patientAPI';
import RescheduleForm from './HealthDashboardComponents/RescheduleForm';
import Prescriptions from './HealthDashboardComponents/Prescriptions';

const HealthDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [data, setData] = useState({
    user: null,
    vitals: [],
    appointments: [],
    currentMedications: [],
    previousMedications: [],
    prescriptions: [],
    healthCard: null,
    insights: []
  });

  const sidebarItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'current-meds', label: 'Current Medications', icon: Pill },
    { id: 'previous-meds', label: 'Prescriptions', icon: ClipboardList },
    { id: 'health-card', label: 'Health Card', icon: CreditCard },
    { id: 'appointments', label: 'Appointments', icon: Calendar }
  ];

  const iconMap = {
    'Heart': Heart,
    'Activity': Activity,
    'Thermometer': Thermometer,
    'Scale': Scale
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Attempting to fetch dashboard data...');
        
        // Fetch all required data separately since the dashboard endpoint doesn't return everything
        const [
          dashboardResponse,
          previousMedsResponse,
          prescriptionsResponse,
          healthCardResponse
        ] = await Promise.all([
          healthAPI.getDashboardData(),
          healthAPI.getPreviousMedications(),
          healthAPI.getPrescriptions(),
          healthAPI.getHealthCard()
        ]);
        
        console.log('Dashboard API Response:', dashboardResponse);
        console.log('Previous Meds Response:', previousMedsResponse);
        console.log('Health Card Response:', healthCardResponse);
        
        if (dashboardResponse.success) {
          const dashboardData = dashboardResponse.data;
          
          setData({
            user: dashboardData.user || null,
            vitals: dashboardData.vitals || [],
            appointments: dashboardData.appointments || [],
            // Fix: Backend returns 'medications' but we need 'currentMedications'
            currentMedications: dashboardData.medications || [],
            // Add the missing data from separate API calls
            previousMedications: previousMedsResponse.success ? previousMedsResponse.data : [],
            prescriptions: prescriptionsResponse.success ? prescriptionsResponse.data : [],
            healthCard: healthCardResponse.success ? healthCardResponse.data : null,
            insights: dashboardData.insights || []
          });
        } else {
          console.error('Dashboard API returned success: false', dashboardResponse);
          throw new Error(dashboardResponse.message || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        console.error('Detailed error:', err);
        console.error('Error name:', err.name); 
        console.error('Error message:', err.message);
        setError(`Failed to load dashboard data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRescheduleClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleForm(true);
  };

  const handleRescheduleSuccess = (updatedAppointment) => {
    console.log('Appointment rescheduled:', updatedAppointment);
    // Refresh the data
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [
          dashboardResponse,
          previousMedsResponse,
          prescriptionsResponse,
          healthCardResponse
        ] = await Promise.all([
          healthAPI.getDashboardData(),
          healthAPI.getPreviousMedications(),
          healthAPI.getPrescriptions(),
          healthAPI.getHealthCard()
        ]);
        
        if (dashboardResponse.success) {
          const dashboardData = dashboardResponse.data;
          
          setData({
            user: dashboardData.user || null,
            vitals: dashboardData.vitals || [],
            appointments: dashboardData.appointments || [],
            currentMedications: dashboardData.medications || [],
            previousMedications: previousMedsResponse.success ? previousMedsResponse.data : [],
            prescriptions: prescriptionsResponse.success ? prescriptionsResponse.data : [],
            healthCard: healthCardResponse.success ? healthCardResponse.data : null,
            insights: dashboardData.insights || []
          });
        } else {
          throw new Error(dashboardResponse.message || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        setError(`Failed to load dashboard data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  const handleCloseRescheduleForm = () => {
    setShowRescheduleForm(false);
    setSelectedAppointment(null);
  };

  // Loading component
  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your health data...</p>
        </div>
      </div>
    );
  }

  // Error component
  if (error) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { user, vitals, appointments, currentMedications, insights } = data;
  
  const renderHome = () => {
    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'User'}!</h1>
          <p className="text-blue-100">Here's an overview of your health status</p>
        </div>

        {/* Quick Stats - Fixed data access */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vitals && vitals.length > 0 ? vitals.map((vital, index) => {
            const IconComponent = iconMap[vital.icon] || Heart;
            return (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="w-5 h-5 text-blue-600" />
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    vital.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {vital.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{vital.label}</p>
                <p className="text-xl font-semibold">{vital.value} <span className="text-sm text-gray-500">{vital.unit}</span></p>
              </div>
            );
          }) : (
            <div className="col-span-4 text-center text-gray-500 py-8">
              No vital signs data available
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
              <button 
                onClick={() => setActiveTab('appointments')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-3">
              {appointments && appointments.length > 0 ? appointments.slice(0, 2).map((appointment, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{appointment.type}</p>
                    <p className="text-sm text-gray-600">{appointment.doctor}</p>
                    <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center text-gray-500 py-4">
                  No upcoming appointments
                </div>
              )}
            </div>
          </div>

          {/* Current Medications */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Current Medications</h2>
              <button 
                onClick={() => setActiveTab('current-meds')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-3">
              {currentMedications && currentMedications.length > 0 ? currentMedications.map((med, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Pill className="w-5 h-5 text-green-600 mr-3" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{med.name}</p>
                    <p className="text-sm text-gray-600">{med.frequency}</p>
                    <p className="text-sm text-blue-600">Next dose: {med.nextDose}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center text-gray-500 py-4">
                  No current medications
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Health Insights */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Health Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights && insights.length > 0 ? insights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                insight.type === 'success' ? 'bg-green-50' :
                insight.type === 'info' ? 'bg-blue-50' : 'bg-purple-50'
              }`}>
                <h3 className={`font-medium mb-2 ${
                  insight.type === 'success' ? 'text-green-800' :
                  insight.type === 'info' ? 'text-blue-800' : 'text-purple-800'
                }`}>{insight.title}</h3>
                <p className={`text-sm ${
                  insight.type === 'success' ? 'text-green-700' :
                  insight.type === 'info' ? 'text-blue-700' : 'text-purple-700'
                }`}>{insight.message}</p>
              </div>
            )) : (
              <div className="col-span-3 text-center text-gray-500 py-4">
                No health insights available
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    const { currentMedications, previousMedications, healthCard, appointments } = data;

    switch(activeTab) {
      case 'home':
        return renderHome();
      case 'current-meds':
        return (
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Current Medications</h2>
            <div className="space-y-4">
              {currentMedications && currentMedications.length > 0 ? currentMedications.map((med, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900">{med.name}</h3>
                  <p className="text-gray-600">Frequency: {med.frequency}</p>
                  <p className="text-blue-600">Next dose: {med.nextDose}</p>
                  {med.prescribedBy && <p className="text-gray-600">Prescribed by: {med.prescribedBy}</p>}
                  {med.instructions && <p className="text-gray-600">Instructions: {med.instructions}</p>}
                </div>
              )) : (
                <div className="text-center text-gray-500 py-8">
                  No current medications found
                </div>
              )}
            </div>
          </div>
        );
      case 'previous-meds':
        return <Prescriptions prescriptions={prescriptions} />;
      case 'health-card':
        return (
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Health Card Information</h2>
            {healthCard ? (
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Health Insurance Card</h3>
                    <p className="text-blue-100">Primary Coverage</p>
                  </div>
                  <CreditCard className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <p><span className="text-blue-200">Member ID:</span> {healthCard.memberId}</p>
                  <p><span className="text-blue-200">Group:</span> {healthCard.group}</p>
                  <p><span className="text-blue-200">Plan:</span> {healthCard.plan}</p>
                  <p><span className="text-blue-200">Effective:</span> {healthCard.effective}</p>
                  {healthCard.provider && <p><span className="text-blue-200">Provider:</span> {healthCard.provider}</p>}
                  {healthCard.copay && <p><span className="text-blue-200">Copay:</span> {healthCard.copay}</p>}
                  {healthCard.balance && <p><span className="text-blue-200">Balance:</span> <span className="font-semibold text-green-300">{healthCard.balance}</span></p>}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No health card information available
              </div>
            )}
          </div>
        );
      case 'appointments':
        return (
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Appointments</h2>
              <button 
                onClick={() => setActiveTab('search-doctor')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Schedule New
              </button>
            </div>
            <div className="space-y-4">
              {appointments && appointments.length > 0 ? appointments.map((appointment, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{appointment.type}</h3>
                      <p className="text-gray-600">{appointment.doctor}</p>
                      <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                      {appointment.location && <p className="text-sm text-gray-500">Location: {appointment.location}</p>}
                    </div>
                    <button 
                      onClick={() => handleRescheduleClick(appointment)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-center text-gray-500 py-8">
                  No appointments scheduled
                </div>
              )}
            </div>
          </div>
        );
      default:
        return renderHome();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">{data.user?.name || 'Loading...'}</p>
              <p className="text-sm text-gray-500">Patient ID: {data.user?.id || 'Loading...'}</p>
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
              {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      {/* Reschedule Form Modal */}
      {showRescheduleForm && selectedAppointment && (
        <RescheduleForm
          appointment={selectedAppointment}
          onClose={handleCloseRescheduleForm}
          onSuccess={handleRescheduleSuccess}
        />
      )}
    </div>
  );
};

export default HealthDashboard;