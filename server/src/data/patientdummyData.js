// backend/src/data/patientdummyData.js

export const userData = {
  id: "P12345",
  name: "John Doe",
  email: "john.doe@email.com",
  patientId: "P12345"
};

export const vitalSigns = [
  { 
    id: 1,
    label: 'Blood Pressure', 
    value: '120/80', 
    unit: 'mmHg', 
    icon: 'Heart', 
    status: 'normal',
    timestamp: '2025-07-20T08:00:00Z'
  },
  { 
    id: 2,
    label: 'Heart Rate', 
    value: '72', 
    unit: 'bpm', 
    icon: 'Activity', 
    status: 'normal',
    timestamp: '2025-07-20T08:00:00Z'
  },
  { 
    id: 3,
    label: 'Temperature', 
    value: '98.6', 
    unit: '°F', 
    icon: 'Thermometer', 
    status: 'normal',
    timestamp: '2025-07-20T08:00:00Z'
  },
  { 
    id: 4,
    label: 'Weight', 
    value: '165', 
    unit: 'lbs', 
    icon: 'Scale', 
    status: 'normal',
    timestamp: '2025-07-20T07:30:00Z'
  }
];

export const upcomingAppointments = [
  { 
    id: 1,
    date: '2025-07-25', 
    time: '10:00 AM', 
    doctor: 'Dr. Sarah Johnson', 
    type: 'General Checkup',
    location: 'Main Clinic - Room 101',
    status: 'scheduled'
  },
  { 
    id: 2,
    date: '2025-08-02', 
    time: '2:30 PM', 
    doctor: 'Dr. Michael Chen', 
    type: 'Cardiology Follow-up',
    location: 'Cardiology Wing - Room 205',
    status: 'scheduled'
  },
  { 
    id: 3,
    date: '2025-08-10', 
    time: '9:15 AM', 
    doctor: 'Dr. Emily Rodriguez', 
    type: 'Lab Results Review',
    location: 'Main Clinic - Room 103',
    status: 'scheduled'
  }
];

export const currentMedications = [
  { 
    id: 1,
    name: 'Lisinopril 10mg', 
    frequency: 'Once daily', 
    nextDose: '8:00 AM tomorrow',
    prescribedBy: 'Dr. Michael Chen',
    startDate: '2025-01-15',
    instructions: 'Take with water, preferably in the morning'
  },
  { 
    id: 2,
    name: 'Metformin 500mg', 
    frequency: 'Twice daily', 
    nextDose: '6:00 PM today',
    prescribedBy: 'Dr. Sarah Johnson',
    startDate: '2025-02-01',
    instructions: 'Take with meals to reduce stomach upset'
  },
  { 
    id: 3,
    name: 'Vitamin D3 1000IU', 
    frequency: 'Once daily', 
    nextDose: '8:00 AM tomorrow',
    prescribedBy: 'Dr. Sarah Johnson',
    startDate: '2025-03-01',
    instructions: 'Take with food for better absorption'
  }
];

export const previousMedications = [
  {
    id: 1,
    name: 'Amoxicillin 500mg',
    duration: 'March 1-10, 2025',
    reason: 'Bacterial infection treatment',
    prescribedBy: 'Dr. Sarah Johnson',
    completedDate: '2025-03-10'
  },
  {
    id: 2,
    name: 'Ibuprofen 400mg',
    duration: 'February 15-20, 2025',
    reason: 'Post-surgery pain management',
    prescribedBy: 'Dr. Emily Rodriguez',
    completedDate: '2025-02-20'
  }
];

export const healthCard = {
  memberId: 'HC123456789',
  group: 'EMP001',
  plan: 'Premium Health Plus',
  effective: 'Jan 01, 2025',
  provider: 'HealthCare Plus',
  copay: '$25',
  deductible: '$1000',
  network: 'Preferred Provider Network'
};

export const healthInsights = [
  {
    id: 1,
    type: 'success',
    title: 'Great Progress!',
    message: 'Your blood pressure readings have been consistently in the normal range for the past month.',
    category: 'vitals'
  },
  {
    id: 2,
    type: 'reminder',
    title: 'Medication Reminder',
    message: "Don't forget to take your evening Metformin dose at 6:00 PM today.",
    category: 'medication'
  },
  {
    id: 3,
    type: 'info',
    title: 'Upcoming Lab Work',
    message: 'Schedule your quarterly blood work before your next appointment with Dr. Chen.',
    category: 'appointment'
  }
];