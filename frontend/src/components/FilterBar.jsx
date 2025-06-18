import React, { useState } from 'react';
import './FilterBar.css';

const Filters = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [distance, setDistance] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expiryFilter, setExpiryFilter] = useState('all');

  const categories = ['Vanilla', 'Strawberry', 'Black Forest', 'Red Velvet', 'Butter Scotch'];
  categories.sort();

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  return (
    <div className="filters-container">
    <h1 style={{fontSize:'20px'}}>Filters</h1><br />
      <hr />
      <br />
      {/* Categories */}
      <div className="filter-section">
        <h4>Categories</h4>
        <div className="categories-list">
          {categories.map(category => (
            <label key={category} className="category-item">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Expiry Filter */}
      <div className="filter-section">
        <h4>Expiry Soon</h4>
        <select 
          value={expiryFilter}
          onChange={(e) => setExpiryFilter(e.target.value)}
          className="expiry-select"
        >
          <option value="all">All Items</option>
          <option value="24h">Expiring in 24h</option>
          <option value="3d">Expiring in 3 days</option>
          <option value="1w">Expiring in 1 week</option>
        </select>
      </div>
      
      {/* Price Range Slider */}
      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-display">
          Rs.{priceRange[0]} - Rs.{priceRange[1]}
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          className="range-slider"
        />
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          className="range-slider"
        />
      </div>

    
      {/* Distance Filter */}
      <div className="filter-section">
        <h4>Distance (km)</h4>
        <input
          type="range"
          min="1"
          max="20"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="range-slider"
        />
        <div className="distance-display">{distance} km</div>
      </div>

      

      <button className="apply-filters">Apply Filters</button>
    </div>
  );
};

export default Filters;