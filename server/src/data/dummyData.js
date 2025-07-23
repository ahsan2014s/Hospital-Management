// backend/src/data/dummyData.js
const doctorInfo = {
  name: 'Dr. Sarah Johnson',
  specialty: 'Internal Medicine',
  license: 'MD123456',
  phone: '+1 (555) 123-4567',
  email: 'dr.johnson@hospital.com',
  department: 'Internal Medicine',
  yearsExperience: 12,
  patients: 1247,
  appointmentsToday: 8
};

const waitingPatients = [
  { 
    id: 'P001', 
    name: 'John Smith', 
    age: 45, 
    reason: 'Annual Checkup', 
    priority: 'routine',
    waitTime: '15 min',
    status: 'waiting',
    lastVisit: '2024-12-15'
  },
  { 
    id: 'P002', 
    name: 'Maria Garcia', 
    age: 32, 
    reason: 'Chest Pain', 
    priority: 'urgent',
    waitTime: '5 min',
    status: 'ready',
    lastVisit: '2025-01-10'
  },
  { 
    id: 'P003', 
    name: 'Robert Wilson', 
    age: 67, 
    reason: 'Diabetes Follow-up', 
    priority: 'routine',
    waitTime: '25 min',
    status: 'waiting',
    lastVisit: '2025-06-20'
  },
  { 
    id: 'P004', 
    name: 'Emily Chen', 
    age: 28, 
    reason: 'Pregnancy Checkup', 
    priority: 'priority',
    waitTime: '8 min',
    status: 'in-progress',
    lastVisit: '2025-06-15'
  },
  { 
    id: 'P005', 
    name: 'David Brown', 
    age: 55, 
    reason: 'Hypertension Review', 
    priority: 'routine',
    waitTime: '12 min',
    status: 'waiting',
    lastVisit: '2025-04-22'
  }
];

const todayStats = {
  totalPatients: 8,
  completed: 3,
  waiting: 4,
  inProgress: 1,
  avgWaitTime: '12 min'
};

const cdcData = {
  pandemics: [
    {
      id: 1,
      name: 'COVID-19',
      status: 'Ongoing',
      lastUpdate: '2025-07-18',
      severity: 'moderate',
      description: 'Coronavirus disease continues to circulate globally with new variants being monitored.',
      recommendations: ['Continue vaccination programs', 'Monitor for new variants', 'Maintain hygiene protocols']
    },
    {
      id: 2,
      name: 'Mpox (Monkeypox)',
      status: 'Controlled',
      lastUpdate: '2025-07-15',
      severity: 'low',
      description: 'Mpox cases remain at low levels with effective containment measures in place.',
      recommendations: ['Targeted vaccination for high-risk groups', 'Enhanced surveillance']
    }
  ],
  recommendations: [
    {
      id: 1,
      title: 'Updated Respiratory Illness Guidelines',
      category: 'Clinical Practice',
      date: '2025-07-18',
      priority: 'high',
      summary: 'New guidelines for managing respiratory illnesses in primary care settings.',
      details: 'Updated protocols for diagnosing and treating common respiratory conditions.'
    },
    {
      id: 2,
      title: 'Antimicrobial Resistance Prevention',
      category: 'Public Health',
      date: '2025-07-16',
      priority: 'medium',
      summary: 'Latest strategies to combat antimicrobial resistance in clinical practice.',
      details: 'Evidence-based approaches to antibiotic stewardship and resistance prevention.'
    }
  ]
};

export { 
  doctorInfo,
  waitingPatients,
  todayStats,
  cdcData
};
