// backend/src/routes/adminAPI.js
import express from 'express';
import { dummyData } from '../data/admindummyData.js';

const adminRouter = express.Router();

// Get dashboard statistics
adminRouter.get('/stats', (req, res) => {
  try {
    res.json({
      success: true,
      data: dummyData.statsCards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
});

// Get all patients
adminRouter.get('/patients', (req, res) => {
  try {
    res.json({
      success: true,
      data: dummyData.patients,
      total: dummyData.patients.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching patients',
      error: error.message
    });
  }
});

// Get patient by ID
adminRouter.get('/patients/:id', (req, res) => {
  try {
    const patient = dummyData.patients.find(p => p._id === req.params.id);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    res.json({
      success: true,
      data: patient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching patient',
      error: error.message
    });
  }
});

// Get all doctors
adminRouter.get('/doctors', (req, res) => {
  try {
    const doctors = dummyData.users.filter(user => user.role === 'doctor');
    res.json({
      success: true,
      data: doctors,
      total: doctors.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching doctors',
      error: error.message
    });
  }
});

// Get all nurses
adminRouter.get('/nurses', (req, res) => {
  try {
    const nurses = dummyData.users.filter(user => user.role === 'nurse');
    res.json({
      success: true,
      data: nurses,
      total: nurses.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching nurses',
      error: error.message
    });
  }
});

// Get all staff
adminRouter.get('/staff', (req, res) => {
  try {
    res.json({
      success: true,
      data: dummyData.users,
      total: dummyData.users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching staff',
      error: error.message
    });
  }
});

// Create new staff member
adminRouter.post('/staff', (req, res) => {
  try {
    const newStaff = {
      _id: Date.now().toString(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active'
    };
    dummyData.users.push(newStaff);
    res.status(201).json({
      success: true,
      data: newStaff,
      message: 'Staff member registered successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering staff member',
      error: error.message
    });
  }
});

// Get all appointments
adminRouter.get('/appointments', (req, res) => {
  try {
    res.json({
      success: true,
      data: dummyData.appointments,
      total: dummyData.appointments.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
});

// Get all departments
adminRouter.get('/departments', (req, res) => {
  try {
    res.json({
      success: true,
      data: dummyData.departments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching departments',
      error: error.message
    });
  }
});

// Get inventory
adminRouter.get('/inventory', (req, res) => {
  try {
    res.json({
      success: true,
      data: dummyData.inventory,
      total: dummyData.inventory.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching inventory',
      error: error.message
    });
  }
});

// Get financial data
adminRouter.get('/financials', (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        transactions: dummyData.financial,
        summary: dummyData.financialSummary,
        departmentRevenue: dummyData.departments.map(dept => ({
          name: dept.name,
          revenue: dept.monthlyRevenue,
          patients: dept.currentPatients,
          occupancy: `${Math.round((dept.currentPatients / dept.capacity) * 100)}%`
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching financial data',
      error: error.message
    });
  }
});

// Get recent activities
adminRouter.get('/activities', (req, res) => {
  try {
    res.json({
      success: true,
      data: dummyData.recentActivities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recent activities',
      error: error.message
    });
  }
});

// Get room management data
adminRouter.get('/rooms', (req, res) => {
  try {
    const roomData = dummyData.departments.map(dept => ({
      department: dept.name,
      location: dept.location,
      capacity: dept.capacity,
      currentPatients: dept.currentPatients,
      occupancy: Math.round((dept.currentPatients / dept.capacity) * 100),
      availableRooms: dept.capacity - dept.currentPatients
    }));
    
    res.json({
      success: true,
      data: roomData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching room data',
      error: error.message
    });
  }
});

// Get reports data
adminRouter.get('/reports', (req, res) => {
  try {
    const reportsData = {
      patientStats: {
        total: dummyData.patients.length,
        admitted: dummyData.patients.filter(p => p.status === 'admitted').length,
        discharged: dummyData.patients.filter(p => p.status === 'discharged').length
      },
      staffStats: {
        total: dummyData.users.length,
        doctors: dummyData.users.filter(u => u.role === 'doctor').length,
        nurses: dummyData.users.filter(u => u.role === 'nurse').length
      },
      departmentStats: dummyData.departments.map(dept => ({
        name: dept.name,
        patients: dept.currentPatients,
        revenue: dept.monthlyRevenue,
        occupancy: `${Math.round((dept.currentPatients / dept.capacity) * 100)}%`,
        staff: dept.staff.doctors + dept.staff.nurses + dept.staff.technicians
      }))
    };
    
    res.json({
      success: true,
      data: reportsData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reports data',
      error: error.message
    });
  }
});

export default adminRouter;