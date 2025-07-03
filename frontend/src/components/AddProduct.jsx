import React, { useState, useRef } from "react";
import upload from "/images/upload.png";
import { postProduct } from "../api";

function AddProduct() {
  const [image, setImage] = useState(null);
  const imageInputRef = useRef(null);
 const [productName, setProductName] = useState("");
const [brandName, setBrandName] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [category, setCategory] = useState("");
const [stock, setStock] = useState(1);
const [manufacturedDate, setManufacturedDate] = useState("");
const [expiryDate, setExpiryDate] = useState("");
const [available, setAvailable] = useState(false);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setImage(selectedFile);
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const handleDeleteProduct = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      console.log("Product deleted");
    }
  };

  const HandleSubmit =async (e)=>{
	e.preventDefault();
const formData = new FormData();
  formData.append("name", productName);
  formData.append("brand", brandName);
  formData.append("price", price);
  formData.append("stock", stock);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("manufactured_date", manufacturedDate);
  formData.append("expiry_date", expiryDate);
  formData.append("available",available);
  if (image) formData.append("image", image);

  try {
    const data = await postProduct(formData);
    console.log("Product posted:", data);
    alert("posted")
    setBrandName("")
    setProductName("")
    setCategory("")
    setDescription("")
    setExpiryDate("");
    setManufacturedDate("")
    setStock(1);
    setImage(null)
    setPrice("")
    setAvailable(false)
  } catch (error) {
    console.error("Error submitting product:", error);
  }
  }
  return (
    <>
      <div className="flex justify-evenly items-center">
        <h1 className="text-gray-500 text-2xl text-center">Add Product</h1>
        <button
          type="button"
          onClick={handleDeleteProduct}
          className="text-red-500 cursor-pointer hover:text-red-600 outline-0"
          title="Delete Product"
        >
          🗑️
        </button>
      </div>

      <form    method="POST"
            onSubmit={HandleSubmit}>
        <div className="flex flex-col p-6 min-h-screen w-[950px] space-y-8">
          {/* Image Upload Section */}
          <div>
            <label className="text-gray-500 text-[15px] mb-2 block">
              Upload image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={imageInputRef}
            />

            <div
              className="grid grid-cols-5 gap-2 border border-dashed border-gray-300 p-4 rounded cursor-pointer"
              onClick={() => imageInputRef.current.click()}
            >
              {image ? (
                <div className="relative w-full aspect-square border border-gray-200 rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage();
                    }}
                    className="absolute top-1 right-1 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-100"
                  >
                    ×
                  </button>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-full aspect-square border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm flex-col">
                  <img src={upload} alt="Upload icon" />
                  <span>Upload image</span>
                </div>
              )}
            </div>
          </div>

          {/* Add your remaining form fields here... (unchanged) */}
          {/* Product Name */}
          <div>
            <label className="text-gray-500 text-[15px]">Product Name *</label> <p></p>
            <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)} className="outline-0 text-gray-500 border border-gray-100 rounded w-1/2 p-2 mt-3 shadow" />
          </div>

          {/* Price and Brand */}
          <div className="flex space-x-12">
            <div>
              <label className="text-gray-500 text-[15px]">Price *</label>
              <input value={price}   onChange={(e) => setPrice(e.target.value)}
 type="text" className="outline-0 text-gray-500 border border-gray-100 rounded w-full p-2 mt-3 shadow" />
            </div>
            <div>
              <label className="text-gray-500 text-[15px]">Brand *</label>
              <input value={brandName}   onChange={(e) => setBrandName(e.target.value)}
 type="text" className="outline-0 text-gray-500 border border-gray-100 rounded w-full p-2 mt-3 shadow" />
            </div>
          </div>

          {/* Manufacture and Expiry Dates */}
          <div className="flex space-x-12">
            <div>
              <label className="text-gray-500 text-[15px]">Manufacture Date *</label>
              <input value={manufacturedDate}   onChange={(e) => setManufacturedDate(e.target.value)}
 type="date" className="outline-0 text-gray-500 border text-gray-500 border-gray-100 rounded w-full p-2 mt-3 shadow" />
            </div>
            <div>
              <label className="text-gray-500 text-[15px]">Expiry date *</label>
              <input value={expiryDate}   onChange={(e) => setExpiryDate(e.target.value)}
 type="date" className="outline-0 text-gray-500 text-gray-500 border border-gray-100 rounded w-full p-2 mt-3 shadow" />
            </div>
          </div>
          <div>
            {/* stock */}
  <label className="text-gray-500 text-[15px]">Stock *</label>
 <p></p> <input
    type="number" value={stock}
    min={1}   onChange={(e) => setStock(e.target.value)}

    className="outline-0 text-gray-500 border border-gray-100 rounded w-1/5 p-2 mt-3 shadow"
  />
</div>
          {/* Description */}
          <div>
            <label  className="mb-4 text-[15px] text-gray-500">Description *</label><p></p>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="outline-0 text-gray-500 border border-gray-100 rounded w-1/2 h-30 px-2 shadow" />
          </div>

          {/* Category */}
          <div>
            <label className="mb-4 text-[15px] text-gray-500">Choose Category *</label> <p></p>
            
            <select   onChange={(e) => setCategory(e.target.value)}
 value={category} className="border text-gray-500 border-gray-100 rounded w-1/2 p-2 mt-3 shadow outline-0">
              <option value="1">Bakery</option>
              <option value="2">Convenience Store</option>
              <option value="3">Restaurant</option>
            </select>
          </div>

{/* Available */}
<div className="flex items-center gap-2 mt-4">
  <input type="checkbox" id="available" className="w-4 h-4"   checked={available}
      onChange={(e) => setAvailable(e.target.checked)} />
  <label htmlFor="available" className="text-gray-500 text-[15px]">Available for Sale</label>
</div>
          {/* Submit Button */}
          <button
            type="submit"
            className="border text-gray-800 border-gray-100 rounded p-2 mt-3 w-2/14 shadow outline-0 bg-[#bbc289] hover:bg-[#bbc249]"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
