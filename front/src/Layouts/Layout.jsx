import React, { Children, useEffect, useState } from 'react'
import Nav from './Nav'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import NavLogOut from './NavLogOut'
import { useDispatch, useSelector } from 'react-redux'
import userActions from '../Store/users_store/actions'

const {signInToken} = userActions

const Layout = () => {
  
  const authStore = useSelector(store=>store.auth)
  const [isLogged, setIsLogged] = useState(false)
  const [tokenLogin, setTokenLogin] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const path = useLocation()

  useEffect(() => {
    let token = localStorage?.getItem('userToken')
    if (authStore?.success) {
      setTokenLogin(token)
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
    if (token && (token !== tokenLogin)) {
      dispatch(signInToken({ token: token }))
    } else if (!token) {
      setIsLogged(false)
      navigate('/')
    }
  }, [authStore?.auth, isLogged,path.pathname])

  useEffect(()=>{
    let url = path.pathname
    if(url === '/addUser' || url === '/adminUser'){
      if(authStore?.auth?.role !== 'ADMIN_ROLE'){
        navigate("/home")
      }
    }

    
  },[path.pathname])


  return (
    <>
      {
        path.pathname == '/' || 
        path.pathname == '/signup' ||
        !isLogged
        ?<NavLogOut />
        :<Nav user={authStore}/>
      }
      <Outlet />
    </>
  )
}

export default Layout