import React, { useState, useMemo } from 'react';
import { Pill, Plus, Edit, Eye, Clock, User, AlertTriangle, Search, Filter, X } from 'lucide-react';
import PrescriptionForm from './PrescriptionForm';

const PrescriptionHistoryView = ({ patient, prescriptionsData = [], onPrescriptionUpdate, currentDoctor }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [viewingPrescription, setViewingPrescription] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Prescriptions' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'discontinued', label: 'Discontinued' },
    { value: 'pending', label: 'Pending' }
  ];

  // Filter and sort prescriptions
  const filteredPrescriptions = useMemo(() => {
    let filtered = [...prescriptionsData];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(prescription =>
        prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.medications.some(med =>
          med.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        prescription.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(prescription => prescription.status === statusFilter);
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.prescriptionDate) - new Date(a.prescriptionDate));
  }, [prescriptionsData, searchTerm, statusFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'discontinued':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-red-600';
      case 'moderate':
        return 'text-yellow-600';
      case 'low':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleAddPrescription = async (prescriptionData) => {
    setIsSubmitting(true);
    try {
      await onPrescriptionUpdate(patient.id, prescriptionData);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding prescription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditPrescription = async (prescriptionData) => {
    setIsSubmitting(true);
    try {
      await onPrescriptionUpdate(patient.id, { ...prescriptionData, id: editingPrescription.id });
      setEditingPrescription(null);
    } catch (error) {
      console.error('Error updating prescription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canEditPrescription = (prescription) => {
    return currentDoctor?.id === prescription.prescribedById || currentDoctor?.role === 'chief_doctor';
  };

  const renderPrescriptionCard = (prescription) => {
    const canEdit = canEditPrescription(prescription);
    
    return (
      <div key={prescription.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Pill className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{prescription.diagnosis}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {prescription.medications.length} medication{prescription.medications.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(prescription.status)}`}>
              {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewingPrescription(prescription)}
                className="p-1 text-gray-400 hover:text-blue-600 rounded"
                title="View Details"
              >
                <Eye className="w-4 h-4" />
              </button>
              {canEdit && (
                <button
                  onClick={() => setEditingPrescription(prescription)}
                  className="p-1 text-gray-400 hover:text-blue-600 rounded"
                  title="Edit Prescription"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Medications List */}
        <div className="space-y-2 mb-4">
          {prescription.medications.slice(0, 2).map((med, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{med.name}</p>
                <p className="text-sm text-gray-600">
                  {med.dosage} • {med.frequency} • {med.duration}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Qty: {med.quantity}</p>
              </div>
            </div>
          ))}
          
          {prescription.medications.length > 2 && (
            <div className="text-center">
              <button
                onClick={() => setViewingPrescription(prescription)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                +{prescription.medications.length - 2} more medication{prescription.medications.length - 2 !== 1 ? 's' : ''}
              </button>
            </div>
          )}
        </div>

        {/* Drug Interactions Warning */}
        {prescription.interactions && prescription.interactions.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800">Drug Interactions Detected</p>
                {prescription.interactions.slice(0, 1).map((interaction, index) => (
                  <p key={index} className="text-xs text-red-700 mt-1">
                    <span className={`inline-block px-1 py-0.5 rounded text-xs font-medium mr-1 ${
                      interaction.severity === 'high' ? 'bg-red-200 text-red-800' :
                      interaction.severity === 'moderate' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-blue-200 text-blue-800'
                    }`}>
                      {interaction.severity.toUpperCase()}
                    </span>
                    {interaction.description.substring(0, 80)}...
                  </p>
                ))}
                {prescription.interactions.length > 1 && (
                  <button
                    onClick={() => setViewingPrescription(prescription)}
                    className="text-xs text-red-600 hover:text-red-800 mt-1"
                  >
                    +{prescription.interactions.length - 1} more interaction{prescription.interactions.length - 1 !== 1 ? 's' : ''}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Prescription Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{new Date(prescription.prescriptionDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>Dr. {prescription.prescribedBy}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPrescriptionDetails = (prescription) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Pill className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Prescription Details</h2>
                <p className="text-gray-600 mt-1">
                  {patient.firstName} {patient.lastName} - {new Date(prescription.prescriptionDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => setViewingPrescription(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Diagnosis */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Diagnosis/Indication</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{prescription.diagnosis}</p>
            </div>

            {/* Medications */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Medications</h3>
              <div className="space-y-4">
                {prescription.medications.map((med, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Medication</p>
                        <p className="font-medium">{med.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Dosage</p>
                        <p className="font-medium">{med.dosage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Frequency</p>
                        <p className="font-medium">{med.frequency}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-medium">{med.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Quantity</p>
                        <p className="font-medium">{med.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(prescription.status)}`}>
                          {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    {med.instructions && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">Instructions</p>
                        <p className="text-gray-700">{med.instructions}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Drug Interactions */}
            {prescription.interactions && prescription.interactions.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Drug Interactions</h3>
                <div className="space-y-3">
                  {prescription.interactions.map((interaction, index) => (
                    <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              interaction.severity === 'high' ? 'bg-red-200 text-red-800' :
                              interaction.severity === 'moderate' ? 'bg-yellow-200 text-yellow-800' :
                              'bg-blue-200 text-blue-800'
                            }`}>
                              {interaction.severity.toUpperCase()}
                            </span>
                            <span className="text-sm font-medium text-red-800">
                              {interaction.drugs.join(' + ')}
                            </span>
                          </div>
                          <p className="text-sm text-red-700">{interaction.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Notes */}
            {prescription.notes && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Additional Notes</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{prescription.notes}</p>
              </div>
            )}

            {/* Prescription Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Prescription Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Prescribed By</p>
                  <p className="font-medium">Dr. {prescription.prescribedBy}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date Prescribed</p>
                  <p className="font-medium">{new Date(prescription.prescriptionDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(prescription.status)}`}>
                    {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Prescription History</h2>
          <p className="text-gray-600 mt-1">
            {patient.firstName} {patient.lastName} - Room {patient.room}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Prescription
        </button>
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
              placeholder="Search prescriptions by diagnosis, medication, or doctor..."
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

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredPrescriptions.length} of {prescriptionsData.length} prescriptions
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.length > 0 ? (
          filteredPrescriptions.map(renderPrescriptionCard)
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Prescriptions Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all'
                ? 'No prescriptions match your current filters. Try adjusting your search criteria.'
                : 'No prescriptions have been written for this patient yet.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Write First Prescription
              </button>
            )}
          </div>
        )}
      </div>

      {/* Forms and Modals */}
      {showAddForm && (
        <PrescriptionForm
          patient={patient}
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddPrescription}
          isSubmitting={isSubmitting}
        />
      )}

      {editingPrescription && (
        <PrescriptionForm
          patient={patient}
          existingPrescription={editingPrescription}
          onClose={() => setEditingPrescription(null)}
          onSubmit={handleEditPrescription}
          isSubmitting={isSubmitting}
        />
      )}

      {viewingPrescription && renderPrescriptionDetails(viewingPrescription)}
    </div>
  );
};

export default PrescriptionHistoryView;
