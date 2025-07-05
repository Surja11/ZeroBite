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


import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Card from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import "./Products.css";

const categories = ["All"];

const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const lat = parseFloat(params.get("lat")) || 0;
  const lon = parseFloat(params.get("lon")) || 0;
  const urlSearch = params.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filters, setFilters] = useState({ expiry: "", priceRange: [0, 1000], radius: 5 });

  useEffect(() => {
    if (!params.get("lat") || !params.get("lon")) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          params.set("lat", userLat);
          params.set("lon", userLon);
          navigate(`/products?${params.toString()}`, { replace: true });
        },
        (error) => {
          console.warn("Geolocation failed, defaulting to Kathmandu:", error);
          params.set("lat", 27.5291);
          params.set("lon", 84.3542);
          navigate(`/products?${params.toString()}`, { replace: true });
        }
      );
    }
  }, []);

  useEffect(() => {
    setSearchTerm(params.get("search") || "");
  }, [location.search]);

  useEffect(() => {
    if (lat && lon) {
      fetch(`http://127.0.0.1:8000/product/getProducts?lat=${lat}&lon=${lon}&radius=${filters.radius}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setFilteredProducts(data);
        })
        .catch(console.error);
    }
  }, [lat, lon, filters.radius]);

  useEffect(() => {
    const filtered = products.filter((p) => {
      const name = p.name?.toLowerCase() || "";
      const categoryString = (p.category || []).join(" ").toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch = name.includes(searchLower) || categoryString.includes(searchLower);
      const matchesCategory =
        selectedCategory === "All" ||
        (p.category || []).some((cat) => cat.toLowerCase() === selectedCategory.toLowerCase());

      const matchesExpiry = (() => {
        if (!filters.expiry) return true;
        const today = new Date();
        const expiryDate = new Date(p.expiry_date);
        const diffDays = (expiryDate - today) / (1000 * 60 * 60 * 24);
        if (filters.expiry === "Today") return diffDays >= 0 && diffDays < 1;
        if (filters.expiry === "In 3 Days") return diffDays >= 0 && diffDays <= 3;
        if (filters.expiry === "In a Week") return diffDays >= 0 && diffDays <= 7;
        if (filters.expiry === "In a Month") return diffDays >= 0 && diffDays <= 30;
        return true;
      })();

      const [minPrice, maxPrice] = filters.priceRange;
      const matchesPrice = p.price >= minPrice && p.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesExpiry && matchesPrice;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, filters, products]);

  const updateLocation = (newLat, newLon) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("lat", newLat);
    newParams.set("lon", newLon);
    if (searchTerm) newParams.set("search", searchTerm);
    navigate(`/products?${newParams.toString()}`);
  };

  return (
    <div>
      <div className="options" style={{ margin: "1rem 0" }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              backgroundColor: selectedCategory === category ? "#7bb400" : "",
              color: selectedCategory === category ? "white" : "",
              marginRight: "10px",
              padding: "6px 14px",
              borderRadius: "12px",
              border: "1px solid #7bb400",
              cursor: "pointer",
            }}
          >
            {category}
          </button>
        ))}
        <div className="product-count">
          Showing {filteredProducts.length} / {products.length} items
        </div>
      </div>

      <div className="main-content" style={{ display: "flex", gap: "20px" }}>
        <div className="filters-wrapper">
          <FilterBar
            filters={filters}
            setFilters={setFilters}
            lat={lat}
            lon={lon}
            setLat={(newLat) => updateLocation(newLat, lon)}
            setLon={(newLon) => updateLocation(lat, newLon)}
          />
        </div>

        <div className="products-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                state={{ product: p }} // pass entire product object here
                style={{ textDecoration: "none" }}
              >
                <Card product={p} />
              </Link>
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


