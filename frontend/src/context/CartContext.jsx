// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

// 🆕 Create context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 🆕 State to store cart items
  const [cartItems, setCartItems] = useState([]);

  // 🆕 Add item to cart or increment quantity
  const addToCart = product => {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // 🆕 Remove item from cart
  const removeFromCart = id => {
    setCartItems(prev => prev.filter(p => p.id !== id));
  };

  // 🆕 Update item quantity
  const updateQuantity = (id, qty) => {
    setCartItems(prev =>
      prev.map(p => p.id === id ? { ...p, quantity: qty } : p)
    );
  };
   const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); // 🆕 Export hook
