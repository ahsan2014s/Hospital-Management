// NurseDashboard.jsx
import React from 'react';
import { useNurseData } from '../hooks/useNurseData';
import { useDashboardNavigation } from '../hooks/useDashBoardNavigation';
import { useResponsive } from '../hooks/useResponsive';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/NurseDashBoardComponents/ErrorDisplay';
import Sidebar from '../components/NurseDashBoardComponents/Sidebar';
import DashboardHeader from '../components/NurseDashBoardComponents/DashBoardHeader';
import NurseOverview from '../components/NurseDashBoardComponents/NurseOverview';
import PatientDetail from '../components/NurseDashBoardComponents/PatientDetail';
import MobileNavigation from '../components/NurseDashBoardComponents/NavigationTab';

const NurseDashboard = () => {
  const { nurseData, loading, error, refetchData } = useNurseData();
  const {
    selectedPatient,
    activeTab,
    navigateToOverview,
    navigateToPatient
  } = useDashboardNavigation();
  const { isMobile, isTablet } = useResponsive();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay />;
  }

  if (!nurseData) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="w-80 bg-white shadow-lg">
          <Sidebar
            nurseData={nurseData}
            activeTab={activeTab}
            selectedPatient={selectedPatient}
            onNavigateToOverview={navigateToOverview}
            onNavigateToPatient={navigateToPatient}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Header - keeping your original implementation */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <DashboardHeader 
            activeTab={activeTab}
            selectedPatient={selectedPatient}
            nurseData={nurseData}
          />
        </div>
        
        {/* Mobile Navigation - appears under header on mobile */}
        {isMobile && (
          <MobileNavigation
            nurseData={nurseData}
            activeTab={activeTab}
            selectedPatient={selectedPatient}
            onNavigateToOverview={navigateToOverview}
            onNavigateToPatient={navigateToPatient}
          />
        )}

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {activeTab === 'overview' ? (
            <NurseOverview nurseData={nurseData} />
          ) : (
            selectedPatient && <PatientDetail patient={selectedPatient} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;