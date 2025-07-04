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

  const params = new URLSearchParams(location.search);
  const currentLat = params.get("lat");
  const currentLon = params.get("lon");
  const initialSearch = params.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = searchTerm.trim();
      const newParams = new URLSearchParams();

      if (currentLat) newParams.set("lat", currentLat);
      if (currentLon) newParams.set("lon", currentLon);

      if (trimmed) {
        newParams.set("search", trimmed);
        navigate(`/products?${newParams.toString()}`);
      } else {
        navigate(`/products?${newParams.toString()}`);
      }
    }
  };

  return (
    <header>
      <nav className="navbar-custom">
        <div className="container-custom">
          <Link className="logo-link" to="/">
            <img src={zero} alt="Logo" className="logo-img" />
          </Link>
          <div className="right-section">
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
            <Link to="/cart" style={{ position: "relative" }}>
              <img src={carticon} alt="Cart" className="icon-img cart" />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/userProfile">
              <img src={adminLogo} alt="User" className="icon-img" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
