const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const apiService = {
  // Get all dashboard data
  getDashboardData: async () => {
    const response = await fetch(`${API_BASE_URL}/api/dashboard`);
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    return response.json();
  },

  // Get doctor info
  getDoctorData: async () => {
    const response = await fetch(`${API_BASE_URL}/api/doctor`);
    if (!response.ok) {
      throw new Error('Failed to fetch doctor data');
    }
    return response.json();
  },
  
  // Get waiting patients
  getPatients: async () => {
    const response = await fetch(`${API_BASE_URL}/api/patients`);
    if (!response.ok) {
      throw new Error('Failed to fetch patients');
    }
    return response.json();
  },

  // Get today's stats
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/api/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }
    return response.json();
  },

  // Get CDC data
  getCdcData: async () => {
    const response = await fetch(`${API_BASE_URL}/api/cdc`);
    if (!response.ok) {
      throw new Error('Failed to fetch CDC data');
    }
    return response.json();
  }
};