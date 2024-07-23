import { createReducer } from "@reduxjs/toolkit"
import tasksActions from './actions.js'
import { useSelector } from "react-redux"

const {
  GetAllTasks,
  CreateTask,
  UpdateTask,
  SetDone,
  GetOneTask,
  DeleteOne
} = tasksActions

const initialState = {
  task: [],
  tasks: [],
  message: []
}

const tasksReducers = createReducer(initialState, (builder) => {

  builder
    .addCase(GetAllTasks.fulfilled, (state, action) => {
      let newState = {

        tasks: action.payload.response,
        message: action.payload.message,
        success: action.payload.success
      }
      return newState
    })
    .addCase(GetAllTasks.rejected, (state, action)=>{
      let newState = {
        tasks: null,
        message: action.payload.message
      }
      return newState
    })
    .addCase(CreateTask.fulfilled, (state, action) => {
      let newState = {

        task: action.payload.response,
        message: action.payload.message,
        success: action.payload.success
      }
      return newState
    })
    .addCase(CreateTask.rejected, (state, action)=>{
      let newState = {
        task: null,
        message: action.payload.message
      }
      return newState
    })
    .addCase(UpdateTask.fulfilled, (state, action) => {
      let newState = {

        task: action.payload.response,
        message: action.payload.message,
        success: action.payload.success
      }
      return newState
    })
    .addCase(UpdateTask.rejected, (state, action)=>{
      let newState = {
        task: null,
        message: action.payload.message
      }
      return newState
    })
    .addCase(SetDone.fulfilled, (state, action) => {
      let newState = {

        task: action.payload.response,
        message: action.payload.message,
        success: action.payload.success
      }
      return newState
    })
    .addCase(SetDone.rejected, (state, action)=>{
      let newState = {
        task: null,
        message: action.payload.message
      }
      return newState
    })
    .addCase(GetOneTask.fulfilled, (state, action) => {

      let newState = {
        tasks: state.tasks,
        task: action.payload.response,
        message: action.payload.message,
        success: action.payload.success
      }
      return newState
    })
    .addCase(GetOneTask.rejected, (state, action)=>{
      let newState = {
        task: null,
        message: action.payload.message
      }
      return newState
    })
    .addCase(DeleteOne.fulfilled, (state, action) => {
      let newState = {

        task: action.payload.response,
        message: action.payload.message,
        success: action.payload.success
      }
      return newState
    })
    .addCase(DeleteOne.rejected, (state, action)=>{
      let newState = {
        task: null,
        message: action.payload.message
      }
      return newState
    })
})

export default tasksReducers