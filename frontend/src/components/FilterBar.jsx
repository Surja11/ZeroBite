

import React, { useState, useEffect } from 'react';
import './filterbar.css';

const FilterBar = ({ filters, setFilters, onApply }) => {
  const [localFilters, setLocalFilters] = useState({
    location: '',
    radius: 5,
    expiry: '',
    priceRange: [0, 1000],
    ...filters,
  });

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleLocationChange = (e) => {
    setLocalFilters(prev => ({ ...prev, location: e.target.value }));
  };

  const handleRadiusChange = (e) => {
    const radius = Math.max(0, Number(e.target.value));
    setLocalFilters(prev => ({ ...prev, radius }));
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
    setFilters({ ...localFilters });
    if (onApply) onApply();
  };

  return (
    <div className="filters-container">
      <h1 className="text-center" style={{ fontSize: '24px' }}><strong>Filter</strong></h1><br />
      <hr /><br />


      <div className="filter-section">
        <strong><h4 className="text-center">Expiry Date</h4></strong>
        <div className="radio-group">
          {['', 'Today', 'In 3 Days', 'In a Week', 'In a Month'].map((expiry) => (
            <label key={expiry} className="radio-item">
              <input
                type="radio"
                name="expiry"
                value={expiry}
                checked={localFilters.expiry === expiry}
                onChange={handleExpiryChange}
              />
              {expiry || "Any"}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <strong><h4 className="text-center">Price Range</h4></strong>
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
      <button
        className="reset-filters"
        onClick={() => {
          const reset = {
            location: '',
            radius: 5,
            expiry: '',
            priceRange: [0, 1000],
          };
          setLocalFilters(reset);
          setFilters(reset);
          if (onApply) onApply();
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;

