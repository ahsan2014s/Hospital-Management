import React, { useState, useEffect } from 'react';
import { Menu, X, AlertCircle } from 'lucide-react';
import Sidebar from '../components/AdminDashBoardComponents/Sidebar';
import DashboardContent from '../components/AdminDashBoardComponents/DashboardContent';
import PatientsContent from '../components/AdminDashBoardComponents/PatientsContent';
import DoctorsContent from '../components/AdminDashBoardComponents/DoctorsContent';
import NursesContent from '../components/AdminDashBoardComponents/NurseContent';
import StaffContent from '../components/AdminDashBoardComponents/StaffContent';
import AppointmentsContent from '../components/AdminDashBoardComponents/AppointmentContent';
import RoomsContent from '../components/AdminDashBoardComponents/RoomsContent';
import InventoryContent from '../components/AdminDashBoardComponents/InventoryContent';
import FinancialsContent from '../components/AdminDashBoardComponents/FinancialsContent';
import ReportsContent from '../components/AdminDashBoardComponents/ReportsContent';
import SettingsContent from '../components/AdminDashBoardComponents/SettingsContent';
import LoadingSpinner from '../components/LoadingSpinner';
import { menuItems } from '../config/menuItems';
import { useDashboardData } from '../hooks/useAdminDashBoardData';
import ApiService from '../services/adminAPI';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { 
    dashboardData, 
    patients, 
    doctors, 
    nurses, 
    appointments, 
    inventory, 
    roomData, 
    reportsData, 
    loading 
  } = useDashboardData();

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    const contentProps = {
      dashboardData,
      patients,
      doctors,
      nurses,
      appointments,
      inventory,
      roomData,
      reportsData
    };

    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent {...contentProps} />;
      case 'patients':
        return <PatientsContent patients={patients} />;
      case 'doctors':
        return <DoctorsContent doctors={doctors} />;
      case 'nurses':
        return <NursesContent nurses={nurses} />;
      case 'staff':
        return <StaffContent />;
      case 'appointments':
        return <AppointmentsContent appointments={appointments} />;
      case 'rooms':
        return <RoomsContent roomData={roomData} />;
      case 'inventory':
        return <InventoryContent inventory={inventory} />;
      case 'financials':
        return <FinancialsContent dashboardData={dashboardData} />;
      case 'reports':
        return <ReportsContent {...contentProps} />;
      case 'settings':
        return <SettingsContent doctors={doctors} nurses={nurses} />;
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {menuItems.find(item => item.id === activeSection)?.label}
            </h2>
            <p className="text-gray-600">Content for {activeSection} section will be implemented here.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
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
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <AlertCircle className="w-4 h-4" />
                <span>3 alerts</span>
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;