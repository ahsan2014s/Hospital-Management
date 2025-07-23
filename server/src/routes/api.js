import express from 'express';
import { doctorInfo, waitingPatients, todayStats, cdcData } from '../data/dummyData.js';

const router = express.Router();

// Get all dashboard data
router.get('/dashboard', (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        doctorInfo,
        waitingPatients,
        todayStats,
        cdcData
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get doctor info
router.get('/doctor', (req, res) => {
  try {
    res.json({
      success: true,
      data: doctorInfo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get waiting patients
router.get('/patients', (req, res) => {
  try {
    res.json({
      success: true,
      data: waitingPatients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get today's stats
router.get('/stats', (req, res) => {
  try {
    res.json({
      success: true,
      data: todayStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get CDC data
router.get('/cdc', (req, res) => {
  try {
    res.json({
      success: true,
      data: cdcData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

export default router;