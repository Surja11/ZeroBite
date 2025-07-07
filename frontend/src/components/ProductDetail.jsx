import React, { useState,useEffect } from "react";
import { deleteProduct, updateProduct } from "../api";

function ProductDetail({ product, onBack, fetchProducts }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedName, setUpdatedName] = useState(product.name);
  const [updatedPrice, setUpdatedPrice] = useState(product.price);
  const [Description, setDescription] = useState(product.description);
  // const [selectedFile, setSelectedFile] = useState(null);
  const [stock,setStock] = useState(product.stock)
  const [Manufacture,setManufacture] = useState(product.manufactured_date)
  const [Expire,setExpire] = useState(product.expiry_date)
  const [category,setCategory] = useState(product.category)
  if (!product) return null;

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      await fetchProducts();
      alert("Product deleted!");
      onBack();
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", updatedName);
      formData.append("price", updatedPrice);
      formData.append("stock",stock);
    formData.append("manufactured_date", Manufacture);
    formData.append("expiry_date",Expire)
    formData.append("category",category)
    formData.append("description", Description) ;
      // formData.append("description", updatedDescription);
      // if (selectedFile) {
      //   formData.append("image", selectedFile);
      // }

      await updateProduct(product.id, formData);
      alert("Product updated!");
      await fetchProducts();
      setShowUpdateForm(false);
    } catch (err) {
      console.error("Failed to update product", err);
    }
  };

  useEffect(() => {
  setUpdatedName(product.name);
  setUpdatedPrice(product.price);
  setDescription(product.description);
  setManufacture(product.manufactured_date)
  setExpire(product.expiry_date)
  setCategory(product.category);
  setStock(product.stock);

}, [product]);

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="text-white mb-4 bg-[#7bb400] hover:bg-[#5c8405] px-4 py-2 rounded"
      >
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

        <div className="flex flex-col border-gray-200 outline-0 border p-4 rounded-lg w-1/2 space-y-3">
          <h3 className="text-xl font-semibold text-gray-700">{product.name}</h3>

          <div className="border-gray-200 border p-2 rounded space-y-1">
            <p className="text-sm text-gray-600">Description: {product.description}</p>
            <p className="text-sm text-gray-600">Category: {product.category}</p>
            <p className="text-sm text-gray-600">Price: Rs.{product.price}</p>
            <p className="text-sm text-gray-600">Stock: {product.stock}</p>
            <p className="text-sm text-gray-600">Expiry: {product.expiry_date}</p>
            <p className="text-sm text-gray-600">Manufactured: {product.manufactured_date}</p>
          </div>

          <div className="flex justify-between pt-4">
            <button
              className="w-1/3 bg-[#00a63e] text-white p-2 rounded hover:bg-[#0ccc52]"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>

            <button
              className="w-1/3 bg-[#1297cc] text-white p-2 rounded hover:bg-blue-600"
              onClick={() => setShowUpdateForm(!showUpdateForm)}
            >
              {showUpdateForm ? "Cancel" : "Update"}
            </button>
          </div>

          {showUpdateForm && (
            <form onSubmit={handleUpdateSubmit} className="pt-4 space-y-3">
              <div>
                <label className="block text-gray-600 text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">Price (Rs.)</label>
                <input
                  type="number"
                  value={updatedPrice}
                  onChange={(e) => setUpdatedPrice(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">Description</label>
                <textarea
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">Quantity : </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>

<div>
                <label className="block text-gray-600 text-sm mb-1">Manufactured *</label>
                <input
                  type="date"
                  value={Manufacture}
                  onChange={(e) => setManufacture(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
<div>
                <label className="block text-gray-600 text-sm mb-1">Expiry date *</label>
                <input
                  type="date"
                  value={Expire}
                  onChange={(e) => setExpire(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>

<div>

 <select
  onChange={(e) => setCategory(e.target.value)}
  value={category}
  className="border text-gray-500 border-gray-100 rounded w-full p-2 mt-3 shadow outline-0"
  required
>
  <option value="">-- Select a category --</option>
  <option value="Cake">Cake</option>
  <option value="Donut">Donut</option>
  <option value="Pastry">Pastry</option>
  <option value="Nepali Khana">Nepali Khana</option>
  <option value="Grocery">Grocery</option>
  <option value="Desserts">Desserts</option>
  <option value="Chinese Cuisine">Chinese Cuisine</option>
  <option value="Fast Food">Fast Food</option>
  <option value="Snacks">Snacks</option>
  <option value="Bread">Bread</option>
  <option value="Vegan">Vegan</option>
  <option value="Gluten-Free">Gluten-Free</option>
  <option value="Continental">Continental</option>
  <option value="Beverages">Beverages</option>
  <option value="Indian Cuisine">Indian Cuisine</option>
</select>

            </div>
              {/* <div>
                <label className="block text-gray-600 text-sm mb-1">New Image (optional)</label>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div> */}

              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
