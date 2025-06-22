import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

export const register = async (postData) => {
	try {
		const response = await axios.post(
			`${API_URL}customer/customerregister/`,
			postData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log("Failed to login:", error.response?.data || error.message);

		throw error;
	}
};

export const login = async (postData) => {
	try {
		const response = await axios.post(`${API_URL}login/`, postData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
		localStorage.setItem("token",resp)
	} catch (error) {
		console.log("Failed to login:", error.response?.data || error.message);
		throw error;
	}
};

export const BusinessReg = async (postData) => {
	try {
		const response = await axios.post(
			`${API_URL}business/register/`,
			postData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log("Failed to login:", error.response?.data || error.message);

		throw error;
	}
};


// Get address from coordinates
export const fetchAddressFromLatLng = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data.display_name || "Address not found";
  } catch (err) {
    console.error("Failed to fetch address", err);
    return "Could not fetch address";
  }
};

// http://127.0.0.1:8000/customer/customerregister/
