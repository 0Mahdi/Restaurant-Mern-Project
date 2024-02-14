import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import "../App.css"
import Footer from '../components/Footer'
import { AuthContext } from '../contexts/AuthProvider'

const Main = () => {
  return (
    <div className='bg-primaryBG'>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Main