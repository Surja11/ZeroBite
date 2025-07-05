import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusinessAcc from "./pages/BusinessAcc";
import Business from "./pages/Business";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProductPage from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

function AppRouter() {
  const location = useLocation();

  const hideHeaderPaths = ["/", "/login", "/register","/BusinessAcc","/home"];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}

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
        <Route path="/payment-success" element={<PaymentSuccess />} />
  

      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}
