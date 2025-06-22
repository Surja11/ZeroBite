// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

import logo from "../assets/Zerobite images/logo.png";
import adminLogo from "../assets/Zerobite images/userIcon.svg";
import searchicon from "../assets/Zerobite images/searchIcon.svg";
import carticon from "../assets/Zerobite images/cartIcon.svg";

function Header({ searchTerm, setSearchTerm, onEnter }) {
  const { cartItems } = useCart();

  return (
    <header>
      <nav className="navbar-custom">
        <div className="container-custom">
          
          {/* Logo */}
          <Link className="logo-link" to="/">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>

          {/* Right section */}
          <div className="right-section">

            {/* Search */}
            <div className="search-container">
              <img src={searchicon} alt="Search" className="search-icon" />
              <input
                type="search"
                placeholder="Search for products .."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={onEnter}
              />
            </div>

            {/* Cart Icon */}
            <Link to="/cart" style={{ position: "relative" }}>
              <img src={carticon} alt="Cart" className="icon-img cart" />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </Link>

            {/* User Profile Icon */}
            <Link to="/userProfile">
              <img src={adminLogo} alt="User Profile" className="icon-img" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
