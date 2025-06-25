import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BusinessAcc from './pages/BusinessAcc';
import Business from './pages/Business';

import ProductPage from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function AppRouter() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const onSearchEnter = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/businessacc" element={<BusinessAcc />} />
      <Route path="/business" element={<Business />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
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
