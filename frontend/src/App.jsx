import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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
import ProductLists from "./pages/ProductLists";
import AddProduct from "./pages/AddProduct";
import ProductsInfo from "./pages/ProductsInfo";
function AppRouter() {
  const location = useLocation();

  const hideHeaderPaths = [
    "/",
    "/login",
    "/register",
    "/businessacc",
    "/home",
    "/business",
    "/business/add",
    "/business/productlist",
    "/business/product/:id"
  ];
  // const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);
const shouldShowHeader =
  !hideHeaderPaths.includes(location.pathname) &&
  !location.pathname.startsWith("/business/product/");

  return (
    <>
      {shouldShowHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/businessacc" element={<BusinessAcc />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      
        <Route path="/business" element={<Business />}>
         {/* <Route index element={<Navigate to="productlist" />} /> */}
          <Route path="productlist" element={<ProductLists />} />
        <Route path="add" element={<AddProduct />} />
       <Route path="product/:id" element={<ProductsInfo />} />
        </Route> 
        


      
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
