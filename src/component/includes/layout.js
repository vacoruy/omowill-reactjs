import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'

import { useLocation } from 'react-router-dom'

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Outlet />
      {
        location.pathname !== '/register' && location.pathname !== '/login' ? (<Footer />) : null
      }
    </>
  )
}
