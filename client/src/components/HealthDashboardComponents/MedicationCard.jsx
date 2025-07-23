import React from 'react';
import { Pill } from 'lucide-react';

const MedicationCard = ({ medication, isPrevious = false }) => (
  <div className={`p-4 border border-gray-200 rounded-lg ${isPrevious ? 'bg-gray-50' : 'bg-white'}`}>
    <div className="flex items-center mb-2">
      <Pill className={`w-5 h-5 mr-3 ${isPrevious ? 'text-gray-500' : 'text-green-600'}`} />
      <h3 className="font-medium text-gray-900">{medication.name}</h3>
    </div>
    
    {!isPrevious ? (
      <>
        <p className="text-gray-600">Frequency: {medication.frequency}</p>
        <p className="text-blue-600">Next dose: {medication.nextDose}</p>
        {medication.prescribedBy && <p className="text-gray-600">Prescribed by: {medication.prescribedBy}</p>}
        {medication.instructions && <p className="text-gray-600">Instructions: {medication.instructions}</p>}
      </>
    ) : (
      <>
        <p className="text-gray-600">Duration: {medication.duration}</p>
        <p className="text-gray-600">Reason: {medication.reason}</p>
        {medication.prescribedBy && <p className="text-gray-500">Prescribed by: {medication.prescribedBy}</p>}
        {medication.completedDate && <p className="text-gray-500">Completed: {medication.completedDate}</p>}
      </>
    )}
  </div>
);

export default MedicationCard;