import React, { useState, useEffect } from 'react';
import './filterbar.css';

const FilterBar = ({ filters, setFilters, onApply }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  // Sync local filters when parent filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleLocationChange = (e) => {
    setLocalFilters(prev => ({ ...prev, location: e.target.value }));
  };

  const handleExpiryChange = (e) => {
    setLocalFilters(prev => ({ ...prev, expiry: e.target.value }));
  };

  const handleMinPriceChange = (e) => {
    const min = Math.min(+e.target.value, localFilters.priceRange[1]);
    setLocalFilters(prev => ({ ...prev, priceRange: [min, prev.priceRange[1]] }));
  };

  const handleMaxPriceChange = (e) => {
    const max = Math.max(+e.target.value, localFilters.priceRange[0]);
    setLocalFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], max] }));
  };

  const applyFilters = () => {
    setFilters(localFilters);
    onApply();  
  };

  return (
    <div className="filters-container">
      <h1 style={{ fontSize: '20px' }}>Filters</h1><br />

      <div className="filter-section"><hr /><br />
        <h4>Location</h4>
        <div className="radio-group">
          {['Bhaktapur', 'Kathmandu', 'Lalitpur'].map((loc) => (
            <label key={loc} className="radio-item">
              <input
                type="radio"
                name="location"
                value={loc}
                checked={localFilters.location === loc}
                onChange={handleLocationChange}
              />
              {loc}
            </label>
          ))}
        </div>
      </div>

      
      <div className="filter-section">
        <h4>Expiry Date</h4>
        <div className="radio-group">
          {['Today', 'In 3 Days', 'In a Week', 'In a Month'].map((expiry) => (
            <label key={expiry} className="radio-item">
              <input
                type="radio"
                name="expiry"
                value={expiry}
                checked={localFilters.expiry === expiry}
                onChange={handleExpiryChange}
              />
              {expiry}
            </label>
          ))}
        </div>
      </div>

      
      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-display">
          Rs. {localFilters.priceRange[0]} - Rs. {localFilters.priceRange[1]}
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          value={localFilters.priceRange[0]}
          onChange={handleMinPriceChange}
          className="range-slider"
        />
        <input
          type="range"
          min="0"
          max="1000"
          value={localFilters.priceRange[1]}
          onChange={handleMaxPriceChange}
          className="range-slider"
        />
      </div>

     
      <button className="apply-filters" onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default FilterBar;
