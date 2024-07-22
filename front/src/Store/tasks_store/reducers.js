import { createReducer } from "@reduxjs/toolkit"
import tasksActions from './actions.js'

const {
  GetAllTasks
} = tasksActions

const initialState = {
  task: [],
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
})

export default tasksReducers