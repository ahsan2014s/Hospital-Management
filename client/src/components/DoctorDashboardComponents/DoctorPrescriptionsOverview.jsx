import React, { useState, useMemo } from 'react';
import { Pill, Search, Filter, Eye, Edit, Clock, User, AlertTriangle, Calendar } from 'lucide-react';

const DoctorPrescriptionsOverview = ({ doctorInfo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');

  // Mock prescriptions data - in real app this would come from API
  const mockPrescriptions = [
    {
      id: 1,
      patientName: 'John Smith',
      patientRoom: '101A',
      diagnosis: 'Hypertension',
      status: 'active',
      prescriptionDate: '2024-01-20T10:00:00Z',
      medications: [
        {
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily (QD)'
        }
      ],
      interactions: [],
      urgent: false
    },
    {
      id: 2,
      patientName: 'Mary Johnson',
      patientRoom: '102B',
      diagnosis: 'Type 2 Diabetes Mellitus',
      status: 'active',
      prescriptionDate: '2024-01-22T14:30:00Z',
      medications: [
        {
          name: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice daily (BID)'
        }
      ],
      interactions: [],
      urgent: false
    },
    {
      id: 3,
      patientName: 'Robert Davis',
      patientRoom: '103A',
      diagnosis: 'Post-surgical Pain Management',
      status: 'pending',
      prescriptionDate: '2024-01-23T09:15:00Z',
      medications: [
        {
          name: 'Morphine',
          dosage: '5mg',
          frequency: 'Every 4 hours PRN'
        }
      ],
      interactions: [],
      urgent: true
    },
    {
      id: 4,
      patientName: 'Linda Wilson',
      patientRoom: '104B',
      diagnosis: 'Pneumonia',
      status: 'active',
      prescriptionDate: '2024-01-21T16:45:00Z',
      medications: [
        {
          name: 'Amoxicillin',
          dosage: '875mg',
          frequency: 'Twice daily (BID)'
        },
        {
          name: 'Albuterol',
          dosage: '2 puffs',
          frequency: 'Every 4 hours PRN'
        }
      ],
      interactions: [],
      urgent: false
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Prescriptions' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'completed', label: 'Completed' },
    { value: 'discontinued', label: 'Discontinued' }
  ];

  const timeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  // Filter prescriptions
  const filteredPrescriptions = useMemo(() => {
    let filtered = [...mockPrescriptions];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(prescription =>
        prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.patientRoom.includes(searchTerm) ||
        prescription.medications.some(med =>
          med.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(prescription => prescription.status === statusFilter);
    }

    // Time filter
    if (timeFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(prescription => {
        const prescDate = new Date(prescription.prescriptionDate);
        switch (timeFilter) {
          case 'today':
            return prescDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return prescDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return prescDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.prescriptionDate) - new Date(a.prescriptionDate));
  }, [searchTerm, statusFilter, timeFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'discontinued':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderPrescriptionCard = (prescription) => (
    <div 
      key={prescription.id} 
      className={`bg-white rounded-lg border p-6 hover:shadow-md transition-shadow ${
        prescription.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${prescription.urgent ? 'bg-red-100' : 'bg-blue-100'}`}>
            <Pill className={`w-5 h-5 ${prescription.urgent ? 'text-red-600' : 'text-blue-600'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {prescription.patientName}
              {prescription.urgent && (
                <span className="ml-2 inline-flex items-center gap-1 text-red-600 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  Urgent
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Room {prescription.patientRoom} • {prescription.diagnosis}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(prescription.status)}`}>
            {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Medications */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Medications:</h4>
        <div className="space-y-1">
          {prescription.medications.map((med, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-900">{med.name}</span>
              <span className="text-gray-600">{med.dosage} • {med.frequency}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{new Date(prescription.prescriptionDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{prescription.medications.length} med{prescription.medications.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <Eye className="w-4 h-4" />
            View
          </button>
          {prescription.status !== 'completed' && (
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <Edit className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Prescriptions Overview</h2>
          <p className="text-gray-600 mt-1">
            All prescriptions you've written • {filteredPrescriptions.length} prescriptions
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Pill className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockPrescriptions.filter(p => 
                  new Date(p.prescriptionDate).toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Pill className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockPrescriptions.filter(p => p.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Pill className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockPrescriptions.filter(p => p.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockPrescriptions.filter(p => p.urgent).length}
              </p>
            </div>
          </div>
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
              placeholder="Search by patient name, diagnosis, medication..."
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

          {/* Time Filter */}
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {timeOptions.map((time) => (
              <option key={time.value} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredPrescriptions.length} of {mockPrescriptions.length} prescriptions
      </div>

      {/* Prescriptions List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrescriptions.length > 0 ? (
          filteredPrescriptions.map(renderPrescriptionCard)
        ) : (
          <div className="col-span-2 text-center py-12 bg-white rounded-lg border border-gray-200">
            <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Prescriptions Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' || timeFilter !== 'all'
                ? 'No prescriptions match your current filters. Try adjusting your search criteria.'
                : 'You haven\'t written any prescriptions yet.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPrescriptionsOverview;
