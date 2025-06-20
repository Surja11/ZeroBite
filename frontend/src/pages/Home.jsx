import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
function Home() {
    
  return (
        <>
        <Navbar/>
        <Hero/>
    <Link to="/">
    <div>Home</div>
    </Link>
        </>
  )
}

export default Home