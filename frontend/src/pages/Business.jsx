// import React, { useEffect } from "react";
// import Vector from "/images/Vector.png";
// import down from "/images/down.png";
// import zero from "/images/zero.png";
// import dropup from "/images/dropup.png";
// import order from "/images/order.png";
// import product from "/images/product.png";
// import ProductList from "../components/ProductList";
// import AddProduct from "../components/AddProduct";
// import { useState } from "react";
// import ProductDetail from "../components/ProductDetail";
// import { specificProduct } from "../api";
// import { getProduct } from "../api";
// import { Link,Outlet} from "react-router-dom";


// function Business() {
//   const [dropmen, setIsDrop] = useState(false);
//   const [isActiveComponent,setIsActiveComponent]= useState(null)
// const [selectedProduct, setSelectedProduct] = useState(null)
// const [products, setProducts] = useState([]);

// useEffect(() => {
//   fetchProducts();
// }, []);

// const fetchProducts = async () => {
//   try {
//     const data = await getProduct();
//     setProducts(data);
//   } catch (err) {
//     console.error("Failed to fetch products", err);
//   }
// };
//   useEffect(()=>{
// setIsActiveComponent("productList")
//   },[])
//   const HandleDrop = () => {
//     setIsDrop((prev) => !prev);
//   };
//   const handleProductClick = () => {
//   setSelectedProduct(null);
//   setIsActiveComponent("productList");
// };


//     const HandleAddProducts=()=>{
//       setIsActiveComponent("addProduct")
//     }
// //     const handleSpecific = async (id)=>{
// // try{
// //   const data = await specificProduct(id)
// //   alert("specific data fetched")
// // console.log(data)
// // setSelectedProduct(data)
// // }catch(err){
// //   console.log(err)
// // }
// //     }

//   return (
// <>
// 	<div className="flex justify-between bg-gray-200 px-4 py-3">
// 				<div className="flex items-center space-x-4">

// 					<Link to="/">
// 						<img
// 							src={zero}
// 							alt="logo"
// 							className="w-15 m-0 p-0 cursor-pointer"
// 						/>
// 					</Link>
				
// 				</div>
// </div>
//     <div className="flex min-h-screen">

//     <div className="flex flex-col min-h-screen bg-gray-100 w-65  text-gray-600">
     
//       <div className="bg-[#f8f8fa] py-1 flex flex-col items-start   space-y-3">
//         {/* <div className="flex items-center space-x-3 w-full px-5 py-2 hover:bg-gray-300 cursor-pointer">
         
//           <div>Business name</div>
//         </div> */}
     

//         <div className="flex items-center justify-between w-full px-5 py-1 hover:bg-gray-300 cursor-pointer">
//           <div className="flex items-center space-x-3">
//             <img src={product} alt="pro" className="w-5 " />
//             <span>products</span>
//           </div>
//           <div className="">
//             {dropmen ? (
//               <img src={dropup} alt="" className="w-4" onClick={HandleDrop} />
//             ) : (
//               <img src={down} alt="" className="w-8" onClick={HandleDrop} />
//             )}
//           </div>
//         </div>
//         {dropmen && (
//           <div className="flex flex-col items-center space-y-2 border-t-1 border-b-1 border-gray-200  w-full  bg-gray-100">
            
//             <Link to="productlist">
//             <div className="text-m hover:bg-gray-200  p-2" onClick={handleProductClick} >
//               product list
//             </div>
//             </Link>
//             <Link to="add">
//             <div className="text-m hover:bg-gray-200 w-full p-2" onClick={HandleAddProducts}>
//               add product
//             </div>
//             </Link>
//           </div>
//         )}

//         <div className="flex items-center space-x-3 w-full px-5 py-2 hover:bg-gray-300 cursor-pointer">
//           <div>
//             <img src={order} alt="pro" className="w-5" />
//           </div>
//           <span>Order</span>
//         </div>

//         <div className="flex items-center space-x-3 w-full px-5 py-2 hover:bg-gray-300 cursor-pointer ">
//           {/* <span className="px-5">Settings</span> */}
//         </div>
//       </div>
    
//     </div>
//       <div className="flex-1 p-6 bg-white">
// {/* {selectedProduct ? (
//   <ProductDetail product={selectedProduct} fetchProducts={fetchProducts} onBack={() => setSelectedProduct(null)} />
// ) : isActiveComponent === "productList" ? (
//   <ProductList onProductClick={handleSpecific} products={products}/>
// ) : (
//   <AddProduct />
// )} */}
// <Outlet/>
//     </div>
     
//     </div>
// </>
//   );
// }

// export default Business;

import React, { useState, useEffect } from "react";
import { getProduct, specificProduct } from "../api";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import zero from "/images/zero.png";
import product from "/images/product.png";
import down from "/images/down.png";
import dropup from "/images/dropup.png";
import order from "/images/order.png";
import { useNavigate } from "react-router-dom";

function Business() {
  const [dropmen, setIsDrop] = useState(false);
  const [products, setProducts] = useState([]);
const navigate =useNavigate()


const handleLogout =()=>{

  // localStorage.removeItem("access_token")
  // localStorage.removeItem("refresh_token");
  // localStorage.removeItem("products")
  // localStorage.removeItem("user")
  // sessionStorage.clear();
  localStorage.clear()
  navigate("/");
  console.log("logut sucessful")

}

  const fetchProducts = async () => {
    const cachedProducts = localStorage.getItem("products")
    if(cachedProducts){
      setProducts(JSON.parse(cachedProducts))
          // console.log("Loaded products from cache");

    }else{

      try {
        const data = await getProduct();
        setProducts(data);
              localStorage.setItem("products", JSON.stringify(data));
// console.log("cached set")
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    }
  };

  const handleSpecific = async (id) => {
    try {
      const data = await specificProduct(id);
      alert("specific data fetched");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    navigate("/business/productlist")
  }, []);

  const HandleDrop = () => {
    setIsDrop((prev) => !prev);
  };

  return (
    <ProductsContext.Provider value={{ products, fetchProducts, handleSpecific }}>
      <div className="flex justify-between bg-gray-200 px-4 py-3">
        <Link to="/">
          <img src={zero} alt="logo" className="w-15 m-0 p-0 cursor-pointer" />
        </Link>
      </div>

      <div className="flex min-h-screen">
        <div className="flex flex-col min-h-screen bg-gray-100 w-65 text-gray-600">
          <div className="bg-[#f8f8fa] py-1 flex flex-col items-start space-y-3">
            <div className="flex items-center justify-between w-full px-5 py-1 hover:bg-gray-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <img src={product} alt="pro" className="w-5  " />
                <span>Products</span>
              </div>
              <div>
                {dropmen ? (
                  <img src={dropup} alt="" className="w-4" onClick={HandleDrop} />
                ) : (
                  <img src={down} alt="" className="w-8" onClick={HandleDrop} />
                )}
              </div>
            </div>
            {dropmen && (
              <div className="flex flex-col items-center space-y-2 border-t border-b border-gray-200 w-full bg-gray-100">
                <NavLink to="productlist">
                  <div className="text-md p-2 hover:text-[#7bb400] hover:font-semibold hover:bg-gray-200  ">Product List</div>
                </NavLink>
               
                <NavLink to="add">
                  <div className="text-md w-full hover:text-[#7bb400] hover:font-semibold hover:bg-gray-200  p-2">Add Product</div>
                </NavLink>
              </div>
            )}
            <div className="flex items-center space-x-3 w-full px-5 py-2 hover:bg-gray-300 cursor-pointer">
              <img src={order} alt="pro" className="w-5" />
              <span>Order</span>
            </div>
            <div className="flex items-center justify-center space-x-3 w-full px-5 py-2  cursor-pointer">

              <button className="w-full bg-[#00a63e] text-white border-0 hover:bg-[#7aa500]" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 bg-white">
          <Outlet />
        </div>
      </div>
    </ProductsContext.Provider>
  );
}

export default Business;
