import React, { useState, useEffect } from 'react';
import { User, Stethoscope, Pill, Calendar, Clock, Phone, Mail } from 'lucide-react';
import { nurseAPI } from '../services/nurseAPI';
import { getMedicationStatus } from '../utils/medicationUtils';

const NurseDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [nurseData, setNurseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNurseData = async () => {
      try {
        setLoading(true);
        const data = await nurseAPI.getNurseData();
        setNurseData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load nurse data');
        console.error('Error fetching nurse data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNurseData();
  }, []);

  const NurseOverview = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {nurseData.firstName} {nurseData.lastName}
            </h2>
            <p className="text-gray-600">{nurseData.department} • {nurseData.licenseNumber}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{nurseData.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{nurseData.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{nurseData.shift}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Assigned Patients</h4>
              <p className="text-2xl font-bold text-blue-600">{nurseData.assignedPatients.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Hire Date</h4>
              <p className="text-green-600">{new Date(nurseData.hireDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Today's Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="font-semibold text-orange-800 mb-2">Medications Due</h4>
            <p className="text-2xl font-bold text-orange-600">
              {nurseData.assignedPatients.reduce((total, patient) => {
                const patientMedications = patient?.medications || [];
                return total + patientMedications.length;
              }, 0)}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">Active Doctors</h4>
            <p className="text-2xl font-bold text-purple-600">
              {new Set(nurseData.assignedPatients.flatMap(p => p.assignedDoctors.map(d => d.doctorId))).size}
            </p>
          </div>
          <div className="bg-teal-50 rounded-lg p-4">
            <h4 className="font-semibold text-teal-800 mb-2">Department</h4>
            <p className="text-lg font-medium text-teal-600">{nurseData.department}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const PatientDetail = ({ patient }) => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {patient.firstName} {patient.lastName}
            </h2>
            <p className="text-gray-600">Room {patient.room} • Age {patient.age}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Admitted</p>
            <p className="font-semibold">{new Date(patient.admissionDate).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Current Condition</h4>
          <p className="text-yellow-700">{patient.condition}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Stethoscope className="w-5 h-5 mr-2" />
          Assigned Doctors
        </h3>
        <div className="space-y-3">
          {patient.assignedDoctors.map(doctor => (
            <div key={doctor._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800">{doctor.name}</h4>
                  <p className="text-gray-600">{doctor.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{doctor.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Pill className="w-5 h-5 mr-2" />
          Current Medications
        </h3>
        <div className="space-y-3">
          {patient.medications.map(medication => (
            <div key={medication._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{medication.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  (() => {
                    const status = getMedicationStatus(medication.frequency);
                    return status.className;
                  })()
                }`}>
                  {(() => {
                    const status = getMedicationStatus(medication.frequency);
                    return status.label;
                  })()}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Dosage</p>
                  <p className="font-medium">{medication.dosage}</p>
                </div>
                <div>
                  <p className="text-gray-500">Frequency</p>
                  <p className="font-medium">{medication.frequency}</p>
                </div>
                <div>
                  <p className="text-gray-500">Route</p>
                  <p className="font-medium">{medication.route}</p>
                </div>
                <div>
                  <p className="text-gray-500">Next Due</p>
                  <p className="font-medium">
                    {(() => {
                      const status = getMedicationStatus(medication.frequency);
                      return status.nextDue || 'Calculating...';
                    })()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading nurse dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!nurseData) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg overflow-y-auto">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Nurse Dashboard</h1>
          <p className="text-gray-600">Welcome, {nurseData.firstName}</p>
        </div>
        
        <nav className="p-4">
          <button
            onClick={() => {
              setActiveTab('overview');
              setSelectedPatient(null);
            }}
            className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
              activeTab === 'overview' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Nurse Overview
          </button>
          
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Assigned Patients ({nurseData.assignedPatients.length})
            </h3>
            {nurseData.assignedPatients.map(patient => (
              <button
                key={patient._id}
                onClick={() => {
                  setSelectedPatient(patient);
                  setActiveTab('patient');
                }}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                  selectedPatient?._id === patient._id 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{patient.firstName} {patient.lastName}</div>
                <div className="text-sm opacity-75">Room {patient.room}</div>
                <div className="text-xs opacity-60 mt-1">
                  {patient.medications.length} medications • {patient.assignedDoctors.length} doctors
                </div>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {activeTab === 'overview' ? 'Dashboard Overview' : `${selectedPatient?.firstName} ${selectedPatient?.lastName}`}
                </h2>
                <p className="text-gray-600 mt-1">
                  {activeTab === 'overview' 
                    ? `${new Date().toLocaleDateString()} • ${nurseData.shift}` 
                    : `Room ${selectedPatient?.room} • ${selectedPatient?.condition}`
                  }
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {activeTab === 'overview' ? (
            <NurseOverview />
          ) : (
            selectedPatient && <PatientDetail patient={selectedPatient} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;