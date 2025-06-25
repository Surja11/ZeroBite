import React, { useState } from 'react';
import main from "/images/main.jpg";

function Hero() {
const [location,setLocation] = useState("")


  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 pt-0 md:pt-12 gap-10">
        
        {/* Left Side: Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Order on <span className="text-green-600">Zero Bite</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Get food, drinks, groceries, and more delivered.
          </p>

          <div className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-md mx-auto md:mx-0 shadow-lg">
            <input
              type="text" onChange={HandleLocation}
              placeholder="Enter location"
              className="flex-grow bg-transparent outline-none px-2 text-gray-800"
            />
            <button className="bg-green-600 text-white px-4 py-1 rounded-full hover:bg-green-700 transition">
              Search
            </button>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="md:w-1/2">
          <img
            src={main}
            alt="Delicious food"
            className="w-full h-[450px] md:h-[450px] object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
