import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import NavAdmin from './NavAdmin'
import ErrorPage from '../Pages/ErrorPage/ErrorPage'

const LayoutAdmin = () => {
  // Əgər istifadəçi birbaşa admin linkinə girməyə çalışarsa user null ola bilər
  const user = JSON.parse(sessionStorage.getItem('user')) || null;

  if (user && user.isAdmin === true) {
    return (
      <>
        <NavAdmin />
        <Outlet />
        <Toaster />
      </>
    )
  } else {
    return (
      <ErrorPage />
    )
  }
}

export default LayoutAdmin