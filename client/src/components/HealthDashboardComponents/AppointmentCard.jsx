import React from 'react';
import { Calendar } from 'lucide-react';

const AppointmentCard = ({ appointment, showReschedule = false }) => (
  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
    <Calendar className="w-5 h-5 text-blue-600 mr-3" />
    <div className="flex-1">
      <p className="font-medium text-gray-900">{appointment.type}</p>
      <p className="text-sm text-gray-600">{appointment.doctor}</p>
      <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
      {appointment.location && <p className="text-sm text-gray-500">Location: {appointment.location}</p>}
    </div>
    {showReschedule && (
      <button className="text-blue-600 hover:text-blue-800 text-sm">
        Reschedule
      </button>
    )}
  </div>
);

export default AppointmentCard;