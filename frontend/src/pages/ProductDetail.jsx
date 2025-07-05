import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Get product passed in Link's state if any
  const passedProduct = location.state?.product;

  const [product, setProduct] = useState(passedProduct || null);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    // Fetch product if not passed via state (e.g., user refreshed page)
    if (!product) {
      fetch(`http://localhost:8000/product/getProducts/${id}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch product");
          return res.json();
        })
        .then((data) => setProduct(data))
        .catch(console.error);
    }
  }, [id, product]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart(product);
    setToastMsg("Added to cart!");
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div>
      {toastMsg && <Toast message={toastMsg} />}
      <div className="product-detail">
        <div className="product-header">
          <img
            src={`http://localhost:8000${product.image}`} // prepend backend URL
            alt={product.name}
            style={{ maxWidth: "400px", borderRadius: "8px" }}
          />
          <div className="product-meta">
            <h1>{product.name}</h1>
            <p>
              <strong>Location:</strong> {product.location || "N/A"}
            </p>
            <p>
              <strong>Expires:</strong>{" "}
              {new Date(product.expiry_date).toDateString()}
            </p>
            <p>
              <strong>Price:</strong> Rs. {product.price}
            </p>
            <p><strong>Description:</strong><br />{product.description}</p>
            <div className="actions">
              <button onClick={handleAddToCart}>Add to Cart</button>
              <button onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
