import React from 'react'
import foodie from "/images/foodie.png"
import place from "/images/place.png"
import take from "/images/take.png"

function MiddleComponent() {
  return (
    <div className='flex flex-col bg-[#f7f4f4] items-center space-y-6 justify-center h-60 px-4 shadow-md'>
      <div>
        <p className="text-xl pl-8">How to order</p>
        <p className="text-[#97A121] text-2xl font-semibold">It's as easy as this</p>
      </div>

      <div className='flex space-x-10 p-y-5'>

      <div className='flex flex-col justify-center items-center'>
        <img src={foodie} alt=""  className="w-15"/>
        <p>Find what you want</p>
      </div>


      <div className='flex flex-col justify-center items-center'>
        <img src={place} alt=""  className="w-15"/>
        <p>Tell us where you are</p>
        </div>

      <div className='flex flex-col justify-center items-center'>
        <img src={take} alt=""  className="w-15"/>
        <p>order for pickup</p>
      </div>
    </div>
      </div>
  )
}

export default MiddleComponent