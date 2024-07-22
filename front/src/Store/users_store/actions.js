import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

const API_URL = import.meta.env.VITE_APP_API_URL

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


const userActions = {
  signIn
}

export default userActions