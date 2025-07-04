import React from 'react'
import { useEffect,useState } from 'react'
import { getProduct } from '../api'
function ProductList({onProductClick}) {
  const [products,setProducts]=useState([])
 useEffect(()=>{

   const fetchProducts = async ()=>{
    try{
        const data = await getProduct();
        setProducts(data)
        console.log(data)
    }catch(err){
      console.error("Error fetching products:", err);

    }
  }
  fetchProducts()
 },[])
  
 
  return (
    <div>
<h1 className=' border-t border-x border-gray-100 text-gray-500  outline-0 p-4 text-2xl'>Products</h1>
      <div className='min-h-screen border border-gray-100 shadow-md'>
<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-5 bg-gray-100 gap-8 p-6' >
          {products.map((item, key) => (
            <div key={item.id} className=' rounded-lg bg-white rounded shadow p-4 flex flex-col items-center  cursor-pointer hover:border' onClick=
{()=>onProductClick(item)}>
              <img
                src={`http://127.0.0.1:8000${item.image}`}
                alt={item.name}
                className='h-35 w-45 object-cover rounded-md  mb-2'
              />
              <h2 className='text-lg font-semibold'>{item.name}</h2>
              {/* <p className='text-gray-600'>{item.description}</p> */}
              {/* <p className='text-gray-600'>{item.category}</p> */}
              <p className='text-sm text-[#7bb400] mb-2 '> Price:Rs.{item.price}</p>
              {/* <p className='text-sm text-gray-500 text-[12px]'>Expiry: {item.expiry_date}</p> */}
              {/* <p className='text-sm text-gray-500 text-[12px]'>Manufactured: {item.manufactured_date}</p> */}
              <p className='text-sm text-gray-500'>Stock: {item.stock}</p>
            </div>
          ))}
        </div>

       
        </div>



    </div> )}
export default ProductList