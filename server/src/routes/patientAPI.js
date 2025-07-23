// backend/src/routes/api.js
import express from 'express';
import {
  userData,
  vitalSigns,
  upcomingAppointments,
  currentMedications,
  previousMedications,
  healthCard,
  healthInsights
} from '../data/patientdummyData.js';

const patientRouter = express.Router();

// GET /api/user - Get user information
patientRouter.get('/user', (req, res) => {
  try {
    res.json({
      success: true,
      data: userData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user data',
      error: error.message
    });
  }
});

// GET /api/vitals - Get vital signs
patientRouter.get('/vitals', (req, res) => {
  try {
    res.json({
      success: true,
      data: vitalSigns
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vital signs',
      error: error.message
    });
  }
});

// GET /api/appointments - Get upcoming appointments
patientRouter.get('/appointments', (req, res) => {
  try {
    res.json({
      success: true,
      data: upcomingAppointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
});

// GET /api/medications/current - Get current medications
patientRouter.get('/medications/current', (req, res) => {
  try {
    res.json({
      success: true,
      data: currentMedications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching current medications',
      error: error.message
    });
  }
});

// GET /api/medications/previous - Get previous medications
patientRouter.get('/medications/previous', (req, res) => {
  try {
    res.json({
      success: true,
      data: previousMedications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching previous medications',
      error: error.message
    });
  }
});

// GET /api/health-card - Get health card information
patientRouter.get('/health-card', (req, res) => {
  try {
    res.json({
      success: true,
      data: healthCard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching health card',
      error: error.message
    });
  }
});

// GET /api/insights - Get health insights
patientRouter.get('/insights', (req, res) => {
  try {
    res.json({
      success: true,
      data: healthInsights
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching health insights',
      error: error.message
    });
  }
});

// GET /api/dashboard - Get all dashboard data in one call
patientRouter.get('/dashboard/patients', (req, res) => {
  try {
    const dashboardData = {
      user: userData,
      vitals: vitalSigns,
      appointments: upcomingAppointments.slice(0, 2), // Only first 2 for dashboard
      medications: currentMedications.slice(0, 2), // Only first 2 for dashboard
      insights: healthInsights
    };
    
    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
});

export default patientRouter;