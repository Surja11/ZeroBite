import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import Toast from "../components/Toast";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";
import Card from "../components/ProductCard";
const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const passedProduct = location.state?.product;

  const [product, setProduct] = useState(passedProduct || null);
  const [toastMsg, setToastMsg] = useState("");
  const [recommended, setRecommended] = useState([]);

 useEffect(() => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    console.error("No token found.");
    return;
  }

  fetch(`http://localhost:8000/product/getProducts/${id}/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    })
    .then((data) => setProduct(data))
    .catch((err) => console.error("Error fetching product:", err));
}, [id]);


  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/recommendation/?product_id=${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch recommendations");
          return res.json();
        })
        .then((data) => setRecommended(data)) // 👈 or .slice(0, 8) for max 8
        .catch(console.error);
    }
  }, [id]);


  const handleAddToCart = () => {
    addToCart(product);
    setToastMsg("Added to cart!");
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      {toastMsg && <Toast message={toastMsg} />}

      <div className="product-detail">
        <div className="product-header">
          <img
            src={`http://localhost:8000${product.image}`}
            alt={product.name}
          />
          <div className="product-meta">
            <h1>{product.name}</h1>
            <p><strong>Location:</strong> {product.address || "N/A"}</p>
            <p><strong>Expires:</strong> {new Date(product.expiry_date).toDateString()}</p>
            <p><strong>Price:</strong> Rs. {product.price}</p>
            <p><strong>Description:</strong><br />{product.description}</p>
            <div className="actions">
              <button onClick={handleAddToCart}>Add to Cart</button>
              <button onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
        </div>
        <br /><h1 style={{ fontSize: "35px" }}>Recommended for You</h1>
        {recommended.length > 0 ? (
          <div className="recommended-section">
            <div className="recommended-list">
              {recommended.map((item) => (
                <Card key={item.id} product={item} />
              ))}
            </div>
          </div>
        ) : (
          <p>No recommended products available.</p>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;
