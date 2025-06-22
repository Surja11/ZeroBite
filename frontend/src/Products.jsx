import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './components/ProductCard';
import Filters from './components/FilterBar';
import './Products.css';


const API_BASE_URL = 'http://localhost:8000/api'; // change this to your backend URL

const ProductPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchFromQuery = queryParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchFromQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayOnEnter, setDisplayOnEnter] = useState(false);

  const [filters, setFilters] = useState({
    location: '',
    expiry: '',
    priceRange: [0, 1000],
  });

  const categories = ['All', 'Bakery', 'Packaged Food', 'Restaurant Meal'];

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(console.error);
      
    // fetch(`${API_BASE_URL}/products/`)
    //   .then((res) => {
    //     if (!res.ok) throw new Error('Failed to fetch products');
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setProducts(data);
    //     const shuffled = [...data].sort(() => 0.5 - Math.random());
    //     setFilteredProducts(shuffled.slice(0, 8));
    //   })
    //   .catch((err) => console.error('Error fetching products:', err));
  }, []);

 useEffect(() => {
    if (searchFromQuery) {
      setSearchTerm(searchFromQuery);
    }
  }, [searchFromQuery]);

  // Filter logic
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.tags || []).some(tag =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      const matchesLocation = filters.location
        ? product.location === filters.location
        : true;

      const matchesExpiry = (() => {
        if (!filters.expiry) return true;
        const today = new Date();
        const expiryDate = new Date(product.expiry_date);
        const diffDays = (expiryDate - today) / (1000 * 60 * 60 * 24);
        if (filters.expiry === 'Today') return diffDays >= 0 && diffDays < 1;
        if (filters.expiry === 'In 3 Days') return diffDays >= 0 && diffDays <= 3;
        if (filters.expiry === 'In a Week') return diffDays >= 0 && diffDays <= 7;
        if (filters.expiry === 'In a Month') return diffDays >= 0 && diffDays <= 30;
        return true;
      })();

      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesExpiry &&
        matchesPrice
      );
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, filters, products]);

  return (
    <div>
      {/* Category buttons */}
      <div className="options" style={{ margin: '1rem 0' }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              backgroundColor: selectedCategory === category ? '#7bb400' : '',
              color: selectedCategory === category ? 'white' : '',
              marginRight: '10px',
              padding: '6px 14px',
              borderRadius: '12px',
              border: '1px solid #7bb400',
              cursor: 'pointer',
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="main-content" style={{ display: 'flex', gap: '20px' }}>
        {/* Filters sidebar */}
        <div className="filters-wrapper">
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        {/* Product results */}
        <div className="products-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Card key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;