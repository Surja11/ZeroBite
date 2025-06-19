import React, { useState } from "react";
import './Header.css';
import logo from '../assets/Zerobite images/logo.png';
import adminLogo from '../assets/Zerobite images/userIcon.svg';
import searchicon from '../assets/Zerobite images/searchIcon.svg';
import carticon from '../assets/Zerobite images/cartIcon.svg';


function Header({ searchTerm, setSearchTerm, onEnter }) {
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <header>
      <nav className="navbar-custom">
        <div className="container-custom">
          {/* Logo section */}
          <a className="logo-link" href="/">
            <img src={logo} alt="Logo" className="logo-img" />
          </a>

          
          <div className="right-section">
            <div className="search-container">
              <img
                src={searchicon}
                alt="Search"
                className="search-icon"
              />
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

            <a href="/cart">
              <img
                src={carticon}
                alt="Cart"
                className="icon-img cart"
              />
            </a>
            <a href="/userProfile">
              <img
                src={adminLogo}
                alt="Admin"
                className="icon-img"
              />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
