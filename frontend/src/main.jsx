// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 🆕 Import CartProvider
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider> {/* 🆕 Wrap here */}
      <App />
    </CartProvider>
  </StrictMode>,
)
