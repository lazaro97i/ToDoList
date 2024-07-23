import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

const API_URL = import.meta.env.VITE_APP_API_URL

const sendAuth = () => {

  const BEARER_TOKEN = localStorage.getItem("userToken")

  const config = {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    }
  }

  return config
}

const signIn = createAsyncThunk('user/signIn', async(data)=>{

  try{
    const user = await axios.post(
      `${API_URL}/user/signin`,
      data
    )
    return{
      response: user.data.response,
      message: user.data.message,
      success: user.data.success,
      status: user.status
    }
  }catch(ex){
    console.log(ex)
    return{
      response: ex.response.data.response,
      message: ex.response.data.message,
      success: ex.response.data.success
    }
  }

})

const signInToken = createAsyncThunk('user/signInToken', async(data)=>{

  try{
    const user = await axios.post(
      `${API_URL}/user/signinToken`,
      data,
      sendAuth()
    )
    console.log(user.success)
    return{
      response: user.data.response,
      message: user.data.message,
      success: user.data.success,
      status: user.status
    }
  }catch(ex){
    console.log(ex)
    localStorage.removeItem('userToken')
    return{
      response: ex.response.data.response,
      message: ex.response.data.message,
      success: ex.response.data.success
    }
  }

})

const signOut = createAsyncThunk('user/signOut', async()=>{

  try{
    const user = await axios.post(
      `${API_URL}/user/signout`,
      {},
      sendAuth()
    )
    return{
      response: user.data.response,
      message: user.data.message,
      success: user.data.success,
      status: user.status
    }
  }catch(ex){
    console.log(ex)
    return{
      response: ex.response.data.response,
      message: ex.response.data.message,
      success: ex.response.data.success
    }
  }

})

const signUp = createAsyncThunk('user/signUp', async(data)=>{

  try{
    const user = await axios.post(
      `${API_URL}/user/signup`,
      {data: data}
    )
    return{
      response: user.data.response,
      message: user.data.message,
      success: user.data.success,
      status: user.status
    }
  }catch(ex){
    console.log(ex)
    return{
      response: ex.response.data.response,
      message: ex.response.data.message,
      success: ex.response.data.success
    }
  }

})



const userActions = {
  signIn,
  signInToken,
  signOut,
  signUp
}

export default userActions