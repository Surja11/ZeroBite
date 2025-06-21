// App.jsx or wherever your routes are defined
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './Products';
import ProductDetail from './ProductDetail';
import CartPage from './CartPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} /> 
    </Routes>
  </Router>
);

export default App;
