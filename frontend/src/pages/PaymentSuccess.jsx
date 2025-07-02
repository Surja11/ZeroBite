// src/pages/PaymentSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();

    const timer = setTimeout(() => {
      navigate('/products'); // Go to product page after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>✅ Payment Successful!</h1>
      <p>You’ll be redirected to products shortly...</p>
      <button onClick={() => navigate('/product')}>Go Now</button>
    </div>
  );
};

export default PaymentSuccess;
