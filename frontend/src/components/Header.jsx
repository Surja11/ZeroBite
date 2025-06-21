// src/components/Header.jsx
import React from "react";
import { Link } from 'react-router-dom'; // 🛠️ Modified from <a>
import './Header.css';
import logo from '../assets/Zerobite images/logo.png';
import adminLogo from '../assets/Zerobite images/userIcon.svg';
import searchicon from '../assets/Zerobite images/searchIcon.svg';
import carticon from '../assets/Zerobite images/cartIcon.svg';
import { useCart } from '../context/CartContext'; // 🆕 Import

function Header({ searchTerm, setSearchTerm, onEnter }) {
  const { cartItems } = useCart(); // 🆕 Access cart

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <header>
      <nav className="navbar-custom">
        <div className="container-custom">
          <Link className="logo-link" to="/">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>

          <div className="right-section">
            <div className="search-container">
              <img src={searchicon} alt="Search" className="search-icon" />
              <input
                type="search"
                placeholder="Search for products .."
                className="search-input"
                name="searchedItems"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={onEnter}
              />
            </div>

            <Link to="/cart" style={{ position: 'relative' }}>
              <img src={carticon} alt="Cart" className="icon-img cart" />
              {/* 🆕 Show cart count */}
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/userProfile">
              <img src={adminLogo} alt="Admin" className="icon-img" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
