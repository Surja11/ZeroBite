import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ closeSidebar }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 py-12 w-72">
      <button 
        onClick={closeSidebar}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      <div className="w-full px-4">
	  <Link to="/login">
        <button className="bg-[#1b5968] hover:bg-[#4b5f64] text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full disabled:opacity-50">
          Login
        </button>
	  </Link>
      </div>

      <div className="w-full px-4 mt-4">
	  <Link to="/register">
        <button className="bg-[#1b5968] hover:bg-[#4b5f64] text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full disabled:opacity-50">
          Sign Up
        </button>
	  </Link>
      </div>

      <div className="text-center mt-4 px-4">
        <p className="text-gray-500 text-sm">
          Or{" "}
          <Link
            to="/businessacc"
            className="text-[#12a0c4] hover:text-blue-700"
            onClick={closeSidebar}
          >
            Create a Business Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;