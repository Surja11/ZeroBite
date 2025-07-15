// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Card from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import "./Products.css";

const categories = [
  { label: "All", value: "All" },
  { label: "Bakery", value: "bakery" },
  { label: "Convenience Store", value: "convenience_store" },
  { label: "Restaurant", value: "restaurant" }
];

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
  const [filters, setFilters] = useState({
    expiry: "",
    priceRange: [0, 1000],
    radius: 5
  });

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
        () => {
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
      fetch(`http://127.0.0.1:8000/product/getProducts/?lat=${lat}&lon=${lon}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.ok ? res.json() : Promise.reject(res.status))
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
    const categoryString = Array.isArray(p.category)
      ? p.category.join(" ").toLowerCase()
      : typeof p.category === "string"
      ? p.category.toLowerCase()
      : "";

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      name.includes(searchLower) || categoryString.includes(searchLower);

    const matchesBusinessType =
      selectedCategory === "All" ||
      (p.business_type &&
        p.business_type.toLowerCase() === selectedCategory.toLowerCase());

    const [minPrice, maxPrice] = filters.priceRange;
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;

    // Expiry filtering
    const now = new Date();
    const expiryDate = new Date(p.expiry_date);
    const diffMs = expiryDate - now;
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    // General expiry filter from filter bar
    const matchesExpiry = (() => {
      if (!filters.expiry) return true;
      if (filters.expiry === "Today") return diffDays >= 0 && diffDays < 1;
      if (filters.expiry === "In 3 Days") return diffDays >= 0 && diffDays <= 3;
      if (filters.expiry === "In a Week") return diffDays >= 0 && diffDays <= 7;
      if (filters.expiry === "In a Month") return diffDays >= 0 && diffDays <= 30;
      return true;
    })();

    // Final filter logic based on business type & expiry
    const isRestaurant = p.business_type?.toLowerCase() === "restaurant";

    if (!isRestaurant && diffHours <= 24) return false; // Hide non-restaurants expiring in <= 24h
    if (isRestaurant && diffHours <= 1) return false;   // Hide restaurants expiring in <= 1h

    return (
      matchesSearch &&
      matchesBusinessType &&
      matchesExpiry &&
      matchesPrice
    );
  });

  setFilteredProducts(filtered);
  setCurrentPage(1);
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
        <div className="category-buttons" style={{ justifyContent: "space-around" }}>
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`category-button ${selectedCategory === cat.value ? "selected" : ""}`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
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
          <button onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1}>
            ← Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
