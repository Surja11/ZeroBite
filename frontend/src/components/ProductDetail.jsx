// // import React, { useEffect } from "react";

// // import { deleteProduct } from "../api";
// // import { updateProduct } from "../api";
// // import { useState } from "react";

// // function ProductDetail({ product, onBack ,fetchProducts}) {
 
// // const [update,setUpdate] = useState(false)
// //   if (!product) return null;

// //   const handleDelete = async (productId) => {
// //     console.log("Deleting product with ID:", productId);
// //     try {
// //       await deleteProduct(productId);
// //       await fetchProducts()
// //       alert("Deleted");
// //       onBack(); 
// //     } catch (err) {
// //       console.error("Failed to delete", err);
// //     }
// //   };

// //   const handleUpdate = async () => {
// //   setUpdate(true)
// //     try {
// //       const formData = new FormData();
// //       formData.append("name", updatedName);
// //       formData.append("price", updatedPrice);
// //       if (selectedFile) {
// //         formData.append("image", selectedFile);
// //       }

// //       await updateProduct(product.id, formData);
// //       alert("Product updated!");
// //       await fetchProducts();
// //       onBack();
// //     } catch (err) {
// //       console.error("Failed to update product:", err);
// //     }
// //   };

// //   return (
// //     <div className="p-6 ">
// //       <button onClick={onBack} className="text-white mb-4 bg-[#7bb400] hover:bg-[#5c8405] delay-200">
// //         ← Back to Products
// //       </button>
// //       <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
// //       <div className="border p-5 flex space-x-5 shadow border-gray-200">
// //         <div className="object-cover">
// //           <img
// //             src={`http://127.0.0.1:8000${product.image}`}
// //             alt={product.name}
// //             className="h-60 w-80 object-cover mb-4 rounded-md"
// //           />
// //         </div>
// //         <div className="flex flex-col border-gray-200 outline-0 border p-2 rounded-lg w-1/3">
// //           <div>
// //             <h3 className="text-xl font-semibold mb-3 text-gray-700">
// //               {product.name}
// //             </h3>
// //           </div>
// //           <p className="text-gray-600 mt-2 text-[12px]">Description:</p>
// //           <div className="border-gray-200 outline-0 border p-2 rounded-lg mb-2">
// //             <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
// //           </div>
// //           <div className="border-gray-200 outline-0 border p-2 rounded-lg mb-2">
// //             <p className="text-[12px] text-gray-500 ">
// //               Category:
// //               <span className="text-sm text-gray-500 m-1">
// //                 {product.category}
// //               </span>
// //             </p>
// //             <p className="text-[12px] text-gray-500 m-1 ">
// //               Price:
// //               <span className="text-sm text-gray-500 m-1">
// //                 Rs.{product.price}
// //               </span>
// //             </p>
// //             <p className="text-sm text-gray-500 m-1">Stock: {product.stock}</p>
// //           </div>
// //           <div className="border-gray-200 outline-0 border p-2 rounded-lg">
// //             <p className="text-sm text-gray-500 text-[12px] m-1">
// //               Expiry: {product.expiry_date}
// //             </p>
// //             <p className="text-sm text-gray-500 text-[12px] m-1">
// //               Manufactured: {product.manufactured_date}
// //             </p>
// //           </div>
// //           <div className="flex justify-between p-4">
// //             <button className="w-1/3" onClick={() => handleDelete(product.id)}>
// //               Delete
// //             </button>
// //             <button className="w-1/3" onClick={handleUpdate}>
// //               Update
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //       {update &&(
// //         <div>

// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default ProductDetail;
// import React, { useState } from "react";
// import { deleteProduct, updateProduct } from "../api";

// function ProductDetail({ product, onBack, fetchProducts }) {
//   const [showUpdateForm, setShowUpdateForm] = useState(false);
//   const [updatedName, setUpdatedName] = useState(product.name);
//   const [updatedPrice, setUpdatedPrice] = useState(product.price);
//   const [selectedFile, setSelectedFile] = useState(null);

//   if (!product) return null;

//   const handleDelete = async (productId) => {
//     try {
//       await deleteProduct(productId);
//       await fetchProducts();
//       alert("Product deleted!");
//       onBack();
//     } catch (err) {
//       console.error("Failed to delete product", err);
//     }
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("name", updatedName);
//       formData.append("price", updatedPrice);
//       if (selectedFile) {
//         formData.append("image", selectedFile);
//       }

//       await updateProduct(product.id, formData);
//       alert("Product updated!");
//       await fetchProducts();
//       setShowUpdateForm(false);
//     } catch (err) {
//       console.error("Failed to update product", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <button
//         onClick={onBack}
//         className="text-white mb-4 bg-[#7bb400] hover:bg-[#5c8405] px-4 py-2 rounded"
//       >
//         ← Back to Products
//       </button>

//       <h2 className="text-2xl font-semibold mb-4">Product Details</h2>

//       <div className="border p-5 flex space-x-5 shadow border-gray-200">
//         {/* Image */}
//         <div className="object-cover">
//           <img
//             src={`http://127.0.0.1:8000${product.image}`}
//             alt={product.name}
//             className="h-60 w-80 object-cover mb-4 rounded-md"
//           />
//         </div>

//         {/* Details and Buttons */}
//         <div className="flex flex-col border-gray-200 outline-0 border p-4 rounded-lg w-1/2 space-y-3">
//           <h3 className="text-xl font-semibold text-gray-700">{product.name}</h3>

//           <div className="border-gray-200 border p-2 rounded space-y-1">
//             <p className="text-sm text-gray-600">Description: {product.description}</p>
//             <p className="text-sm text-gray-600">Category: {product.category}</p>
//             <p className="text-sm text-gray-600">Price: Rs.{product.price}</p>
//             <p className="text-sm text-gray-600">Stock: {product.stock}</p>
//             <p className="text-sm text-gray-600">Expiry: {product.expiry_date}</p>
//             <p className="text-sm text-gray-600">Manufactured: {product.manufactured_date}</p>
//           </div>

//           <div className="flex justify-between pt-4">
//             <button
//               className="w-1/3 bg-red-500 text-white p-2 rounded hover:bg-red-600"
//               onClick={() => handleDelete(product.id)}
//             >
//               Delete
//             </button>

//             <button
//               className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//               onClick={() => setShowUpdateForm(!showUpdateForm)}
//             >
//               {showUpdateForm ? "Cancel" : "Update"}
//             </button>
//           </div>

//           {/* Update Form */}
//           {showUpdateForm && (
//             <form onSubmit={handleUpdateSubmit} className="pt-4 space-y-3">
//               <div>
//                 <label className="block text-gray-600 text-sm mb-1">Name</label>
//                 <input
//                   type="text"
//                   value={updatedName}
//                   onChange={(e) => setUpdatedName(e.target.value)}
//                   className="w-full border border-gray-300 p-2 rounded"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600 text-sm mb-1">Price (Rs.)</label>
//                 <input
//                   type="number"
//                   value={updatedPrice}
//                   onChange={(e) => setUpdatedPrice(e.target.value)}
//                   className="w-full border border-gray-300 p-2 rounded"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600 text-sm mb-1">New Image (optional)</label>
//                 <input
//                   type="file"
//                   onChange={(e) => setSelectedFile(e.target.files[0])}
//                   className="w-full border border-gray-300 p-2 rounded"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
//               >
//                 Save Changes
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;
import React, { useState } from "react";
import { deleteProduct, updateProduct } from "../api";

function ProductDetail({ product, onBack, fetchProducts }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedName, setUpdatedName] = useState(product.name);
  const [updatedPrice, setUpdatedPrice] = useState(product.price);
  const [updatedDescription, setUpdatedDescription] = useState(product.description);
  const [selectedFile, setSelectedFile] = useState(null);

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
      formData.append("description", updatedDescription);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      await updateProduct(product.id, formData);
      alert("Product updated!");
      await fetchProducts();
      setShowUpdateForm(false);
    } catch (err) {
      console.error("Failed to update product", err);
    }
  };

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
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">New Image (optional)</label>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

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
