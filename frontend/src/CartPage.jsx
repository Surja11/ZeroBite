// src/CartPage.jsx
import React from 'react';
import { useCart } from './context/CartContext'; // 🆕 Import cart context
import Header from './components/Header'; // Include Header for navigation
import './CartPage.css'; // 🆕 Styling for cart page

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Calculate total price of items in cart
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Header />
      <div className="cart-page">
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {/* 🆕 List all cart items */}
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image_url} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Rs. {item.price}</p>

                  {/* 🆕 Quantity input */}
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => {
                      const qty = Number(e.target.value);
                      if (qty > 0) {
                        updateQuantity(item.id, qty);
                      }
                    }}
                  />

                  {/* 🆕 Remove button */}
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}

            <hr />

            {/* 🆕 Total price display */}
            <h3>Total: Rs. {total}</h3>

            {/* 🆕 Checkout button (no functionality yet) */}
            <button className="checkout-btn">Proceed to Checkout</button>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
