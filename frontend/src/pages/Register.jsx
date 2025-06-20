import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api";
function Register() {
	const [first_name, setFirst] = useState("");
	const [last_name, setLast] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [password2, setConPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const HandleSubmit = async (e) => {
		e.preventDefault();
		const PostData = {
			first_name,
			last_name,
			email,
			phone,
			address,
			password,
			password2,
		};
		try {
			await register(PostData);
			alert("created");
			setFirst("");
			setLast("");
			setEmail("");
			setPassword("");
			setPhone("");
			setConPassword("");
			navigate("/");
		} catch (error) {
  console.error("Failed to register", error);

  if (error.response?.data) {
    const errorData = error.response.data;

    // Handle a single message field (like: { message: "..." })
    if (errorData.message) {
      setError(errorData.message);
    } 
    // Handle field errors (like: { email: ["..."], password2: ["..."] })
    else {
      const errorMessages = Object.values(errorData).flat().join(". ");
      setError(errorMessages);
    }
  } else {
    setError("Network error or server not reachable.");
  }
}


	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
			<div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-[600px]">
				<h2 className="text-3xl font-semi-bold mb-6 text-center text-[#287588]">
					Create Account
				</h2>{error && (
  <div className="bg-red-100 text-red-700 text-sm font-medium px-4 py-2 rounded mb-4 text-center">
    {error}
  </div>
)}

				<div className="">
					<form
						action="/register"
						method="POST"
						onSubmit={HandleSubmit}
						className=" px-4 py-3 rounded mb-4 flex flex-col space-y-6"
					>
						<div>
							<input
								type="text"
								value={first_name}
								onChange={(e) => setFirst(e.target.value)}
								placeholder="First name"
								className={`required shadow appearance-none border bg-gray-50 italic border-gray-400  rounded-2xl w-full py-2 placeholder:text-[13px]  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
							/>
						</div>
						<div>
							<input
								type="text"
								value={last_name}
								onChange={(e) => setLast(e.target.value)}
								placeholder="Last name"
								className={`required shadow appearance-none border bg-gray-50 italic border-gray-400  rounded-2xl w-full py-2 placeholder:text-[13px]  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
							/>
						</div>
						<div>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="email"
								placeholder="Email"
								className={`required shadow appearance-none border bg-gray-50 italic border-gray-400  rounded-2xl w-full py-2 placeholder:text-[13px]  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
							/>
						</div>
						<div>
							<input
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								type="tel"
								placeholder="Phone number"
								className={`required shadow appearance-none border bg-gray-50 italic border-gray-400  rounded-2xl w-full py-2 placeholder:text-[13px]  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
							/>
						</div>
						<div>
							<textarea
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								name="address"
								type="text"
								placeholder="Address"
								className={`required shadow appearance-none border bg-gray-50 italic border-gray-400  rounded-2xl w-full py-2 placeholder:text-[13px]  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
							/>
						</div>
						<div>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								placeholder="Password"
								className={`required shadow appearance-none border bg-gray-50  italic border-gray-400  rounded-2xl w-full py-2 placeholder:text-[13px]  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
							/>
						</div>
						<div>
							<input
								value={password2}
								onChange={(e) => setConPassword(e.target.value)}
								type="password"
								placeholder="Confirm Password"
								className={`required shadow appearance-none border bg-gray-50 italic border-gray-400  rounded-2xl w-full py-2 placeholder:text-[13px]  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
							/>
						</div>
						<div>
							<button
								type="submit"
								className="bg-[#1b5968] hover:bg-[#4b5f64] text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
							>
								Sign Up
							</button>
						</div>
						<div className="text-center mt-4">
							<p className="text-gray-500 text-sm">
								Already have an account?{" "}
								<Link
									to="/login"
									className="text-[#12a0c4] hover:text-blue-700"
								>
									Login
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Register;
