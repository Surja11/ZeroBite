import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Card from '../components/ProductCard';
import Toast from '../components/Toast';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    // 👇 Replace with your actual API URL
    fetch(`http://localhost:8000/product/getProduct/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        // If you plan to fetch recommended, you can add that here
        // fetch(`http://localhost:8000/product/recommend/${id}/`)
        //   .then(res => res.json())
        //   .then(setRecommended);
      })
      .catch(console.error);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart(product);
    setToastMsg('Added to cart!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div>
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
              <button onClick={handleAddToCart}>Add to Cart</button>
              <button onClick={handleBuyNow}>Buy Now</button>
            </div>
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
