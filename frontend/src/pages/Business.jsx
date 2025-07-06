import React, { useEffect } from "react";
import Vector from "/images/Vector.png";
import down from "/images/down.png";
import dropup from "/images/dropup.png";
import order from "/images/order.png";
import product from "/images/product.png";
import ProductList from "../components/ProductList";
import AddProduct from "../components/AddProduct";
import { useState } from "react";
import ProductDetail from "../components/ProductDetail";
import { specificProduct } from "../api";
import { getProduct } from "../api";

function Business() {
  const [dropmen, setIsDrop] = useState(false);
  const [isActiveComponent,setIsActiveComponent]= useState(null)
const [selectedProduct, setSelectedProduct] = useState(null)
const [products, setProducts] = useState([]);

useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  try {
    const data = await getProduct();
    setProducts(data);
  } catch (err) {
    console.error("Failed to fetch products", err);
  }
};
  useEffect(()=>{
setIsActiveComponent("productList")
  },[])
  const HandleDrop = () => {
    setIsDrop((prev) => !prev);
  };
  const handleProductClick = () => {
  setSelectedProduct(null);
  setIsActiveComponent("productList");
};


    const HandleAddProducts=()=>{
      setIsActiveComponent("addProduct")
    }
    const handleSpecific = async (id)=>{
try{
  const data = await specificProduct(id)
console.log(data)
setSelectedProduct(data)
}catch(err){
  console.log(err)
}
    }

  return (
    <div className="flex min-h-screen">

    <div className="flex flex-col min-h-screen bg-gray-100 w-65  text-gray-600">
      <hr className="text-gray-300" />
      <div className="bg-[#f8f8fa] py-1 flex flex-col items-start   space-y-3">
        <div className="flex items-center space-x-3 w-full px-5 py-2 hover:bg-gray-300 cursor-pointer">
          <div>
            <img src={Vector} alt="profile" className="w-4" />
          </div>
          <div>Business name</div>
        </div>
        <hr className="text-gray-300 w-full" />

        <div className="flex items-center justify-between w-full px-5 py-1 hover:bg-gray-300 cursor-pointer">
          <div className="flex items-center space-x-3">
            <img src={product} alt="pro" className="w-5 " />
            <span>products</span>
          </div>
          <div className="">
            {dropmen ? (
              <img src={dropup} alt="" className="w-4" onClick={HandleDrop} />
            ) : (
              <img src={down} alt="" className="w-8" onClick={HandleDrop} />
            )}
          </div>
        </div>
        {dropmen && (
          <div className="flex flex-col items-center space-y-2 border-t-1 border-b-1 border-gray-200  w-full  bg-gray-100">
            
            <div className="text-m hover:bg-gray-200 w-full p-2" onClick={handleProductClick} >
              product list
            </div>
            <div className="text-m hover:bg-gray-200 w-full p-2" onClick={HandleAddProducts}>
              add product
            </div>
          </div>
        )}

        <div className="flex items-center space-x-3 w-full px-5 py-2 hover:bg-gray-300 cursor-pointer">
          <div>
            <img src={order} alt="pro" className="w-5" />
          </div>
          <span>Order</span>
        </div>

        <div className="flex items-center space-x-3 w-full px-5 py-2 hover:bg-gray-300 cursor-pointer ">
          <span className="px-5">Settings</span>
        </div>
      </div>
    
    </div>
      <div className="flex-1 p-6 bg-white">
{selectedProduct ? (
  <ProductDetail product={selectedProduct} fetchProducts={fetchProducts} onBack={() => setSelectedProduct(null)} />
) : isActiveComponent === "productList" ? (
  <ProductList onProductClick={handleSpecific} products={products}/>
) : (
  <AddProduct />
)}
    </div>
     
    </div>
  );
}

export default Business;
