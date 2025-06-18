import React, { useState } from 'react';
import Header from './components/Header';
import Card from './components/ProductCard';
import Filters from './components/FilterBar';

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['All', 'Bakery', 'Packaged Food', 'Restaurant Meals'];

  return (
    <div>
      <Header />
      <div className="options">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              backgroundColor: selectedCategory === category ? '#7bb400' : '',
              color: selectedCategory === category ? 'white' : '',
              marginRight: '10px',
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <div className='display'>
       <Filters />
        <Card />
        <Card />
        <Card />
        <Card />
        
      </div>
    </div>
  );
};

export default ProductPage;
