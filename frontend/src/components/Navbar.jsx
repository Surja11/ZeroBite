import React, { useState } from "react";
import zero from "/images/zero.png";
import navbar from "/images/navbar.png";
import { Link, useNavigate } from "react-router-dom";
import Business from "./Sidebar";
function Navbar() {
	const [sidebar, setSidebar]= useState(false)
	const navigate = useNavigate();

	const HandleSide =()=>{
		setSidebar(!sidebar)
	}
	return (
		<div>
			<div className="flex justify-between bg-gray-200 px-4 py-3">
				<div className="flex items-center space-x-4">
					<img src={navbar} alt="navbar" className="w-4 cursor-pointer"  onClick={HandleSide}/>

					<Link to="/">
						<img
							src={zero}
							alt="logo"
							className="w-15 m-0 p-0 cursor-pointer"
						/>
					</Link>
				</div>
				<div className="flex items-center space-x-2">
					<Link to="/login">
						<button className="bg-[#AEB18A] rounded-2xl text-sm px-3 py-1 font-[roboto] font-semibold cursor-pointer">
							Login
						</button>
					</Link>
					<Link to="/register">
						<button className="bg-gray-400 rounded-2xl text-sm px-3 py-1 font-[roboto] font-semibold cursor-pointer">
							Signup
						</button>
					</Link>
				</div>

				{/* Sidebar */}
				
			{/* Sidebar Overlay */}
			
      {/* Sidebar & Overlay */}
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ${sidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        <Business closeSidebar={() => setSidebar(false)} />
      </div>
    </div>
   

			</div>
	);
}

export default Navbar;
