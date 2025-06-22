import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Header from './components/Header';
import ProductPage from './Products';
import ProductDetail from './ProductDetail';
import CartPage from './CartPage';

function AppRouter() {
  const [searchTerm, setSearchTerm] = useState(''); // 🛠️ Added: manage search globally
  const navigate = useNavigate();

  const onSearchEnter = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`); // 🛠️ Added: navigate on Enter
    }
  };

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onEnter={onSearchEnter} // 🛠️ Added: pass handler down
      />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <CartProvider> {/* 🛠️ Added: wrap with CartProvider */}
      <Router>
        <AppRouter />
      </Router>
    </CartProvider>
  );
}
