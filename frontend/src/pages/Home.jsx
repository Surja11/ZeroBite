import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import MiddleComponent from '../components/MiddleComponent'
function Home() {
    
  return (
        <>
        <Navbar/>
        <Hero/>
    <Link to="/">
<MiddleComponent/>
    <Footer/>
    </Link>
        </>
  )
}

export default Home