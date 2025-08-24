import React, { useState } from 'react';
import { Search, Filter, Eye, Pill, FileText, Users, Calendar } from 'lucide-react';
import PrescriptionHistoryView from './PrescriptionHistoryView';

const DoctorPatientManagement = ({ doctorInfo, patients = [], onPrescriptionUpdate }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeView, setActiveView] = useState('list'); // list, prescriptions
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock patient data for now
  const mockPatients = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      room: '101A',
      age: 45,
      condition: 'Hypertension',
      status: 'stable',
      admissionDate: '2024-01-15',
      lastVisit: '2024-01-20',
      prescriptions: [
        {
          id: 1,
          diagnosis: 'Hypertension',
          status: 'active',
          prescriptionDate: '2024-01-20T10:00:00Z',
          prescribedBy: 'Sarah Johnson',
          prescribedById: 'doctor-1',
          medications: [
            {
              name: 'Lisinopril',
              dosage: '10mg',
              frequency: 'Once daily (QD)',
              duration: '30 days',
              quantity: '30 tablets',
              instructions: 'Take with or without food'
            }
          ],
          interactions: [],
          notes: 'Monitor blood pressure weekly'
        }
      ]
    },
    {
      id: 2,
      firstName: 'Mary',
      lastName: 'Johnson',
      room: '102B',
      age: 62,
      condition: 'Diabetes Type 2',
      status: 'monitoring',
      admissionDate: '2024-01-18',
      lastVisit: '2024-01-22',
      prescriptions: [
        {
          id: 2,
          diagnosis: 'Type 2 Diabetes Mellitus',
          status: 'active',
          prescriptionDate: '2024-01-22T14:30:00Z',
          prescribedBy: 'Sarah Johnson',
          prescribedById: 'doctor-1',
          medications: [
            {
              name: 'Metformin',
              dosage: '500mg',
              frequency: 'Twice daily (BID)',
              duration: '90 days',
              quantity: '180 tablets',
              instructions: 'Take with meals'
            }
          ],
          interactions: [],
          notes: 'Check HbA1c in 3 months'
        }
      ]
    },
    {
      id: 3,
      firstName: 'Robert',
      lastName: 'Davis',
      room: '103A',
      age: 58,
      condition: 'Chest Pain - Investigation',
      status: 'critical',
      admissionDate: '2024-01-22',
      lastVisit: '2024-01-23',
      prescriptions: []
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Patients' },
    { value: 'stable', label: 'Stable' },
    { value: 'monitoring', label: 'Monitoring' },
    { value: 'critical', label: 'Critical' },
    { value: 'discharged', label: 'Discharged' }
  ];

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = searchTerm === '' || 
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.room.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'monitoring':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'discharged':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleViewPatientPrescriptions = (patient) => {
    setSelectedPatient(patient);
    setActiveView('prescriptions');
  };

  const handleBackToList = () => {
    setSelectedPatient(null);
    setActiveView('list');
  };

  const handlePrescriptionUpdate = async (patientId, prescriptionData) => {
    // TODO: Integrate with backend API
    console.log('Doctor updating prescription for patient:', patientId, prescriptionData);
    if (onPrescriptionUpdate) {
      await onPrescriptionUpdate(patientId, prescriptionData);
    }
  };

  const renderPatientCard = (patient) => (
    <div key={patient.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {patient.firstName} {patient.lastName}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Room {patient.room} • Age {patient.age}
            </p>
            <p className="text-sm text-gray-700 mt-1 font-medium">
              {patient.condition}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(patient.status)}`}>
            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Admitted</p>
          <p className="text-sm font-medium text-gray-900">
            {new Date(patient.admissionDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Last Visit</p>
          <p className="text-sm font-medium text-gray-900">
            {new Date(patient.lastVisit).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Prescriptions</p>
          <p className="text-sm font-medium text-gray-900">
            {patient.prescriptions?.length || 0} active
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            Next: Schedule appointment
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewPatientPrescriptions(patient)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Pill className="w-4 h-4" />
            Prescriptions
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  if (activeView === 'prescriptions' && selectedPatient) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Patients
          </button>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedPatient.firstName} {selectedPatient.lastName}
            </h2>
            <p className="text-gray-600">Room {selectedPatient.room} • {selectedPatient.condition}</p>
          </div>
        </div>

        <PrescriptionHistoryView
          patient={selectedPatient}
          prescriptionsData={selectedPatient.prescriptions || []}
          onPrescriptionUpdate={handlePrescriptionUpdate}
          currentDoctor={doctorInfo}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Patients</h2>
          <p className="text-gray-600 mt-1">
            Patients under your care • {filteredPatients.length} patients
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patients by name, condition, or room..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{mockPatients.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Stable</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockPatients.filter(p => p.status === 'stable').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Users className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Monitoring</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockPatients.filter(p => p.status === 'monitoring').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Users className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockPatients.filter(p => p.status === 'critical').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredPatients.length} of {mockPatients.length} patients
      </div>

      {/* Patients List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPatients.length > 0 ? (
          filteredPatients.map(renderPatientCard)
        ) : (
          <div className="col-span-2 text-center py-12 bg-white rounded-lg border border-gray-200">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Patients Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all'
                ? 'No patients match your current filters. Try adjusting your search criteria.'
                : 'You have no patients assigned yet.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPatientManagement;
