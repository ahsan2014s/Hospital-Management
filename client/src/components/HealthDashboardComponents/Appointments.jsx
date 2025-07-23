import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import AppointmentCard from './AppointmentCard';

const Appointments = ({ appointments }) => {
  return (
    <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold">Appointments</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" />
          Schedule New
        </button>
      </div>
      <div className="space-y-4">
        {appointments && appointments.length > 0 ? appointments.map((appointment, index) => (
          <div key={index} className="p-3 md:p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">{appointment.type}</h3>
                    <p className="text-gray-600 mt-1">{appointment.doctor}</p>
                    <p className="text-sm text-gray-500 mt-1">{appointment.date} at {appointment.time}</p>
                    {appointment.location && (
                      <p className="text-sm text-gray-500 mt-1">Location: {appointment.location}</p>
                    )}
                  </div>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium whitespace-nowrap">
                Reschedule
              </button>
            </div>
          </div>
        )) : (
          <div className="text-center text-gray-500 py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p>No appointments scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;