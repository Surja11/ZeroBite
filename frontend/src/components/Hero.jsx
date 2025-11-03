import React, { useState, useEffect } from 'react';
import main from "/images/main.jpg";
import { Location } from '../api';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // NEW

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token); // Set true if token exists
  }, []);

  const HandleLocation = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        try {
          const products = await Location(lat, lon);
          console.log("Received products:", products);
          alert("Location data sent successfully!");
          setLocation("");
          navigate(`/products?lat=${lat}&lon=${lon}`);
        } catch (err) {
          console.error("Error fetching products:", err);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Location access denied or unavailable");
      }
    );
  };

  return (
    
    <div className="w-full flex flex-col md:flex-row items-center pt-0 gap-10">
  {/* Left content container */}
  <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between w-full">

    {/* Left Side: Text */} 
    <div className="md:w-1/2 text-center ml-8 md:text-left">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Order on <span className="text-green-600">Zero Bite</span>
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Get food, drinks, groceries, and more delivered.
      </p>

      <div className="flex items-center px-4 py-4 bg-white rounded-full w-full max-w-md mx-auto md:mx-0 shadow-lg">
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          value={location}
          className="flex-grow bg-transparent outline-none px-2 text-gray-800"
        />
        <button
          className={`px-2 rounded-2xl transition font-semibold ${
            isLoggedIn
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
          onClick={HandleLocation}
        >
          Search
        </button>
      </div>
    </div>
  </div>

  {/* Right Side: Image - edge to edge */}
  <div className="md:w-1/2 flex-1 my-2 mr-1 ">
    <img
      src={main}
      alt="Delicious food"
      className="w-full h-[470px]  object-cover rounded-md shadow-lg md:rounded-md md:shadow-none"
    />
  </div>
</div>

  );
}

export default Hero;
