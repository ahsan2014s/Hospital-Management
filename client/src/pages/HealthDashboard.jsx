import React, { useState, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';

// Hooks
import { useHealthData } from '../hooks/useHealthData';
import { useResponsive } from '../hooks/useResponsive';

// Components
import LoadingScreen from '../components/HealthDashboardComponents/LoadingScreen';
import ErrorScreen from '../components/HealthDashboardComponents/ErrorScreen';
import Sidebar from '../components/HealthDashboardComponents/Sidebar';
import MobileNavigation from '../components/HealthDashboardComponents/MobileNavigation';
import Header from '../components/HealthDashboardComponents/Header';
import WelcomeSection from '../components/HealthDashboardComponents/WelcomeSection';
import VitalCard from '../components/HealthDashboardComponents/VitalCard';
import AppointmentCard from '../components/HealthDashboardComponents/AppointmentCard';
import MedicationCard from '../components/HealthDashboardComponents/MedicationCard';
import HealthInsights from '../components/HealthDashboardComponents/HealthInsights';
import CurrentMedications from '../components/HealthDashboardComponents/CurrentMedications';
import PreviousMedications from '../components/HealthDashboardComponents/PreviousMedications';
import HealthCard from '../components/HealthDashboardComponents/HealthCard';
import Appointments from '../components/HealthDashboardComponents/Appointments';
import DoctorCard from '../components/HealthDashboardComponents/DoctorCard';
import SearchBar from '../components/HealthDashboardComponents/SearchBar';
import FilterComponent from '../components/HealthDashboardComponents/FilterComponent';

const HealthDashboard = () =>  {
  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    specialty: 'All',
    availability: 'All',
    rating: 'All'
  });

  const { data, loading, error } = useHealthData();
  const { isMobile, isTablet } = useResponsive();

  // Loading component
  if (loading) {
    return <LoadingScreen />;
  }

  // Error component
  if (error) {
    return <ErrorScreen error={error} />;
  }

  const { user, vitals, appointments, currentMedications, previousMedications, healthCard, insights } = data;

  const renderHome = () => {
    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <WelcomeSection user={user} />

        {/* Quick Stats - Vitals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vitals && vitals.length > 0 ? vitals.map((vital, index) => (
            <VitalCard key={index} vital={vital} />
          )) : (
            <div className="col-span-4 text-center text-gray-500 py-8">
              No vital signs data available
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 shadow-sm">
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
                <AppointmentCard key={index} appointment={appointment} compact={true} />
              )) : (
                <div className="text-center text-gray-500 py-4">
                  No upcoming appointments
                </div>
              )}
            </div>
          </div>

          {/* Current Medications */}
          <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 shadow-sm">
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
              {currentMedications && currentMedications.length > 0 ? currentMedications.slice(0, 2).map((med, index) => (
                <MedicationCard key={index} medication={med} compact={true} />
              )) : (
                <div className="text-center text-gray-500 py-4">
                  No current medications
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Health Insights */}
        <HealthInsights insights={insights} />
      </div>
    );
  };

  const renderDoctors = () => {
  

  // Mock doctor data
  const mockDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      expertise: 'Cardiology', // Updated to match filter options
      rating: 4.9,
      reviews: 203,
      availability: 'Today', // Simplified availability
      location: 'Heart Center, 123 Medical Dr',
      photo: null
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      expertise: 'Neurology',
      rating: 4.8,
      reviews: 156,
      availability: 'This Week',
      location: 'Brain Institute, 456 Health Ave',
      photo: null
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      expertise: 'General Practice', // Updated to match filter options
      rating: 4.7,
      reviews: 89,
      availability: 'This Week',
      location: 'Children\'s Clinic, 789 Care St',
      photo: null
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      expertise: 'Dermatology',
      rating: 5.0,
      reviews: 127,
      availability: 'Next Week',
      location: 'Skin Care Center, 321 Health Blvd',
      photo: null
    }
  ];

  // Handle search functionality
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Apply search and filters to doctors
  const filteredDoctors = mockDoctors.filter(doctor => {
    // Search filter
    if (searchTerm && !doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !doctor.expertise.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Specialty filter
    if (searchFilters.specialty !== 'All' && doctor.expertise !== searchFilters.specialty) {
      return false;
    }

    // Availability filter
    if (searchFilters.availability !== 'All' && doctor.availability !== searchFilters.availability) {
      return false;
    }

    // Rating filter
    if (searchFilters.rating !== 'All') {
      let minRating = 0;
      switch (searchFilters.rating) {
        case '4+ Stars':
          minRating = 4.0;
          break;
        case '4.5+ Stars':
          minRating = 4.5;
          break;
        case '5 Stars':
          minRating = 5.0;
          break;
      }
      if (doctor.rating < minRating) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search doctors by name or specialty..."
        />
        <FilterComponent 
          filters={searchFilters} 
          setFilters={setSearchFilters} 
        />
      </div>
      
      {/* Results count */}
      <div className="text-sm text-gray-600">
        Showing {filteredDoctors.length} of {mockDoctors.length} doctors
        {searchTerm && (
          <span> for "{searchTerm}"</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            <p>No doctors found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSearchFilters({ specialty: 'All', availability: 'All', rating: 'All' });
              }}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return renderHome();
      case 'current-meds':
        return <CurrentMedications medications={currentMedications} />;
      case 'previous-meds':
        return <PreviousMedications medications={previousMedications} />;
      case 'health-card':
        return <HealthCard healthCard={healthCard} />;
      case 'appointments':
        return <Appointments appointments={appointments} />;
      case 'search-doctor':
        return renderDoctors();
      default:
        return renderHome();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      {!isMobile && (
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          user={user} 
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Removed mobile menu props since we're using bottom nav */}
        <Header 
          activeTab={activeTab} 
          isMobile={isMobile}
        />

        {/* Content */}
        <main className={`flex-1 overflow-y-auto p-4 md:p-6 ${isMobile ? 'pb-20' : ''}`}>
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

export default HealthDashboard;