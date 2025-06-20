import React, { useState } from "react";
// import './Header.css';
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
      <nav className="bg-[#E0DEDE] px-10 py-2.5 border-b border-gray-300">
        <div className="flex items-center justify-between">
          {/* Logo section */}
          <a className="flex items-center" href="/">
            <img src={logo} alt="Logo" className="h-[40px] w-auto" />
          </a>

          
          <div className="flex items-center gap-[50px]">
            <div className="relative flex items-center">
              <img
                src={searchicon}
                alt="Search"
                className="absolute left-2.5 w-4 h-4 pointer-events-none "
              />
              <input
                type="search"
                placeholder="Search for products .."
                className="w-[280px] py-2 pl-8 pr-2 border border-gray-300 rounded-xl bg-white"
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
                className="h-[30px] w-[30px] cursor-pointer opacity-80 transition-opacity duration-200"
              />
            </a>
            <a href="/userProfile">
              <img
                src={adminLogo}
                alt="Admin"
                className="h-[30px] w-[30px] cursor-pointer opacity-80 transition-opacity duration-200"
              />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
