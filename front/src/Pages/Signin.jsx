import React, { useEffect, useState } from 'react'
import LoginForm from '../Components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userActions from '../Store/users_store/actions'

const {signInToken} = userActions

const Signin = () => {
  
  const authStore = useSelector(store=>store.auth)
  const navigate = useNavigate()
  const [tokenLogin, setTokenLogin] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    let token = localStorage.getItem('userToken')
    if (authStore?.success) {
      setTokenLogin(token)
      if (localStorage.getItem('userToken')) {
        navigate('/home')
      }
    }
    if (token && token !== tokenLogin) {
      dispatch(signInToken({ token: token }))
    }
  }, [authStore?.auth])
  return (
    <LoginForm />
  )
}

export default Signin