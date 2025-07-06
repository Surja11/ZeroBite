


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

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

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
  const token = localStorage.getItem("access_token");

  if (lat && lon && token) {
    const url = `http://127.0.0.1:8000/product/getProducts/?lat=${lat}&lon=${lon}`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }
}, [lat, lon]);


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
    setCurrentPage(1); // reset to first page on filter/search change
  }, [searchTerm, selectedCategory, filters, products]);

  const updateLocation = (newLat, newLon) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("lat", newLat);
    newParams.set("lon", newLon);
    if (searchTerm) newParams.set("search", searchTerm);
    navigate(`/products?${newParams.toString()}`);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div>
      <div className="options">
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${selectedCategory === category ? "selected" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="product-count">
          Showing {paginatedProducts.length} / {filteredProducts.length} products
        </div>


      </div>

      <div className="main-content">
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
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                state={{ product: p }}
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

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;



