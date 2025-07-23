// MongoDB-like dummy data structure
export const nurseData = {
  _id: "507f1f77bcf86cd799439011",
  nurseId: "N001",
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@hospital.com",
  phone: "+1-555-0123",
  department: "ICU",
  shift: "Day Shift (7:00 AM - 7:00 PM)",
  licenseNumber: "RN123456",
  hireDate: "2020-03-15",
  assignedPatients: [
    {
      _id: "507f1f77bcf86cd799439012",
      patientId: "P001",
      firstName: "John",
      lastName: "Smith",
      age: 45,
      room: "ICU-101",
      condition: "Post-operative care",
      admissionDate: "2024-07-18",
      assignedDoctors: [
        {
          _id: "507f1f77bcf86cd799439013",
          doctorId: "D001",
          name: "Dr. Emily Chen",
          specialty: "Cardiothoracic Surgery",
          phone: "+1-555-0124"
        }
      ],
      medications: [
        {
          _id: "507f1f77bcf86cd799439014",
          name: "Morphine",
          dosage: "5mg",
          frequency: "Every 4 hours",
          route: "IV",
          nextDue: "14:00"
        },
        {
          _id: "507f1f77bcf86cd799439015",
          name: "Antibiotics",
          dosage: "500mg",
          frequency: "Every 8 hours",
          route: "Oral",
          nextDue: "16:00"
        }
      ]
    },
    {
      _id: "507f1f77bcf86cd799439016",
      patientId: "P002",
      firstName: "Maria",
      lastName: "Garcia",
      age: 32,
      room: "ICU-103",
      condition: "Pneumonia",
      admissionDate: "2024-07-19",
      assignedDoctors: [
        {
          _id: "507f1f77bcf86cd799439017",
          doctorId: "D002",
          name: "Dr. Michael Brown",
          specialty: "Pulmonology",
          phone: "+1-555-0125"
        }
      ],
      medications: [
        {
          _id: "507f1f77bcf86cd799439018",
          name: "Ventolin",
          dosage: "2 puffs",
          frequency: "Every 6 hours",
          route: "Inhaled",
          nextDue: "15:30"
        }
      ]
    }
  ]
};