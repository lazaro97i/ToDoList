import React from 'react'
import LoginForm from '../Components/LoginForm'
import { useSelector } from 'react-redux'

const Signin = () => {

  const userStore = useSelector(store=> store.user)
  console.log(userStore);
  return (
    <LoginForm />
  )
}

export default Signin