// frontend/src/services/patientAPI.js

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const healthAPI = {
  // Get user data
  getUser: async () => {
    const response = await fetch(`${API_BASE_URL}/api/user`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  },

  // Get vitals data
  getVitals: async () => {
    const response = await fetch(`${API_BASE_URL}/api/vitals`);
    if (!response.ok) {
      throw new Error('Failed to fetch vitals');
    }
    return response.json();
  },

  // Get appointments
  getAppointments: async () => {
    const response = await fetch(`${API_BASE_URL}/api/appointments`);
    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }
    return response.json();
  },

  // Get current medications
  getCurrentMedications: async () => {
    const response = await fetch(`${API_BASE_URL}/api/medications/current`);
    if (!response.ok) {
      throw new Error('Failed to fetch current medications');
    }
    return response.json();
  },

  // Get previous medications
  getPreviousMedications: async () => {
    const response = await fetch(`${API_BASE_URL}/api/medications/previous`);
    if (!response.ok) {
      throw new Error('Failed to fetch previous medications');
    }
    return response.json();
  },

  // Get health card
  getHealthCard: async () => {
    const response = await fetch(`${API_BASE_URL}/api/health-card`);
    if (!response.ok) {
      throw new Error('Failed to fetch health card');
    }
    return response.json();
  },

  // Get insights
  getInsights: async () => {
    const response = await fetch(`${API_BASE_URL}/api/insights`);
    if (!response.ok) {
      throw new Error('Failed to fetch insights');
    }
    return response.json();
  },

  // Get dashboard data
  getDashboardData: async () => {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/patients`);
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard dataRR');
    }
    return response.json();
  }
};

export default healthAPI;