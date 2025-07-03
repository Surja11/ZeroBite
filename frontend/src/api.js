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
      headers: { "Content-Type": "application/json" },
      withCredentials: true // Important for CORS with credentials
    });
    
    console.log("Complete response object:", response);
    console.log("Response data structure:", {
      keys: Object.keys(response.data),
      data: response.data
    });
    
    // More flexible token extraction
    const token = response.data.access_token || response.data.access || response.data.token;
    const refresh = response.data.refresh_token || response.data.refresh;
    const user = response.data.user || {
      email: response.data.email,
      id: response.data.user_id || response.data.id
    };
    console.log("User type:", user.user_type); // e.g., "customer" or "business"
    
    if (!token) {
      throw new Error("No access token found in response");
    }
    
    localStorage.setItem("access_token", token);
    if (refresh) localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("user", JSON.stringify(user));
    
    return user;
  } catch (error) {
    console.error("Detailed login error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    throw error;
  }
};

export const BusinessReg = async (postData) => {
	try {
		const response = await axios.post(
			`${API_URL}business/register/`,postData,
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


//location search

export const Location = async (lat,lon) =>  {
try{
 const res = await axios.get(`${API_URL}products/getProducts`,{
  params : {lat, lon}
 })
     console.log('Sorted Products:', res.data);

}catch(error){
  console.error("Failed to load", error)
      console.error('Error fetching products:', error.response?.data || error.message);
    throw error;

}
}

// http://127.0.0.1:8000/customer/customerregister/
