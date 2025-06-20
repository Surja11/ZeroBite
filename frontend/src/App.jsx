import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Header from "./components/Header"
import Register from './pages/Register'


function App() {
  return (
    <>
    <BrowserRouter>
    {/* <Navbar/> */}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/header' element={<Header/>}/>
    </Routes>
    
    </BrowserRouter>
    </>
  )
}
export default App
