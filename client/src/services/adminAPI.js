const API_BASE_URL = 'http://localhost:5000/api/admin';

const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

const ApiService = {
  // Dashboard stats
  getDashboardStats: () => request('/stats'),

  // Patients
  getPatients: () => request('/patients'),
  getPatientById: (id) => request(`/patients/${id}`),

  // Staff
  getDoctors: () => request('/doctors'),
  getNurses: () => request('/nurses'),
  getAllStaff: () => request('/staff'),
  createStaff: (staffData) =>
    request('/staff', {
      method: 'POST',
      body: JSON.stringify(staffData),
    }),

  // Appointments
  getAppointments: () => request('/appointments'),

  // Departments
  getDepartments: () => request('/departments'),

  // Inventory
  getInventory: () => request('/inventory'),

  // Financials
  getFinancialData: () => request('/financials'),

  // Activities
  getRecentActivities: () => request('/activities'),

  // Rooms
  getRoomData: () => request('/rooms'),

  // Reports
  getReportsData: () => request('/reports'),
};

export default ApiService;
