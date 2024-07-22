import React, { Children } from 'react'
import Nav from './Nav'
import { Outlet, useLocation } from 'react-router-dom'
import NavLogOut from './NavLogOut'

const Layout = () => {

  const path = useLocation()

  return (
    <>
      {
        path.pathname == '/' || path.pathname == '/signup'
        ?<NavLogOut />
        :<Nav />
      }
      <Outlet />
    </>
  )
}

export default Layout