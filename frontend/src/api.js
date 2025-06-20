import axios from 'axios'


const API_URL = "http://localhost:8000/"

export const register = async(postData)=>{
     try{
        const response = await axios.post(`${API_URL}register`,postData)
        return response.data
    }catch(error){
console.log('failed to sign in :' , error)
throw error
    }
}
