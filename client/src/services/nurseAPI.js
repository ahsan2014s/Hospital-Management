const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Nurse API functions
export const nurseAPI = {
  // Get complete nurse data
  getNurseData: () => apiRequest('/nurse'),
  
  // Get all assigned patients
  getPatients: () => apiRequest('/nurse/patients'),
  
  // Get specific patient by ID
  getPatientById: (patientId) => apiRequest(`/nurse/patients/${patientId}`),
  
  // Get nurse overview data
  getOverview: () => apiRequest('/nurse/overview'),
};

export default nurseAPI;