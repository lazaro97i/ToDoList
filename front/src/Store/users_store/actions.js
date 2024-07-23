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

  console.log(data);
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

const getAllUsers = createAsyncThunk('user/getAll', async()=>{

  try{
    const user = await axios.get(
      `${API_URL}/user/`,
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
    return {
      response: ex.response.data.response,
      message: ex.response.data.message,
      success: ex.response.data.success
    }
  }

})

const getOne = createAsyncThunk('user/getOne', async(id)=>{

  try{
    const user = await axios.get(
      `${API_URL}/user/get_user/${id.id}`,
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
    return {
      response: ex.response.data.response,
      message: ex.response.data.message,
      success: ex.response.data.success
    }
  }

})

const deleteOne = createAsyncThunk('user/deleteOne', async(id)=>{

  try{  
    const user = await axios.delete(
      `${API_URL}/user/${id}`,
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
const updateOne = createAsyncThunk('user/updateOne', async(data, id)=>{
  console.log(data)
  console.log(id)
  try{  
    const user = await axios.put(
      `${API_URL}/user/`,
      {data: data, userId: id},
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




const userActions = {
  signIn,
  signInToken,
  signOut,
  signUp,
  getAllUsers,
  getOne,
  updateOne,
  deleteOne
}

export default userActions