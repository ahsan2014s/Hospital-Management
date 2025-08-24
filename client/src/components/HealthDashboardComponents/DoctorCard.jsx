// DoctorCard.jsx

import React, { useState } from 'react';
import { User, Star, MapPin } from 'lucide-react';
import AppointmentBookingForm from './AppointmentBookingForm';

const DoctorCard = ({ doctor }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Today':
        return 'text-green-600';
      case 'This Week':
        return 'text-blue-600';
      case 'Next Week':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };
  
  const handleBookAppointment = () => {
    setShowBookingForm(true);
  };
  
  const handleBookingSuccess = (appointmentData) => {
    console.log('Appointment booked:', appointmentData);
    // You can add additional logic here like refreshing appointments list
  };

  return (
    <>
      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            {doctor.photo ? (
              <img src={doctor.photo} alt={doctor.name} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-blue-600" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{doctor.name || 'Dr. John Smith'}</h3>
            <p className="text-sm text-gray-600">{doctor.expertise || 'General Practitioner'}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{doctor.rating || '4.8'} ({doctor.reviews || '156'} reviews)</span>
          </div>
          <span className={`text-sm font-medium ${getAvailabilityColor(doctor.availability)}`}>
            {doctor.availability || 'Available Today'}
          </span>
        </div>
        
        {doctor.location && (
          <div className="flex items-center mb-3">
            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
            <p className="text-sm text-gray-500">{doctor.location}</p>
          </div>
        )}
        
        <button 
          onClick={handleBookAppointment}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Book Appointment
        </button>
      </div>
      
      {/* Appointment Booking Modal */}
      {showBookingForm && (
        <AppointmentBookingForm
          doctor={doctor}
          onClose={() => setShowBookingForm(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </>
  );
};

export default DoctorCard;