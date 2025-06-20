import React from "react";
import zero from "/images/zero.png";
import navbar from "/images/navbar.png";
import { Link } from "react-router-dom";
function Navbar() {
	return (
		<div>
			<div className="flex justify-between bg-gray-200 px-4 py-3">
				<div className="flex items-center space-x-4">
					<img src={navbar} alt="navbar" className="w-4 cursor-pointer" />
                    <Link to="/">
					<img src={zero} alt="logo" className="w-15 m-0 p-0 cursor-pointer" />
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
			</div>
		</div>
	);
}

export default Navbar;
