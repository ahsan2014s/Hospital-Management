// // frontend/src/services/api.js

// const API_BASE_URL = 'http://localhost:5000/api/admin';

// class ApiService {
//   async request(endpoint, options = {}) {
//     const url = `${API_BASE_URL}${endpoint}`;
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         ...options.headers,
//       },
//       ...options,
//     };

//     try {
//       const response = await fetch(url, config);
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || 'API request failed');
//       }
      
//       return data;
//     } catch (error) {
//       console.error('API Error:', error);
//       throw error;
//     }
//   }

//   // Dashboard stats
//   async getDashboardStats() {
//     return this.request('/stats');
//   }

//   // Patients
//   async getPatients() {
//     return this.request('/patients');
//   }

//   async getPatientById(id) {
//     return this.request(`/patients/${id}`);
//   }

//   // Staff
//   async getDoctors() {
//     return this.request('/doctors');
//   }

//   async getNurses() {
//     return this.request('/nurses');
//   }

//   async getAllStaff() {
//     return this.request('/staff');
//   }

//   async createStaff(staffData) {
//     return this.request('/staff', {
//       method: 'POST',
//       body: JSON.stringify(staffData),
//     });
//   }

//   // Appointments
//   async getAppointments() {
//     return this.request('/appointments');
//   }

//   // Departments
//   async getDepartments() {
//     return this.request('/departments');
//   }

//   // Inventory
//   async getInventory() {
//     return this.request('/inventory');
//   }

//   // Financials
//   async getFinancialData() {
//     return this.request('/financials');
//   }

//   // Activities
//   async getRecentActivities() {
//     return this.request('/activities');
//   }

//   // Rooms
//   async getRoomData() {
//     return this.request('/rooms');
//   }

//   // Reports
//   async getReportsData() {
//     return this.request('/reports');
//   }
// }

// export default new ApiService();

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
