import React from 'react';
import NurseCard from './nurses/NurseCard';

const NursesContent = ({ nurses }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Nurses Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nurses.map((nurse) => (
            <NurseCard key={nurse._id} nurse={nurse} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NursesContent;