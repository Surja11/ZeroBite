import React from "react";
import './Header.css';
import logo from '../assets/Zerobite images/logo.png';
import adminLogo from '../assets/Zerobite images/userIcon.svg';
import searchicon from '../assets/Zerobite images/searchIcon.svg';
import carticon from '../assets/Zerobite images/cartIcon.svg';


function Header() {
  return (
    <header>
      <nav className="navbar-custom">
        <div className="container-custom">
          <a className="logo-link" href="/">
            <img src={logo} alt="Logo" className="logo-img" />
          </a>

          <div className="right-section">
            <div className="search-container">
              <img src={searchicon} alt="Search" className="search-icon" />
              <input
                type="search"
                placeholder="Search for products .."
                className="search-input"
              />
            </div>

            <a href="/cart">
              <img src={carticon} alt="Cart logo" className="icon-img cart" />
            </a>
            <a href="/userProfile">
              <img src={adminLogo} alt="Admin logo" className="icon-img" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
