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

const GetAllTasks = createAsyncThunk('tasks/getAllTasks', async()=>{

  try{
    const tasks = await axios.get(`${API_URL}/task/`, sendAuth())
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

const GetOneTask = createAsyncThunk('tasks/getOneTask', async(data)=>{
  console.log(data)
  try{
    const tasks = await axios.get(
      `${API_URL}/task/get_task/${data.taskId}`,
      sendAuth()
    )
    console.log(tasks)
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

const CreateTask = createAsyncThunk('tasks/createTask', async(data)=>{

  try{
    const task = await axios.post(
      `${API_URL}/task/`, 
      data,
      sendAuth()
    )
    return {
      response: task.data.response,
      message: task.data.message,
      success: task.data.success
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

const UpdateTask = createAsyncThunk('tasks/updateTask', async({data, taskId})=>{

  try{
    const task = await axios.put(`${API_URL}/task/`,
      {data: data, taskId: taskId},
      sendAuth()
    )
    return {
      response: task.data.response,
      message: task.data.message,
      success: task.data.success
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

const SetDone = createAsyncThunk('tasks/setDoneTask', async(data)=>{

  try{
    const task = await axios.put(`${API_URL}/task/setDone/`, 
      {data: data},
      sendAuth()
    )
    return {
      response: task.data.tasks,
      message: task.data.message,
      success: task.data.success
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

const DeleteOne = createAsyncThunk('tasks/deleteOne', async(data)=>{
  console.log(data)
  try{
    const task = await axios.delete(`${API_URL}/task/${data}`, 
      sendAuth()
    )
    return {
      response: task.data.tasks,
      message: task.data.message,
      success: task.data.success
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
  GetAllTasks,
  CreateTask,
  UpdateTask,
  SetDone,
  GetOneTask,
  DeleteOne
}

export default tasksActions