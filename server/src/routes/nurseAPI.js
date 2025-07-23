import express from 'express';
import { nurseData } from '../data/nursedummyData.js';

const nurseRouter = express.Router();

// GET /api/nurse - Get nurse data
nurseRouter.get('/nurse', (req, res) => {
  try {
    res.json(nurseData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch nurse data' });
  }
});

// GET /api/nurse/patients - Get all assigned patients
nurseRouter.get('/nurse/patients', (req, res) => {
  try {
    res.json(nurseData.assignedPatients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patients data' });
  }
});

// GET /api/nurse/patients/:patientId - Get specific patient by ID
nurseRouter.get('/nurse/patients/:patientId', (req, res) => {
  try {
    const patient = nurseData.assignedPatients.find(p => p.patientId === req.params.patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patient data' });
  }
});

// GET /api/nurse/overview - Get nurse overview data
nurseRouter.get('/nurse/overview', (req, res) => {
  try {
    const overview = {
      nurseInfo: {
        _id: nurseData._id,
        nurseId: nurseData.nurseId,
        firstName: nurseData.firstName,
        lastName: nurseData.lastName,
        email: nurseData.email,
        phone: nurseData.phone,
        department: nurseData.department,
        shift: nurseData.shift,
        licenseNumber: nurseData.licenseNumber,
        hireDate: nurseData.hireDate
      },
      stats: {
        totalPatients: nurseData.assignedPatients.length,
        medicationsDue: nurseData.assignedPatients.reduce((total, patient) => 
          total + patient.medications.filter(med => 
            new Date(`2024-07-20 ${med.nextDue}`) <= new Date(`2024-07-20 ${new Date().getHours()}:${new Date().getMinutes()}`)
          ).length, 0
        ),
        activeDoctors: new Set(nurseData.assignedPatients.flatMap(p => p.assignedDoctors.map(d => d.doctorId))).size
      }
    };
    res.json(overview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch overview data' });
  }
});

export default nurseRouter;