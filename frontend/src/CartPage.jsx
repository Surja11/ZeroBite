// src/CartPage.jsx
import React from 'react';
import { useCart } from './context/CartContext';
import Header from './components/Header';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
    
      <div className="cart-page">
        <h1 className='text-center mb-5' ><strong>Your Cart</strong></h1>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image_url} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: Rs. {item.price}</p>

                  {/* Quantity */}
                  <label>
                    Qty:
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={item.quantity}
                      onChange={e => {
                        const qty = Number(e.target.value);
                        if (qty > 0 && qty <= 10) {
                          updateQuantity(item.id, qty);
                        }
                      }
}
                    />
                  </label>

                  {/* Per-item total */}
                  <p className="item-total">Total: Rs. {item.price * item.quantity}</p>

                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <hr />
            <div className="cart-summary">
              <h3>Grand Total: Rs. {total}</h3>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
