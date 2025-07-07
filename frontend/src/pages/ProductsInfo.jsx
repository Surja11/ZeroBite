import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { specificProduct } from "../api";
import ProductDetail from "../components/ProductDetail";
import { ProductsContext } from "../context/ProductsContext";

function ProductsInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProducts } = useContext(ProductsContext);

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const data = await specificProduct(id);
      setProduct(data);
    } catch (err) {
      console.error("Failed to fetch product details", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <ProductDetail
      product={product}
      fetchProducts={fetchProducts}
      onBack={() => navigate(-1)} // go back to previous page
    />
  );
}

export default ProductsInfo;
