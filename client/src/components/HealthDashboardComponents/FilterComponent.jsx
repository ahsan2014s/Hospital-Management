import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

const FilterComponent = ({ filters, setFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const specialties = ['All', 'General Practice', 'Cardiology', 'Dermatology', 'Neurology', 'Psychiatry'];
  const availabilities = ['All', 'Today', 'This Week', 'Next Week'];
  const ratings = ['All', '4+ Stars', '4.5+ Stars', '5 Stars'];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Check if any filters are active (not "All")
  const hasActiveFilters = Object.values(filters).some(value => value !== 'All');

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Filter Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center">
          <Filter className="w-4 h-4 text-gray-600 mr-2" />
          <h3 className="font-medium text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Filter Options - Collapsible */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
              <select
                value={filters.specialty}
                onChange={(e) => handleFilterChange('specialty', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <select
                value={filters.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {availabilities.map(availability => (
                  <option key={availability} value={availability}>{availability}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {ratings.map(rating => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={() => setFilters({ specialty: 'All', availability: 'All', rating: 'All' })}
                className="w-full mt-3 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;