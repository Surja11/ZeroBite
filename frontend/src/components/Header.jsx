import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import zero from "/images/zero.png";
import adminLogo from "../assets/Zerobite images/userIcon.svg";
import searchicon from "../assets/Zerobite images/searchIcon.svg";
import carticon from "../assets/Zerobite images/cartIcon.svg";
import "./Header.css";

function Header() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState(
    new URLSearchParams(location.search).get("search") || ""
  );

  const [showDropdown, setShowDropdown] = useState(false); // NEW

  const params = new URLSearchParams(location.search);
  const currentLat = params.get("lat");
  const currentLon = params.get("lon");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = searchTerm.trim();
      const newParams = new URLSearchParams();

      if (currentLat) newParams.set("lat", currentLat);
      if (currentLon) newParams.set("lon", currentLon);
      if (trimmed) newParams.set("search", trimmed);

      navigate(`/products?${newParams.toString()}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // clear token
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <header>
      <nav className="navbar-custom">
        <div className="container-custom">
          <Link className="logo-link" to="/">
            <img src={zero} alt="Logo" className="logo-img" />
          </Link>

          <div className="right-section">
            {/* Search bar */}
            <div className="search-container">
              <img src={searchicon} alt="Search" className="search-icon" />
              <input
                type="search"
                placeholder="Search for products..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Cart */}
            <Link to="/cart" style={{ position: "relative" }}>
              <img src={carticon} alt="Cart" className="icon-img cart" />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </Link>

            {/* User Icon with Dropdown */}
            <div className="relative">
              <img
                src={adminLogo}
                alt="User"
                className="icon-img cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              />

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50">
                  <div className="px-4 py-2 text-sm text-gray-800 border-b">
                    ▼ Profile
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
