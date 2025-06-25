import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
function Login() {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError]= useState(null)
      const [isLoading, setIsLoading] = useState(false);

    const naviagte = useNavigate()
    const HandleSubmit=async (e)=>{
      	e.preventDefault();
            setIsLoading(true);
        setError(null)
        
      const postData ={
        email, 
        password,
      }
      try{
       const user = await login(postData);
       
       alert("login sucress")
       console.log('LOGIN SUCESS')

       if(user.user_type === "business"){

         naviagte('/business')
        }else if(user.user_type==="customer"){
         naviagte('/products')

       }
            }catch(error){
console.error('Login failed:', error);
      setError(
        error.response?.data?.detail || 
        error.response?.data?.message || 
        'Login failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }    
    }



    
  return (
<>
<Navbar/>
<div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 pr-0">


      <div className="bg-gray-100 p- rounded-lg shadow-md w-full max-w-[600px]">
        <h2 className="text-3xl font-semi-bold mb-6 text-center text-[#287588]">
         Login
        </h2>{error && (
          <div className="bg-red-100 text-red-700 text-sm font-medium px-4 py-2 rounded mb-4 text-center">
    {error}
  </div>
)}

        <div className="">
          <form
            method="POST"
            onSubmit={HandleSubmit}
            className=" px-4 py-3 rounded mb-4 flex flex-col space-y-6"
          >
             
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" required
                placeholder="Email"
                className={`required shadow appearance-none border bg-gray-50 italic border-gray-400  rounded-2xl w-full py-2 placeholder:text-[13px]  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
            </div>
            
           
            <div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)} required
                type="password"
                placeholder="Password"
                className={`required shadow appearance-none border bg-gray-50  italic border-gray-400  rounded-2xl w-full py-2 placeholder:text-[13px]  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                />
            </div>
           
            <div>
              <button
                type="submit"
                className="bg-[#1b5968] hover:bg-[#4b5f64] text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
              >
                Login
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-500 text-sm">
               Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#12a0c4] hover:text-blue-700"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>


    </div>
                  </>
  )
}

export default Login