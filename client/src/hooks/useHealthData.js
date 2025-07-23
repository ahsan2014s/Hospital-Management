import { useState, useEffect } from 'react';
import { healthAPI } from '../services/patientAPI';

export const useHealthData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Removed navigation state - this should be in the component
  const [data, setData] = useState({
    user: null,
    vitals: [],
    appointments: [],
    currentMedications: [],
    previousMedications: [],
    healthCard: null,
    insights: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [
          dashboardResponse,
          previousMedsResponse,
          healthCardResponse
        ] = await Promise.all([
          healthAPI.getDashboardData(),
          healthAPI.getPreviousMedications(),
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
  }, []);

  // Only return data-related state, not navigation state
  return { data, loading, error };
};