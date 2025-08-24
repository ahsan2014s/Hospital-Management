import React, { useState, useEffect } from 'react';
import { Pill, Search, AlertTriangle, Save, X, Plus, Trash2 } from 'lucide-react';

const PrescriptionForm = ({ patient, existingPrescription = null, onClose, onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    medications: [
      {
        id: Date.now(),
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
        quantity: ''
      }
    ],
    diagnosis: '',
    notes: ''
  });

  const [drugSearch, setDrugSearch] = useState('');
  const [selectedMedIndex, setSelectedMedIndex] = useState(null);
  const [drugSuggestions, setDrugSuggestions] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [errors, setErrors] = useState({});

  // Mock drug database - in real app, this would come from an API
  const drugDatabase = [
    { name: 'Amoxicillin', type: 'Antibiotic', commonDosages: ['250mg', '500mg', '875mg'] },
    { name: 'Lisinopril', type: 'ACE Inhibitor', commonDosages: ['2.5mg', '5mg', '10mg', '20mg'] },
    { name: 'Metformin', type: 'Antidiabetic', commonDosages: ['500mg', '850mg', '1000mg'] },
    { name: 'Atorvastatin', type: 'Statin', commonDosages: ['10mg', '20mg', '40mg', '80mg'] },
    { name: 'Amlodipine', type: 'Calcium Channel Blocker', commonDosages: ['2.5mg', '5mg', '10mg'] },
    { name: 'Omeprazole', type: 'PPI', commonDosages: ['20mg', '40mg'] },
    { name: 'Aspirin', type: 'NSAID', commonDosages: ['81mg', '325mg'] },
    { name: 'Warfarin', type: 'Anticoagulant', commonDosages: ['1mg', '2mg', '2.5mg', '3mg', '4mg', '5mg'] }
  ];

  const frequencyOptions = [
    'Once daily (QD)',
    'Twice daily (BID)',
    'Three times daily (TID)',
    'Four times daily (QID)',
    'Every 4 hours',
    'Every 6 hours',
    'Every 8 hours',
    'Every 12 hours',
    'As needed (PRN)',
    'Before meals',
    'After meals',
    'At bedtime'
  ];

  useEffect(() => {
    if (existingPrescription) {
      setFormData({
        medications: existingPrescription.medications || [
          {
            id: Date.now(),
            name: '',
            dosage: '',
            frequency: '',
            duration: '',
            instructions: '',
            quantity: ''
          }
        ],
        diagnosis: existingPrescription.diagnosis || '',
        notes: existingPrescription.notes || ''
      });
    }
  }, [existingPrescription]);

  useEffect(() => {
    if (drugSearch && selectedMedIndex !== null) {
      const filtered = drugDatabase.filter(drug =>
        drug.name.toLowerCase().includes(drugSearch.toLowerCase())
      );
      setDrugSuggestions(filtered);
    } else {
      setDrugSuggestions([]);
    }
  }, [drugSearch, selectedMedIndex]);

  useEffect(() => {
    // Check for drug interactions whenever medications change
    checkDrugInteractions();
  }, [formData.medications]);

  const checkDrugInteractions = () => {
    const activeInteractions = [];
    const medicationNames = formData.medications
      .filter(med => med.name.trim())
      .map(med => med.name.toLowerCase());

    // Mock interaction checker - in real app, this would use a proper drug interaction API
    const knownInteractions = [
      {
        drugs: ['warfarin', 'aspirin'],
        severity: 'high',
        description: 'Increased bleeding risk when combining warfarin with aspirin'
      },
      {
        drugs: ['lisinopril', 'atorvastatin'],
        severity: 'moderate',
        description: 'Monitor for increased risk of muscle problems'
      }
    ];

    knownInteractions.forEach(interaction => {
      if (interaction.drugs.every(drug => 
        medicationNames.some(medName => medName.includes(drug))
      )) {
        activeInteractions.push(interaction);
      }
    });

    setInteractions(activeInteractions);
  };

  const addMedication = () => {
    setFormData(prev => ({
      ...prev,
      medications: [
        ...prev.medications,
        {
          id: Date.now() + Math.random(),
          name: '',
          dosage: '',
          frequency: '',
          duration: '',
          instructions: '',
          quantity: ''
        }
      ]
    }));
  };

  const removeMedication = (index) => {
    if (formData.medications.length > 1) {
      setFormData(prev => ({
        ...prev,
        medications: prev.medications.filter((_, i) => i !== index)
      }));
    }
  };

  const updateMedication = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      )
    }));

    // Clear errors for this field
    if (errors[`medications.${index}.${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`medications.${index}.${field}`]: ''
      }));
    }
  };

  const selectDrug = (drug, medIndex) => {
    updateMedication(medIndex, 'name', drug.name);
    setDrugSearch('');
    setSelectedMedIndex(null);
    setDrugSuggestions([]);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.diagnosis.trim()) {
      newErrors.diagnosis = 'Diagnosis is required';
    }

    formData.medications.forEach((med, index) => {
      if (!med.name.trim()) {
        newErrors[`medications.${index}.name`] = 'Medication name is required';
      }
      if (!med.dosage.trim()) {
        newErrors[`medications.${index}.dosage`] = 'Dosage is required';
      }
      if (!med.frequency.trim()) {
        newErrors[`medications.${index}.frequency`] = 'Frequency is required';
      }
      if (!med.duration.trim()) {
        newErrors[`medications.${index}.duration`] = 'Duration is required';
      }
      if (!med.quantity.trim()) {
        newErrors[`medications.${index}.quantity`] = 'Quantity is required';
      }
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const prescriptionData = {
      ...formData,
      patientId: patient.id,
      interactions: interactions.length > 0 ? interactions : null,
      prescribedBy: 'Current Doctor', // This would come from auth context
      prescriptionDate: new Date().toISOString()
    };

    onSubmit(prescriptionData);
  };

  const renderMedicationForm = (med, index) => {
    const drug = drugDatabase.find(d => d.name.toLowerCase() === med.name.toLowerCase());
    
    return (
      <div key={med.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900">Medication {index + 1}</h4>
          {formData.medications.length > 1 && (
            <button
              type="button"
              onClick={() => removeMedication(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Drug Name with Search */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medication Name
            </label>
            <input
              type="text"
              value={selectedMedIndex === index ? drugSearch : med.name}
              onChange={(e) => {
                if (selectedMedIndex === index) {
                  setDrugSearch(e.target.value);
                } else {
                  updateMedication(index, 'name', e.target.value);
                }
              }}
              onFocus={() => {
                setSelectedMedIndex(index);
                setDrugSearch(med.name);
              }}
              placeholder="Search for medication..."
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors[`medications.${index}.name`] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            
            {/* Drug Suggestions Dropdown */}
            {selectedMedIndex === index && drugSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {drugSuggestions.map((drug, drugIndex) => (
                  <button
                    key={drugIndex}
                    type="button"
                    onClick={() => selectDrug(drug, index)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900">{drug.name}</div>
                    <div className="text-sm text-gray-600">{drug.type}</div>
                  </button>
                ))}
              </div>
            )}
            
            {errors[`medications.${index}.name`] && (
              <p className="text-sm text-red-600 mt-1">{errors[`medications.${index}.name`]}</p>
            )}
          </div>

          {/* Dosage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dosage
            </label>
            {drug && drug.commonDosages ? (
              <select
                value={med.dosage}
                onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors[`medications.${index}.dosage`] ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select dosage</option>
                {drug.commonDosages.map((dosage, i) => (
                  <option key={i} value={dosage}>{dosage}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={med.dosage}
                onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                placeholder="e.g., 500mg"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors[`medications.${index}.dosage`] ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            )}
            {errors[`medications.${index}.dosage`] && (
              <p className="text-sm text-red-600 mt-1">{errors[`medications.${index}.dosage`]}</p>
            )}
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <select
              value={med.frequency}
              onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors[`medications.${index}.frequency`] ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select frequency</option>
              {frequencyOptions.map((freq, i) => (
                <option key={i} value={freq}>{freq}</option>
              ))}
            </select>
            {errors[`medications.${index}.frequency`] && (
              <p className="text-sm text-red-600 mt-1">{errors[`medications.${index}.frequency`]}</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              type="text"
              value={med.duration}
              onChange={(e) => updateMedication(index, 'duration', e.target.value)}
              placeholder="e.g., 7 days, 30 days"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors[`medications.${index}.duration`] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors[`medications.${index}.duration`] && (
              <p className="text-sm text-red-600 mt-1">{errors[`medications.${index}.duration`]}</p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="text"
              value={med.quantity}
              onChange={(e) => updateMedication(index, 'quantity', e.target.value)}
              placeholder="e.g., 30 tablets"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors[`medications.${index}.quantity`] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors[`medications.${index}.quantity`] && (
              <p className="text-sm text-red-600 mt-1">{errors[`medications.${index}.quantity`]}</p>
            )}
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Instructions
            </label>
            <textarea
              value={med.instructions}
              onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
              placeholder="Take with food, avoid alcohol, etc."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Pill className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {existingPrescription ? 'Edit Prescription' : 'New Prescription'}
              </h2>
              <p className="text-gray-600 mt-1">
                {patient.firstName} {patient.lastName} - Room {patient.room}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Drug Interactions Warning */}
          {interactions.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-red-800 mb-2">Drug Interaction Warning</h4>
                  {interactions.map((interaction, index) => (
                    <div key={index} className="text-sm text-red-700 mb-2">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium mr-2 ${
                        interaction.severity === 'high' ? 'bg-red-200 text-red-800' :
                        interaction.severity === 'moderate' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-blue-200 text-blue-800'
                      }`}>
                        {interaction.severity.toUpperCase()}
                      </span>
                      {interaction.description}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Diagnosis */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diagnosis/Indication
            </label>
            <input
              type="text"
              value={formData.diagnosis}
              onChange={(e) => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
              placeholder="Primary diagnosis or indication for prescription"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.diagnosis ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.diagnosis && (
              <p className="text-sm text-red-600 mt-1">{errors.diagnosis}</p>
            )}
          </div>

          {/* Medications */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Medications</h3>
              <button
                type="button"
                onClick={addMedication}
                className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <Plus className="w-4 h-4" />
                Add Medication
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.medications.map((med, index) => renderMedicationForm(med, index))}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes for pharmacy or patient..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || interactions.some(i => i.severity === 'high')}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : existingPrescription ? 'Update Prescription' : 'Create Prescription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionForm;
