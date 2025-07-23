import React from 'react';

const RoomsContent = ({ roomData }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomData.map((room, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{room.department}</h3>
                  <p className="text-sm text-gray-600">{room.location}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  room.occupancy > 90 ? 'bg-red-100 text-red-800' :
                  room.occupancy > 70 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {room.occupancy}% occupied
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Capacity:</span>
                  <span className="text-lg font-semibold text-gray-900">{room.capacity}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Patients:</span>
                  <span className="text-lg font-semibold text-blue-600">{room.currentPatients}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Available Rooms:</span>
                  <span className="text-lg font-semibold text-green-600">{room.availableRooms}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      room.occupancy > 90 ? 'bg-red-500' :
                      room.occupancy > 70 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${room.occupancy}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomsContent;