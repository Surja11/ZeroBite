import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../api";

function ProductDetail({ product, onBack ,fetchProducts}) {
  const navigate = useNavigate();  

  if (!product) return null;

  const handleDelete = async (productId) => {
    console.log("Deleting product with ID:", productId);
    try {
      await deleteProduct(productId);
      await fetchProducts()
      alert("Deleted");
      onBack(); 
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const handleUpdate = () => {
    // your update logic
  };

  return (
    <div className="p-6 ">
      <button onClick={onBack} className="text-white mb-4 bg-[#7bb400] hover:bg-[#5c8405] delay-200">
        ← Back to Products
      </button>
      <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
      <div className="border p-5 flex space-x-5 shadow border-gray-200">
        <div className="object-cover">
          <img
            src={`http://127.0.0.1:8000${product.image}`}
            alt={product.name}
            className="h-60 w-80 object-cover mb-4 rounded-md"
          />
        </div>
        <div className="flex flex-col border-gray-200 outline-0 border p-2 rounded-lg w-1/3">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              {product.name}
            </h3>
          </div>
          <p className="text-gray-600 mt-2 text-[12px]">Description:</p>
          <div className="border-gray-200 outline-0 border p-2 rounded-lg mb-2">
            <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
          </div>
          <div className="border-gray-200 outline-0 border p-2 rounded-lg mb-2">
            <p className="text-[12px] text-gray-500 ">
              Category:
              <span className="text-sm text-gray-500 m-1">
                {product.category}
              </span>
            </p>
            <p className="text-[12px] text-gray-500 m-1 ">
              Price:
              <span className="text-sm text-gray-500 m-1">
                Rs.{product.price}
              </span>
            </p>
            <p className="text-sm text-gray-500 m-1">Stock: {product.stock}</p>
          </div>
          <div className="border-gray-200 outline-0 border p-2 rounded-lg">
            <p className="text-sm text-gray-500 text-[12px] m-1">
              Expiry: {product.expiry_date}
            </p>
            <p className="text-sm text-gray-500 text-[12px] m-1">
              Manufactured: {product.manufactured_date}
            </p>
          </div>
          <div className="flex justify-between p-4">
            <button className="w-1/3" onClick={() => handleDelete(product.id)}>
              Delete
            </button>
            <button className="w-1/3" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
