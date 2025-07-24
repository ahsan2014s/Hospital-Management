//pages/DoctorDashboard.js

import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/DoctorDashboardComponents/ErrorDisplay';
import WelcomeSection from '../components/DoctorDashboardComponents/WelcomeSection';
import StatsGrid from '../components/DoctorDashboardComponents/StatsGrid';
import NextPatients from '../components/DoctorDashboardComponents/NextPatients';
import CDCAlerts from '../components/DoctorDashboardComponents/CDCAlerts';
import ContactInfo from '../components/DoctorDashboardComponents/ContactInfo';
import WaitingList from '../components/DoctorDashboardComponents/WaitingList';
import CDCPandemics from '../components/DoctorDashboardComponents/CDCPandemics';
import CDCRecommendations from '../components/DoctorDashboardComponents/CDCRecommendations';
import Sidebar from '../components/DoctorDashboardComponents/Sidebar';
import Header from '../components/DoctorDashboardComponents/Header';
import MobileNavigation from '../components/DoctorDashboardComponents/MobileNavigation';
import { useDashboardData } from '../hooks/useDoctorDashboardData';
import { useResponsive } from '../hooks/useResponsive';

const DoctorsHealthDashboard = () => {
  const { 
    data, loading, error, activeTab, setActiveTab
  } = useDashboardData();

  const { isMobile, isTablet } = useResponsive();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  const { doctorInfo, waitingPatients, todayStats, cdcData } = data;

  const renderDashboard = () => (
    <div className="space-y-6">
      <WelcomeSection doctorInfo={doctorInfo} />
      <StatsGrid todayStats={todayStats} />
      
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <NextPatients 
    waitingPatients={waitingPatients} 
    setActiveTab={setActiveTab}  // Changed from onViewAll
  />
  <CDCAlerts 
    cdcData={cdcData} 
    setActiveTab={setActiveTab}  // Changed from onViewAll
  />
</div>
      
      <ContactInfo doctorInfo={doctorInfo} />
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'waiting-list':
        return <WaitingList waitingPatients={waitingPatients} />;
      case 'cdc-pandemics':
        return <CDCPandemics cdcData={cdcData} />;
      case 'cdc-recommendations':
        return <CDCRecommendations cdcData={cdcData} />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop/Tablet Sidebar - Hidden on mobile */}
      {!isMobile && (
        <Sidebar 
          doctorInfo={doctorInfo}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeTab={activeTab} doctorInfo={doctorInfo} />
        
        <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 ${
          isMobile ? 'pb-20' : '' 
        }`}>
          {renderContent()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobile={isMobile} 
      />
    </div>
  );
};

export default DoctorsHealthDashboard;
