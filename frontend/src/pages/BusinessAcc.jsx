// Converted TypeScript + React to React JS

import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { BusinessReg } from "../api";
import { fetchAddressFromLatLng } from "../api";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Navbar from "../components/Navbar";

// Fix leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: markerIcon2x,
	iconUrl: markerIcon,
	shadowUrl: markerShadow,
});

function MapEventHandler({ onMapClick }) {
	const map = useMap();

	useEffect(() => {
		const handleClick = (e) => {
			onMapClick(e.latlng.lat, e.latlng.lng);
		};
		map.on("click", handleClick);
		return () => map.off("click", handleClick);
	}, [map, onMapClick]);

	return null;
}

function BusinessAcc() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [store_address, setStoreAddress] = useState("");
	const [business_name, setBusinessName] = useState("");
	const [business_type, setBusinessType] = useState("");
	const [storeLatLng, setStoreLatLng] = useState({ lat: null, lng: null });
	const [error, setError] = useState("");
	const [isMapLoading, setIsMapLoading] = useState(false);

	const handleMapClick = async (lat, lng) => {
		setStoreLatLng({ lat, lng });
		setIsMapLoading(true);
		try {
			const address = await fetchAddressFromLatLng(lat, lng);
			setStoreAddress(address);
		} catch (err) {
			console.error("Address fetch error", err);
			setStoreAddress("Could not fetch address");
		} finally {
			setIsMapLoading(false);
		}
	};

	const HandleSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) return setError("Passwords do not match");
		if (!storeLatLng.lat || !storeLatLng.lng)
			return setError("Please select a location on the map");

		const postData = {
			email,
			password,
			password2,
			name,
			phone,
			store_address,
			business_name,
			business_type,
			latitude: storeLatLng.lat,
			longitude: storeLatLng.lng,
		};

		try {
			await BusinessReg(postData);
			alert("Account created successfully!");
			setEmail("");
			setPassword("");
			setPassword2("");
			setName("");
			setPhone("");
			setStoreAddress("");
			setBusinessName("");
			setBusinessType("");
			setStoreLatLng({ lat: null, lng: null });
			setError("");
		} catch (error) {
			if (error.response?.data) {
				const errorData = error.response.data;
				setError(
					errorData.message || Object.values(errorData).flat().join(". ")
				);
			} else {
				setError("Network error or server not reachable.");
			}
		}
	};

	return (
<>
<Navbar/>

		<div className="min-h-screen bg-gray-100 py-8 px-4">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-center text-[#287588] mb-8">
					Business Registration
				</h1>

				<div className="flex flex-col lg:flex-row gap-8">
					{/* Form Section */}
					<div className="bg-white p-6 rounded-lg shadow-md flex-1">
						<form onSubmit={HandleSubmit} className="space-y-4">
							{/* Email, Name, Phone, etc. */}
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email"
								required
className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#287588]"							/>
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Full Name"
								required
className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#287588]"							
/>
							<input
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								placeholder="Phone"
								required
className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#287588]"							
							/>
							<input
								value={business_name}
								onChange={(e) => setBusinessName(e.target.value)}
								placeholder="Business Name"
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 runde focus:ring-[#287588]"
							/>
							<select
								value={business_type}
								onChange={(e) => setBusinessType(e.target.value)}
								required
 className="w-full px-3 py-2 text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#287588]"				>
								<option value="" className="">Select Business Type</option>
								<option value="restaurant">Restaurant</option>
								<option value="grocery">Grocery</option>
								<option value="pharmacy">Pharmacy</option>
							</select>
							<textarea
								value={store_address}
								onChange={(e) => setStoreAddress(e.target.value)}
								required
								className="w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#287588]"
								placeholder="Store Address (click map)"
							></textarea>
							{storeLatLng.lat && (
								<p className="text-xs text-gray-600">
									Lat: {storeLatLng.lat.toFixed(6)}, Lng:{" "}
									{storeLatLng.lng.toFixed(6)}
								</p>
							)}
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Password"
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#287588]"
							/>
							<input
								type="password"
								value={password2}
								onChange={(e) => setPassword2(e.target.value)}
								placeholder="Confirm Password"
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#287588]"
							/>
							<button
								disabled={!storeLatLng.lat || isMapLoading}
  className="w-full bg-[#287588] hover:bg-[#1b5968] text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1b5968] disabled:opacity-50"							>
								{isMapLoading ? "Loading..." : "Register"}
							</button>
							{error && <p className="text-red-500 text-sm">{error}</p>}
							<p className="text-sm text-center">
								Already have an account?{" "}
								<Link to="/login" className="text-[#287588] hover:underline font-medium">
									Login
								</Link>
							</p>
						</form>
					</div>

					{/* Map Section */}
					<div className="bg-white p-4 rounded-lg shadow-md flex-1">
						<h2 className="text-lg font-semibold mb-4">Select Location</h2>
						<div className="h-[400px] relative">
							{isMapLoading && (
								<div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
									Loading address...
								</div>
							)}
							<MapContainer
								center={[27.7172, 85.324]}
								zoom={13}
								style={{ height: "100%", width: "100%", borderRadius: "8px" }}
							>
								<TileLayer
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									attribution="&copy; OpenStreetMap contributors"
								/>
								<MapEventHandler onMapClick={handleMapClick} />
								{storeLatLng.lat && (
									<Marker position={[storeLatLng.lat, storeLatLng.lng]}>
										<Popup>Business Location</Popup>
									</Marker>
								)}
							</MapContainer>
						</div>
					</div>
				</div>
			</div>
		</div>
								</>
	);
}

export default BusinessAcc;
