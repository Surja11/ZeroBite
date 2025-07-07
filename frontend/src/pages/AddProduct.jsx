import React, { useState, useRef, useContext } from "react";
import upload from "/images/upload.png";
import { postProduct } from "../api";
import { ProductsContext } from "../context/ProductsContext";
import {  useNavigate } from "react-router-dom";
function AddProduct() {
    const navigate = useNavigate()
  const { fetchProducts } = useContext(ProductsContext);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("brand", brandName);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("manufactured_date", manufacturedDate);
    formData.append("expiry_date", expiryDate);
    formData.append("available", available);
    if (image) formData.append("image", image);
    formData.append("category", category);

    try {
      await postProduct(formData);
      alert("Product successfully posted!");
      fetchProducts(); // refresh product list
      // reset form state
      setProductName("");
      setBrandName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setStock(1);
      setManufacturedDate("");
      setExpiryDate("");
      setAvailable(false);
      setImage(null);
      navigate("/business/productlist")
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Error submitting product.");
    }
  };

  return (
   
      <>
           <div className="flex justify-evenly items-center">
             <h1 className="text-gray-500 text-2xl text-center">Add Product</h1>
             {/*  */}
           </div>
     
           <form method="POST" onSubmit={handleSubmit}>
             <div className="flex flex-col p-6 min-h-screen w-[950px] space-y-8">
               {/* Image Upload */}
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
     
               {/* Product Name */}
               <div>
                 <label className="text-gray-500 text-[15px]">Product Name *</label>
                 <p></p>
                 <input
                   type="text"
                   value={productName}
                   onChange={(e) => setProductName(e.target.value)}
                   className="outline-0 text-gray-500 border border-gray-100 rounded w-1/2 p-2 mt-3 shadow"
                 />
               </div>
     
               {/* Price and Brand */}
               <div className="flex space-x-12">
                 <div>
                   <label className="text-gray-500 text-[15px]">Price *</label>
                   <p></p>
                   <input
                     type="text"
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     className="outline-0 text-gray-500 border border-gray-100 rounded w-full p-2 mt-3 shadow"
                   />
                 </div>
                 <div>
                   <label className="text-gray-500 text-[15px]">Brand *</label>
                   <p></p>
                   <input
                     type="text"
                     value={brandName}
                     onChange={(e) => setBrandName(e.target.value)}
                     className="outline-0 text-gray-500 border border-gray-100 rounded w-full p-2 mt-3 shadow"
                   />
                 </div>
               </div>
     
               {/* Manufacture and Expiry Dates */}
               <div className="flex space-x-12">
                 <div>
                   <label className="text-gray-500 text-[15px]">
                     Manufacture Date *
                   </label>
                   <p></p>
                   <input
                     type="date"
                     value={manufacturedDate}
                     onChange={(e) => setManufacturedDate(e.target.value)}
                     className="outline-0 text-gray-500 border border-gray-100 rounded w-full p-2 mt-3 shadow"
                   />
                 </div>
                 <div>
                   <label className="text-gray-500 text-[15px]">Expiry Date *</label>
                   <p></p>
                   <input
                     type="date"
                     value={expiryDate}
                     onChange={(e) => setExpiryDate(e.target.value)}
                     className="outline-0 text-gray-500 border border-gray-100 rounded w-full p-2 mt-3 shadow"
                   />
                 </div>
               </div>
     
               {/* Stock */}
               <div>
                 <label className="text-gray-500 text-[15px]">Stock *</label>
                 <p></p>
                 <input
                   type="number"
                   min={1}
                   value={stock}
                   onChange={(e) => setStock(e.target.value)}
                   className="outline-0 text-gray-500 border border-gray-100 rounded w-1/5 p-2 mt-3 shadow"
                 />
               </div>
     
               {/* Description */}
               <div>
                 <label className="text-gray-500 text-[15px]">Description *</label>
                 <p></p>
                 <textarea
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   className="outline-0 text-gray-500 border border-gray-100 rounded w-1/2 h-30 px-2 shadow"
                 />
               </div>
     
               {/* Category */}
               <div>
                 <label className="text-gray-500 text-[15px]">
                   Choose Category *
                 </label>
                 <p></p>
                 <select
                   onChange={(e) => {
                     const selected = Array.from(
                       e.target.selectedOptions,
                       (option) => option.value
                     );
                     setCategory(selected);
                   }}
                   value={category}
                   className="border text-gray-500 border-gray-100 rounded w-1/2 p-2 mt-3 shadow outline-0"
                 >
                   <option value="">-- Select a category --</option>{" "}
                   {/* Blank option */}
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
     
               {/* Available */}
               <div className="flex items-center gap-2 mt-4">
                 <input
                   type="checkbox"
                   id="available"
                   checked={available}
                   onChange={(e) => setAvailable(e.target.checked)}
                   className="w-4 h-4"
                 />
                 <label htmlFor="available" className="text-gray-500 text-[15px]">
                   Available for Sale
                 </label>
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
