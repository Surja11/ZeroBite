import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import Card from './components/ProductCard';
import './ProductDetail.css';
import Toast from './components/Toast';
// Import your cart hook (adjust path accordingly)
import { useCart } from './context/CartContext'; // <-- NEW

const API_BASE_URL = 'http://localhost:8000/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);

  const { addToCart } = useCart(); // <-- NEW
  const [toastMsg, setToastMsg] = useState('');
  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === Number(id) || p.id === id.toString());
        setProduct(found);
        const recs = data.filter(p => p.category === found.category && p.id !== found.id);
        setRecommended(recs.slice(0, 3));
      })
      .catch(console.error);
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

  // Handler to add product to cart and show success message
  const handleAddToCart = (prod) => {
    addToCart(prod);
    setToastMsg('Added to cart!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div>


      {/* Toast message for feedback */}
      {toastMsg && <Toast message={toastMsg} />}

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
              <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              <button className="buy-now">Buy Now</button>
            </div>
          </div>
        </div>

        <div className="recommended-section">
          <h2>Recommended for You</h2>
          <div className="recommended-list">
            {recommended.map(p => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
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
// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import Header from './components/Header';
// import Card from './components/ProductCard';
// import './ProductDetail.css';

// const API_BASE_URL = 'http://localhost:8000/api';

// const ProductDetail = () => {
//   const { id } = useParams(); // this comes from the URL
//   const [product, setProduct] = useState(null);
//   const [recommended, setRecommended] = useState([]);

//   useEffect(() => {
//     // ✅ Fetch product detail based on ID
//     fetch(`${API_BASE_URL}/products/${id}/`)
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch product');
//         return res.json();
//       })
//       .then(data => {
//         setProduct(data);

//         // ✅ Fetch recommendations after product is set
//         return fetch(`${API_BASE_URL}/products/${id}/recommendations/`);
//       })
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch recommendations');
//         return res.json();
//       })
//       .then(recData => {
//         setRecommended(recData);
//       })
//       .catch(err => console.error("API error:", err));
//   }, [id]); // ⬅️ re-run when URL id changes

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div>
//       <Header />
//       <div className="product-detail">
//         <div className="product-header">
//           <img src={product.image_url} alt={product.name} />
//           <div className="product-meta">
//             <h1>{product.name}</h1>
//             <p><strong>Location:</strong> {product.location}</p>
//             <p><strong>Expires:</strong> {new Date(product.expiry_date).toDateString()}</p>
//             <p><strong>Price:</strong> Rs. {product.price}</p>
//             <p>{product.description}</p>
//             <div className="actions">
//               <button className="add-to-cart">Add to Cart</button>
//               <button className="buy-now">Buy Now</button>
//             </div>
//           </div>
//         </div>

//         <div className="recommended-section">
//           <h2>Recommended for You</h2>
//           <div className="recommended-list">
//             {recommended.map((p) => (
//               <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none', display: 'block' }}>
//                 <Card product={p} />
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
