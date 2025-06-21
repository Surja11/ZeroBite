import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './components/Header';
import Card from './components/ProductCard';
import './ProductDetail.css';

const API_BASE_URL = 'http://localhost:8000/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    // ===== MOCK DATA START =====
    const fakeProduct = {
      id,
      name: "Sample Product",
      location: "Mock City",
      expiry_date: new Date(Date.now() + 86400000).toISOString(),
      price: 120,
      image_url: "/kitkat.jpg",
      description: "This is a mocked product description.",
      tags: ["snack", "sweet"],
    };
    const fakeRecommended = [
      {
        id: "2",
        name: "Mocked Snack A",
        location: "Mock City",
        expiry_date: new Date(Date.now() + 172800000).toISOString(),
        price: 90,
        image_url: "/kitkat.jpg",
        description: "Similar product description",
        tags: ["snack"],
      },
      {
        id: "3",
        name: "Mocked Snack B",
        location: "Mock City",
        expiry_date: new Date(Date.now() + 259200000).toISOString(),
        price: 95,
        image_url: "/kitkat.jpg",
        description: "Another similar product",
        tags: ["snack", "sweet"],
      },
    ];
    setProduct(fakeProduct);
    setRecommended(fakeRecommended);
    // ===== MOCK DATA END =====

    /*
    // ===== FETCH REAL DATA =====
    // 1. Fetch main product
    fetch(`${API_BASE_URL}/products/${id}/`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then(data => {
        setProduct(data);

        // 2. Fetch recommendations using your TF-IDF + cosine similarity endpoint
        return fetch(`${API_BASE_URL}/products/${id}/recommendations/`);
      })
      .then(res => res.json())
      .then(recData => {
        setRecommended(recData);
      })
      .catch(err => console.error("API error:", err));
    // ===== FETCH REAL DATA END =====
    */
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <div className="product-detail">
        <div className="product-header">
          <img src={product.image_url} alt={product.name} />
          <div className="product-meta">
            <h1>{product.name}</h1>
            <p><strong>Location:</strong> {product.location}</p>
            <p><strong>Expires:</strong> {new Date(product.expiry_date).toDateString()}</p>
            <p><strong>Price:</strong> Rs. {product.price}</p>
            <p>{product.description}</p>
            <div className="actions">
              <button className="add-to-cart">Add to Cart</button>
              <button className="buy-now">Buy Now</button>
            </div>
          </div>
        </div>

        <div className="recommended-section">
          <h2>Recommended for You</h2>
          <div className="recommended-list">
            {recommended.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
                <Card product={p} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
