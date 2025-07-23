// backend/src/data/admindummyData.js

export const dummyData = {
  // Users Collection
  users: [
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@hospital.com",
      role: "doctor",
      department: "Cardiology",
      phone: "+1-555-0123",
      specialization: "Interventional Cardiology",
      licenseNumber: "MD123456",
      salary: 180000,
      hireDate: new Date("2020-03-15"),
      status: "active",
      createdAt: new Date("2020-03-15"),
      updatedAt: new Date("2024-01-15")
    },
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j2",
      name: "Nurse Emily Davis",
      email: "emily.davis@hospital.com",
      role: "nurse",
      department: "Emergency",
      phone: "+1-555-0124",
      shift: "night",
      licenseNumber: "RN789012",
      salary: 75000,
      hireDate: new Date("2021-06-10"),
      status: "active",
      createdAt: new Date("2021-06-10"),
      updatedAt: new Date("2024-01-10")
    },
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j9",
      name: "Dr. Michael Chen",
      email: "michael.chen@hospital.com",
      role: "doctor",
      department: "Surgery",
      phone: "+1-555-0127",
      specialization: "Cardiac Surgery",
      licenseNumber: "MD234567",
      salary: 220000,
      hireDate: new Date("2019-08-22"),
      status: "active",
      createdAt: new Date("2019-08-22"),
      updatedAt: new Date("2024-01-12")
    },
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j10",
      name: "Nurse Jessica Brown",
      email: "jessica.brown@hospital.com",
      role: "nurse",
      department: "Pediatrics",
      phone: "+1-555-0128",
      shift: "day",
      licenseNumber: "RN890123",
      salary: 68000,
      hireDate: new Date("2022-02-14"),
      status: "active",
      createdAt: new Date("2022-02-14"),
      updatedAt: new Date("2024-01-08")
    },
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j11",
      name: "Dr. Lisa Rodriguez",
      email: "lisa.rodriguez@hospital.com",
      role: "doctor",
      department: "Emergency",
      phone: "+1-555-0129",
      specialization: "Emergency Medicine",
      licenseNumber: "MD345678",
      salary: 195000,
      hireDate: new Date("2021-01-10"),
      status: "active",
      createdAt: new Date("2021-01-10"),
      updatedAt: new Date("2024-01-14")
    }
  ],

  // Patients Collection
  patients: [
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j3",
      patientId: "PAT001",
      name: "John Smith",
      dateOfBirth: new Date("1985-07-20"),
      gender: "male",
      phone: "+1-555-0125",
      email: "john.smith@email.com",
      address: {
        street: "123 Main St",
        city: "Springfield",
        state: "IL",
        zipCode: "62701"
      },
      emergencyContact: {
        name: "Jane Smith",
        relation: "spouse",
        phone: "+1-555-0126"
      },
      insurance: {
        provider: "HealthCare Plus",
        policyNumber: "HC123456789",
        groupNumber: "GRP001"
      },
      medicalHistory: ["Hypertension", "Diabetes Type 2"],
      allergies: ["Penicillin", "Shellfish"],
      admissionDate: new Date("2024-01-15"),
      status: "admitted",
      assignedDoctor: "64f1a2b3c4d5e6f7g8h9i0j1",
      roomNumber: "A-201",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-16")
    },
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j12",
      patientId: "PAT002",
      name: "Maria Garcia",
      dateOfBirth: new Date("1992-03-15"),
      gender: "female",
      phone: "+1-555-0130",
      email: "maria.garcia@email.com",
      address: {
        street: "456 Oak Ave",
        city: "Springfield",
        state: "IL",
        zipCode: "62702"
      },
      emergencyContact: {
        name: "Carlos Garcia",
        relation: "husband",
        phone: "+1-555-0131"
      },
      insurance: {
        provider: "MediCare Pro",
        policyNumber: "MP987654321",
        groupNumber: "GRP002"
      },
      medicalHistory: ["Asthma"],
      allergies: ["Latex"],
      admissionDate: new Date("2024-01-18"),
      status: "discharged",
      assignedDoctor: "64f1a2b3c4d5e6f7g8h9i0j11",
      roomNumber: "B-105",
      createdAt: new Date("2024-01-18"),
      updatedAt: new Date("2024-01-20")
    },
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j13",
      patientId: "PAT003",
      name: "Robert Wilson",
      dateOfBirth: new Date("1978-11-30"),
      gender: "male",
      phone: "+1-555-0132",
      email: "robert.wilson@email.com",
      address: {
        street: "789 Pine St",
        city: "Springfield",
        state: "IL",
        zipCode: "62703"
      },
      emergencyContact: {
        name: "Susan Wilson",
        relation: "wife",
        phone: "+1-555-0133"
      },
      insurance: {
        provider: "HealthCare Plus",
        policyNumber: "HC246810121",
        groupNumber: "GRP001"
      },
      medicalHistory: ["High Cholesterol", "Previous Heart Attack"],
      allergies: ["Aspirin"],
      admissionDate: new Date("2024-01-22"),
      status: "admitted",
      assignedDoctor: "64f1a2b3c4d5e6f7g8h9i0j1",
      roomNumber: "A-305",
      createdAt: new Date("2024-01-22"),
      updatedAt: new Date("2024-01-22")
    }
  ],

  // Appointments Collection
  appointments: [
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j4",
      patientId: "64f1a2b3c4d5e6f7g8h9i0j3",
      doctorId: "64f1a2b3c4d5e6f7g8h9i0j1",
      appointmentDate: new Date("2024-01-20T10:00:00Z"),
      duration: 30,
      type: "consultation",
      department: "Cardiology",
      status: "completed",
      reason: "Regular checkup",
      notes: "Patient reports chest pain occasionally",
      fees: 200,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-20")
    },
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j14",
      patientId: "64f1a2b3c4d5e6f7g8h9i0j12",
      doctorId: "64f1a2b3c4d5e6f7g8h9i0j11",
      appointmentDate: new Date("2024-01-25T14:30:00Z"),
      duration: 45,
      type: "follow-up",
      department: "Emergency",
      status: "scheduled",
      reason: "Follow-up on respiratory issues",
      notes: "Patient recovering well from emergency treatment",
      fees: 150,
      createdAt: new Date("2024-01-18"),
      updatedAt: new Date("2024-01-18")
    },
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j15",
      patientId: "64f1a2b3c4d5e6f7g8h9i0j13",
      doctorId: "64f1a2b3c4d5e6f7g8h9i0j9",
      appointmentDate: new Date("2024-01-28T09:00:00Z"),
      duration: 60,
      type: "consultation",
      department: "Surgery",
      status: "scheduled",
      reason: "Pre-surgery consultation",
      notes: "Preparing for cardiac bypass surgery",
      fees: 300,
      createdAt: new Date("2024-01-22"),
      updatedAt: new Date("2024-01-22")
    }
  ],

  // Financial Records Collection
  financial: [
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j5",
      transactionId: "TXN001",
      patientId: "64f1a2b3c4d5e6f7g8h9i0j3",
      type: "income",
      category: "consultation",
      amount: 200,
      date: new Date("2024-01-20"),
      description: "Cardiology consultation",
      paymentMethod: "insurance",
      status: "completed",
      createdBy: "64f1a2b3c4d5e6f7g8h9i0j1",
      createdAt: new Date("2024-01-20"),
      updatedAt: new Date("2024-01-20")
    },
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j6",
      transactionId: "TXN002",
      type: "expense",
      category: "equipment",
      amount: 15000,
      date: new Date("2024-01-18"),
      description: "New ECG machine",
      vendor: "Medical Equipment Co.",
      status: "completed",
      createdBy: "admin",
      createdAt: new Date("2024-01-18"),
      updatedAt: new Date("2024-01-18")
    },
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j16",
      transactionId: "TXN003",
      patientId: "64f1a2b3c4d5e6f7g8h9i0j12",
      type: "income",
      category: "emergency",
      amount: 850,
      date: new Date("2024-01-18"),
      description: "Emergency room treatment",
      paymentMethod: "insurance",
      status: "completed",
      createdBy: "64f1a2b3c4d5e6f7g8h9i0j11",
      createdAt: new Date("2024-01-18"),
      updatedAt: new Date("2024-01-18")
    }
  ],

  // Inventory Collection
  inventory: [
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j7",
      itemCode: "MED001",
      name: "Paracetamol 500mg",
      category: "medication",
      currentStock: 500,
      minStock: 100,
      maxStock: 1000,
      unitPrice: 0.50,
      supplier: "PharmaCorp",
      expiryDate: new Date("2025-12-31"),
      location: "Pharmacy-A1",
      status: "available",
      createdAt: new Date("2023-06-01"),
      updatedAt: new Date("2024-01-15")
    },
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j17",
      itemCode: "MED002",
      name: "Aspirin 325mg",
      category: "medication",
      currentStock: 750,
      minStock: 200,
      maxStock: 1500,
      unitPrice: 0.25,
      supplier: "MediSupply Inc",
      expiryDate: new Date("2026-08-15"),
      location: "Pharmacy-A2",
      status: "available",
      createdAt: new Date("2023-08-10"),
      updatedAt: new Date("2024-01-12")
    }
  ],

  // Departments Collection
  departments: [
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j8",
      name: "Cardiology",
      head: "64f1a2b3c4d5e6f7g8h9i0j1",
      location: "Building A, Floor 3",
      capacity: 50,
      currentPatients: 32,
      monthlyRevenue: 125000,
      staff: {
        doctors: 8,
        nurses: 15,
        technicians: 5
      },
      equipment: ["ECG machines", "Cardiac monitors", "Defibrillators"],
      status: "active",
      createdAt: new Date("2020-01-01"),
      updatedAt: new Date("2024-01-15")
    },
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j18",
      name: "Emergency",
      head: "64f1a2b3c4d5e6f7g8h9i0j11",
      location: "Building B, Floor 1",
      capacity: 60,
      currentPatients: 45,
      monthlyRevenue: 189000,
      staff: {
        doctors: 12,
        nurses: 25,
        technicians: 8
      },
      equipment: ["X-ray machines", "CT scanners", "Life support systems"],
      status: "active",
      createdAt: new Date("2020-01-01"),
      updatedAt: new Date("2024-01-18")
    },
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j19",
      name: "Surgery",
      head: "64f1a2b3c4d5e6f7g8h9i0j9",
      location: "Building C, Floor 4",
      capacity: 35,
      currentPatients: 28,
      monthlyRevenue: 310000,
      staff: {
        doctors: 15,
        nurses: 20,
        technicians: 12
      },
      equipment: ["Operating tables", "Anesthesia machines", "Surgical instruments"],
      status: "active",
      createdAt: new Date("2020-01-01"),
      updatedAt: new Date("2024-01-20")
    },
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j20",
      name: "Pediatrics",
      head: "64f1a2b3c4d5e6f7g8h9i0j10",
      location: "Building D, Floor 2",
      capacity: 40,
      currentPatients: 51,
      monthlyRevenue: 95000,
      staff: {
        doctors: 10,
        nurses: 18,
        technicians: 6
      },
      equipment: ["Pediatric monitors", "Infant incubators", "Child-friendly diagnostic tools"],
      status: "active",
      createdAt: new Date("2020-01-01"),
      updatedAt: new Date("2024-01-16")
    }
  ],

  // Stats Cards Data
  statsCards: [
    { title: 'Total Revenue', value: '$1,247,500', change: '+12.5%', icon: 'DollarSign', color: 'text-green-600 bg-green-50' },
    { title: 'Active Patients', value: '2,847', change: '+8.2%', icon: 'Users', color: 'text-blue-600 bg-blue-50' },
    { title: 'Total Staff', value: '156', change: '+3.1%', icon: 'UserPlus', color: 'text-purple-600 bg-purple-50' },
    { title: 'Bed Occupancy', value: '87%', change: '+5.5%', icon: 'Bed', color: 'text-orange-600 bg-orange-50' }
  ],

  // Recent Activities Data
  recentActivities: [
    { id: 1, action: 'New patient admission', patient: 'John Doe', time: '10 min ago', type: 'admission' },
    { id: 2, action: 'Surgery completed', patient: 'Jane Smith', time: '1 hour ago', type: 'surgery' },
    { id: 3, action: 'Equipment maintenance', item: 'MRI Machine #2', time: '2 hours ago', type: 'maintenance' },
    { id: 4, action: 'Staff registration', staff: 'Dr. Mike Johnson', time: '3 hours ago', type: 'registration' }
  ],

  // Financial Summary Data
  financialSummary: {
    monthlyRevenue: 1247500,
    monthlyExpenses: 890200,
    netProfit: 357300,
    revenueChange: 12.5,
    expensesChange: 8.3,
    profitChange: 18.2
  },
};