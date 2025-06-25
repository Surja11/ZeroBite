import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Header from './components/Header';
import Home from './pages/Home';                // from first version
import Login from './pages/Login';              // from first version
import Register from './pages/Register';        // from first version
import BusinessAcc from './pages/BusinessAcc';  // from first version

import ProductPage from './Products';            // from second version
import ProductDetail from './ProductDetail';    // from second version
import CartPage from './CartPage';               // from second version
import CheckoutPage from './CheckoutPage';      // from second version

function AppRouter() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const onSearchEnter = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onEnter={onSearchEnter}
      />
      <Routes>
        {/* Routes from first version */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/businessacc" element={<BusinessAcc />} />

        {/* Routes from second version */}
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppRouter />
      </Router>
    </CartProvider>
  );
}
