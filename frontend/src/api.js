import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

export const register = async (postData) => {
	try {
		const response = await axios.post(`${API_URL}customerregister/`, postData);
		return response.data;
	} catch (error) {
		console.log("failed to sign in :", error);
		throw error;
	}
};
