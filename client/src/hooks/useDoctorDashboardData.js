// hooks/useDoctorDashboardData.js

import { useState, useEffect } from 'react';
import { apiService } from '../services/doctorAPI';

export const useDashboardData = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    doctorInfo: {},
    waitingPatients: [],
    todayStats: {},
    cdcData: { pandemics: [], recommendations: [] }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Attempting to fetch dashboard data...');
        
        const response = await apiService.getDashboardData();
        
        console.log('API Response:', response);
        
        if (response.success) {
          console.log('Data received:', response.data);
          setData(response.data);
          
        } else {
          console.error('API returned success: false', response);
          throw new Error(response.message || 'Failed to fetch dashboard data');
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

  return { data, loading, error, activeTab, setActiveTab };
};