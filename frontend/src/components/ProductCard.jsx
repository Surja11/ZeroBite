import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import timer from '../assets/Zerobite images/expiry.png';
import cartIcon from '../assets/Zerobite images/cartIcon.svg';
import { useCart } from '../context/CartContext';
import Toast from './Toast';

const Card = ({ product }) => {
  const { price, discounted_price, name, image, expiry_date, id, business_type } = product;
  const { addToCart } = useCart();
  const [toastMsg, setToastMsg] = useState('');

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setToastMsg('Added to cart!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const expiryDateObj = new Date(expiry_date);
  const now = new Date();
  const diffMs = expiryDateObj - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  let expiryText = '';
  if (diffMs <= 0) {
    expiryText = 'Expired';
  } else if (business_type?.toLowerCase() === 'restaurant' && diffDays === 1) {
    expiryText = `${diffHours} hours`;
  } else if (diffDays >= 1) {
    expiryText = diffDays === 1 ? '1 day' : `${diffDays} days`;
  } else if (diffHours >= 1) {
    expiryText = `${diffHours} hours`;
  } else {
    expiryText = '< 1 hour';
  }

  const imageUrl = image ? `http://localhost:8000${image}` : '/fallback.jpg';

  return (
    <>
      {toastMsg && <Toast message={toastMsg} />}
      <Link to={`/product/${id}`} className="card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card-container">
          <div className="img-container">
            <img src={imageUrl} alt={name} />
          </div>
          <div className="content">
            <h2 style={{ textDecoration: discounted_price < price ? 'line-through' : 'none' }}>
              Rs.{price}
            </h2>
            {discounted_price < price && (
              <h3 style={{ color: 'green' }}>Now: Rs.{discounted_price.toFixed(2)}</h3>
            )}
            <h1>{name}</h1>
            <div className="btn">
              <button className="cart-button" style={{ backgroundColor: '#AEB18A' }} onClick={handleAddToCart}>
                <img className="small-cart" src={cartIcon} alt="cart icon" />
              </button>
              <button className="expiry-button">
                <img className="expiry-button" src={timer} alt="expiry timer" />
                <p style={{ fontSize: '12px' }}>{expiryText}</p>
              </button>
            </div>
            <div className="card-footer">
              <div className="rating">⭐(4.2)</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
