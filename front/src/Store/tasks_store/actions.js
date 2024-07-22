import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

const API_URL = import.meta.env.VITE_APP_API_URL


const GetAllTasks = createAsyncThunk('tasks/getAllTasks', async()=>{

  try{
    const tasks = await axios.get(`${API_URL}/task/`)
    console.log(tasks);
    return {
      response: tasks.data.response,
      message: tasks.data.message,
      success: tasks.data.success
    }
  }catch(ex){
    console.log(ex)
    return{
      response: null,
      message: ex.response.data.response,
      success: ex.response.data.success
    }
  }

})

const tasksActions = {
  GetAllTasks
}

export default tasksActions