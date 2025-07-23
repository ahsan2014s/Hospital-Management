import React from 'react';

const AppointmentsContent = ({ appointments }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointments Management</h2>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient & Doctor</h3>
                  <p className="text-sm text-gray-600">Patient ID: {appointment.patientId}</p>
                  <p className="text-sm text-gray-600">Doctor ID: {appointment.doctorId}</p>
                  <p className="text-sm text-gray-600">Department: {appointment.department}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Appointment Details</h3>
                  <p className="text-sm text-gray-600">Date: {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Time: {new Date(appointment.appointmentDate).toLocaleTimeString()}</p>
                  <p className="text-sm text-gray-600">Duration: {appointment.duration} minutes</p>
                  <p className="text-sm text-gray-600">Type: {appointment.type}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Status & Payment</h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                    appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {appointment.status}
                  </div>
                  <p className="text-sm text-gray-600">Fee: ${appointment.fees}</p>
                  <p className="text-sm text-gray-600">Reason: {appointment.reason}</p>
                </div>
              </div>
              {appointment.notes && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Notes:</h4>
                  <p className="text-sm text-gray-600">{appointment.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsContent;