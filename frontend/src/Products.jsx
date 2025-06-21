import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Card from './components/ProductCard';
import Filters from './components/FilterBar';
import './Products.css';

const API_BASE_URL = 'http://localhost:8000/api'; // change this to your backend URL

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
    //Mock data start
     const mockProducts = [
      {
        id: '1',
        name: 'Mocked Bread',
        location: 'Test City',
        expiry_date: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
        price: 50,
        category: 'Bakery',
        tags: ['bread', 'fresh'],
        image_url: '/mockbread.jpg',
      },
      {
        id: '2',
        name: 'Mocked Sandwich',
        location: 'Test City',
        expiry_date: new Date(Date.now() + 3600000 * 5).toISOString(), // 5 hours from now
        price: 80,
        category: 'Restaurant Meal',
        tags: ['sandwich', 'lunch'],
        image_url: '/mocksandwich.jpg',
      },
    ];
    setProducts(mockProducts);
    setFilteredProducts(mockProducts.slice(0, 8));
    //mock data end that canbe uncomment after db connection

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
    if (
      !displayOnEnter &&
      selectedCategory === 'All' &&
      !searchTerm &&
      !filters.location &&
      !filters.expiry
    )
      return;

    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.tags && product.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ));

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
        if (filters.expiry === 'In a Month')
          return diffDays >= 0 && diffDays <= 30;
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
  }, [searchTerm, selectedCategory, displayOnEnter, filters, products]);

  const handleSearchEnter = (event) => {
    if (event.key === 'Enter') {
      setDisplayOnEnter(true);
    }
  };

  const applyFilters = () => {
    setDisplayOnEnter(true);
  };

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onEnter={handleSearchEnter}
      />

      <div className="options" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setDisplayOnEnter(true);
            }}
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
        <div className="filters-wrapper">
          <Filters filters={filters} setFilters={setFilters} onApply={applyFilters} />
        </div>

        <div className="products-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
