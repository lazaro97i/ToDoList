import { createReducer } from "@reduxjs/toolkit"
import userActions from "./actions"

const {
  signIn
} = userActions

const initialState = {
  user: [],
  users: [],
  message: [],
  success: false,
  status: 0
}

const usersReducers = createReducer(initialState, (builder) => {

  builder
    .addCase(signIn.fulfilled, (state, action) => {
      let newState = {
        user: action.payload.response,
        message: action.payload.message,
        success: action.payload.success,
        status: action.payload.status
      }
      return newState
    })
    .addCase(signIn.rejected, (state, action) => {
      console.log(action)
      let newState = {
        user: action.payload.response,
        message: action.payload.message,
        success: action.payload.success,
        status: action.payload.status
      }
      return newState
    })

})

export default usersReducers