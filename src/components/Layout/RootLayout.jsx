import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { FirebaseAuthProvider } from '../../FirebaseAuthContext'
import Footer from '../Footer'
import Navbar from '../Navbar'

const RootLayout = () => {
  const { pathname } = useLocation();

	useEffect(()=>{
		window.scrollTo(0,0)
	},[pathname])
  return (
    <>
    <FirebaseAuthProvider>
    <header>
      <Navbar />
    </header>
    <main>
      <Outlet/>
    </main>
    <Footer />				
    </FirebaseAuthProvider>
    <ToastContainer />
  </>
  )
}

export default RootLayout
