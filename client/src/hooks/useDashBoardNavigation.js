import { useState } from 'react';

export const useDashboardNavigation = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const navigateToOverview = () => {
    setActiveTab('overview');
    setSelectedPatient(null);
  };

  const navigateToPatient = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('patient');
  };

  return {
    selectedPatient,
    activeTab,
    navigateToOverview,
    navigateToPatient,
    setSelectedPatient,
    setActiveTab
  };
};