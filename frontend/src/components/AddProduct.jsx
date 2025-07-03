import React from "react";
import { useState,useRef } from "react";
import upload from "/images/upload.png"
function AddProduct() {
  const [images, setImages] = useState([]);
  const imageInputRef = useRef(null);
const handleDeleteImage = (indexToDelete) => {
  setImages((prev) => prev.filter((_, index) => index !== indexToDelete));
};
  
const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const total = images.length + selectedFiles.length;
    if (total > 3) {
      alert("You can upload a maximum of 3 images.");
      return;
    }
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const handleDeleteProduct = () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (confirmDelete) {
    // Call delete API or logic
    console.log("Product deleted");
  }
};

  return (
    <>
<div className="flex justify-evenly items-center">
       <h1 className="text-gray-500 text-2xl text-center">Add Product</h1>
       <button
    type="button"
    onClick={handleDeleteProduct}
    className="text-red-500 cursor-pointer hover:text-red-600 "
    title="Delete Product"
  >
    🗑️
  </button>
    </div>
    <form action="post">
       <div className="flex flex-col p-6 min-h-screen w-[950px] space-y-8">
        {/* Image Upload Section */}
        <div>
          <label className="text-gray-500 text-[15px] mb-2 block">
            Upload up to 3 images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            ref={imageInputRef}
          />
          <div
            className="grid grid-cols-5 gap-2 border border-dashed border-gray-300 p-4 rounded cursor-pointer"
            onClick={() => imageInputRef.current.click()}
          >
            {images.map((img, index) => (
             <div
             key={index}
  className="relative w-full aspect-square border border-gray-200 rounded overflow-hidden"
>
  {/* Delete Button */}
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation(); // prevents triggering file input
      handleDeleteImage(index);
    }}
    className="absolute top-1 right-1 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-100"
  >
    ×
  </button>

  {/* Image */}
  <img
    src={URL.createObjectURL(img)}
    alt={`Preview ${index}`}
    className="object-cover w-full h-full"
  />
</div>

            ))}
            {images.length < 3 && (
              <div className="w-full aspect-square border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm flex flex-col">
               
                  <img src={upload} alt=""  className="w-"/>
               <span>Upload up 3 images 
                </span> 
                
                
              </div>
            )}
          </div>
        </div>





   <div>
          <label htmlFor="product name" className="text-gray-500 text-[15px]">
            Product Name *
          </label>
          <p></p>
          <input
            type="text"
            className="outline-0 border border-gray-100 rounded w-1/2 p-2 mt-3 shadow "
            />
        </div>
        <div className="flex space-x-12">
          <div>
            <label className="text-gray-500 text-[15px]">Price *</label>
            <p></p>
            <input
              type="text"
              className="outline-0 border border-gray-100 rounded w-full p-2 mt-3 shadow"
              />
          </div>
          {/* </div> */}
          <div>
            <label className="text-gray-500 text-[15px]">
              Discounted Price *
            </label>
            <p></p>
            <input
              type="text"
              className="outline-0 border border-gray-100 rounded w-full p-2 mt-3 shadow"
            />
          </div>
        </div>
        <div>
          <label htmlFor="" className="mb-4 text-[15px] text-gray-500">
            Description *
          </label><p></p>
          <textarea className=" outline-0 border border-gray-100 rounded w-1/2 h-30 px-2  shadow" />
        </div>
        <div>
          <span className="mb-4 text-[15px] text-gray-500">
            Choose Category *
          </span><p></p>

        
            <select 
            className="border text-gray-500 border-gray-100 rounded w-1/2 p-2 mt-3 shadow outline-0"
>
  <option value="Bakery" >Bakery</option>
  <option value="Convenience Store" >Convenience Store</option>
  <option value="Restaurant" >Restaurant</option>
</select>
            </div>
            <button type="submit" className="border text-gray-800 border-gray-100 rounded p-2 mt-3 w-2/14 shadow outline-0 bg-[#bbc289] hover:bg-[#bbc249]">Save</button>
      </div>
    </form>
  </>
  );
}

export default AddProduct;
