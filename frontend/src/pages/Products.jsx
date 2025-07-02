// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Card from '../components/ProductCard';
// import FilterBar from '../components/FilterBar';
// import './Products.css';
// import Header from '../components/Header';

// const ProductPage = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const searchFromQuery = queryParams.get('search') || '';

//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(searchFromQuery);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const [filters, setFilters] = useState({
//     location: '',
//     expiry: '',
//     priceRange: [0, 1000],
//   });

//   const categories = ['All', 'Bakery', 'Packaged Food', 'Restaurant Meal'];

//   useEffect(() => {
//     fetch('/products.json')
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data);
//         setFilteredProducts(data);
//       })
//       .catch(console.error);
//   }, []);

//   useEffect(() => {
//     if (searchFromQuery) {
//       setSearchTerm(searchFromQuery);
//     }
//   }, [searchFromQuery]);

//   useEffect(() => {
//     let filtered = products.filter(product => {
//       const matchesSearch =
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (product.tags || []).some(tag =>
//           tag.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//       const matchesCategory =
//         selectedCategory === 'All' || product.category === selectedCategory;

//       const matchesLocation = filters.location
//         ? product.location === filters.location
//         : true;

//       const matchesExpiry = (() => {
//         if (!filters.expiry) return true;
//         const today = new Date();
//         const expiryDate = new Date(product.expiry_date);
//         const diffDays = (expiryDate - today) / (1000 * 60 * 60 * 24);
//         if (filters.expiry === 'Today') return diffDays >= 0 && diffDays < 1;
//         if (filters.expiry === 'In 3 Days') return diffDays >= 0 && diffDays <= 3;
//         if (filters.expiry === 'In a Week') return diffDays >= 0 && diffDays <= 7;
//         if (filters.expiry === 'In a Month') return diffDays >= 0 && diffDays <= 30;
//         return true;
//       })();

//       const matchesPrice =
//         product.price >= filters.priceRange[0] &&
//         product.price <= filters.priceRange[1];

//       return (
//         matchesSearch &&
//         matchesCategory &&
//         matchesLocation &&
//         matchesExpiry &&
//         matchesPrice
//       );
//     });

//     setFilteredProducts(filtered);
//   }, [searchTerm, selectedCategory, filters, products]);

//   return (
//     <div>
    
//       <div className="options" style={{ margin: '1rem 0' }}>
//         {categories.map(category => (
//           <button
//             key={category}
//             onClick={() => setSelectedCategory(category)}
//             style={{
//               backgroundColor: selectedCategory === category ? '#7bb400' : '',
//               color: selectedCategory === category ? 'white' : '',
//               marginRight: '10px',
//               padding: '6px 14px',
//               borderRadius: '12px',
//               border: '1px solid #7bb400',
//               cursor: 'pointer',
//             }}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       <div className="main-content" style={{ display: 'flex', gap: '20px' }}>
//         <div className="filters-wrapper">
//           <FilterBar filters={filters} setFilters={setFilters} />
//         </div>

//         <div className="products-container">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map(product => (
//               <Card key={product.id} product={product} />
//             ))
//           ) : (
//             <p>No products found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;



import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import './Products.css';
import Header from '../components/Header';

const categoryNameMap = {
  1: 'bakery',
  2: 'restaurant',
  3: 'convenience_store',
};

const categories = ['All', 'Bakery', 'Packaged Food', 'Restaurant Meal'];

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const ProductPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = parseFloat(queryParams.get('lat')) || 0;
  const lon = parseFloat(queryParams.get('lon')) || 0;
  const searchFromQuery = queryParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchFromQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [filters, setFilters] = useState({
    location: '',
    radius: 5,
    expiry: '',
    priceRange: [0, 1000],
  });

  useEffect(() => {
    fetch(`/getProducts?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(console.error);
  }, [lat, lon]);

  useEffect(() => {
    if (searchFromQuery) {
      setSearchTerm(searchFromQuery);
    }
  }, [searchFromQuery]);

  useEffect(() => {
    let filtered = products.filter((product) => {
      const nameLower = product.name?.toLowerCase() || '';
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = nameLower.includes(searchLower);

      const productCategory = categoryNameMap[product.category];
      const matchesCategory =
        selectedCategory === 'All' ||
        productCategory === selectedCategory.toLowerCase();

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

      const [minPrice, maxPrice] = filters.priceRange || [0, 1000];
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

      const matchesLocationRadius = (() => {
        if (!product.lat || !product.lon) return true;
        const productLat = parseFloat(product.lat);
        const productLon = parseFloat(product.lon);
        const distance = getDistanceFromLatLonInKm(lat, lon, productLat, productLon);
        return distance <= (filters.radius || 5);
      })();

      return (
        matchesSearch &&
        matchesCategory &&
        matchesExpiry &&
        matchesPrice &&
        matchesLocationRadius
      );
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, filters, products, lat, lon]);

  return (
    <div>
      <div className="options" style={{ margin: '1rem 0' }}>
        {categories.map((category) => (
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
        <div className="filters-wrapper">
          <FilterBar
            filters={filters}
            setFilters={setFilters}
            onApply={() => {}}
          />
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
