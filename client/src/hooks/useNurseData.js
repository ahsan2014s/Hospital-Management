// hooks/useNurseData.js

import { useState, useEffect } from 'react';
import { nurseAPI } from '../services/nurseAPI';

export const useNurseData = () => {
  const [nurseData, setNurseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNurseData = async () => {
      try {
        setLoading(true);
        const data = await nurseAPI.getNurseData();
        setNurseData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load nurse data');
        console.error('Error fetching nurse data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNurseData();
  }, []);

  const refetchData = async () => {
    try {
      setLoading(true);
      const data = await nurseAPI.getNurseData();
      setNurseData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load nurse data');
      console.error('Error fetching nurse data:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    nurseData,
    loading,
    error,
    refetchData
  };
};