// src/CheckoutPage.jsx
import React, { useState } from 'react';
import { useCart } from './context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    instructions: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    // 🚀 Here you would trigger eSewa integration logic

    alert('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  return (
    <div className="checkout-page">
      <strong><h1 className='text-center' style={{fontSize:'22px'}}>Billing & Payment</h1></strong>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <label>
            Full Name
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required />
          </label>
          <label>
            Email Address
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Phone Number
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
          </label>
          <label>
            Address
            <input type="text" name="address" value={form.address} onChange={handleChange} required />
          </label>
          <div className="form-row">
            <label>
              City
              <input type="text" name="city" value={form.city} onChange={handleChange} required />
            </label>
            <label>
              State
              <input type="text" name="state" value={form.state} onChange={handleChange} required />
            </label>
            <label>
              ZIP Code
              <input type="text" name="zip" value={form.zip} onChange={handleChange} required />
            </label>
          </div>
          <label>
            Delivery Instructions (Optional)
            <textarea name="instructions" value={form.instructions} onChange={handleChange} rows="3" />
          </label>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.name} x {item.quantity} — Rs. {item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p className="total">Total: Rs. {total}</p>
        </div>

        <button type="submit" className="pay-btn">Pay with eSewa</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
