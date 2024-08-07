import { createReducer } from "@reduxjs/toolkit"
import userActions from "./actions"

const {
  signIn,
  signInToken,
  signOut,
  signUp,
  getAllUsers,
  getOne,
  updateOne,
  deleteOne
} = userActions

const initialState = {
  user: [],
  users: [],
  message: [],
  success: false,
  status: 0
}

const userReducer = createReducer(initialState, (builder) => {

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
    .addCase(signOut.fulfilled, (state, action) => {
      let newState = {
        user: action.payload.response,
        message: action.payload.message,
        success: action.payload.success,
        status: action.payload.status
      }
      return newState
    })
    .addCase(signUp.fulfilled, (state, action) => {
      let newState = {
        user: action.payload.response,
        message: action.payload.message,
        success: action.payload.success,
        status: action.payload.status
      }
      return newState
    })
    .addCase(signUp.rejected, (state, action) => {
      console.log(action)
      let newState = {
        user: action.payload.response,
        message: action.payload.message,
        success: action.payload.success,
        status: action.payload.status
      }
      return newState
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      let newState = {
        users: action.payload.response,
        message: action.payload.message,
        success: action.payload.success,
        status: action.payload.status
      }
      return newState
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      console.log(action)
      let newState = {
        users: action.payload.response,
        message: action.payload.message,
        success: action.payload.success,
        status: action.payload.status
      }
      return newState
    })
    .addCase(getOne.fulfilled, (state, action) => {
      let newState = {
        users: state.users,
        user: action.payload.response,
        message: action.payload.message,
        success: action.payload.success,
        status: action.payload.status
      }
      return newState
    })
    .addCase(getOne.rejected, (state, action) => {
      console.log(action)
      let newState = {
        user: action.payload.response,
        message: action.payload.message,
        success: action.payload.success,
        status: action.payload.status
      }
      return newState
    })
    .addCase(updateOne.fulfilled, (state, action) => {
      let newState = {
        users: state.users,
        user: action.payload.response,
        message: action.payload.message,
        success: action.payload.success,
        status: action.payload.status
      }
      return newState
    })
    .addCase(updateOne.rejected, (state, action) => {
      console.log(action)
      let newState = {
        user: action.payload.response,
        message: action.payload.message,
        success: action.payload.success,
        status: action.payload.status
      }
      return newState
    })
    .addCase(deleteOne.fulfilled, (state, action) => {
      let newState = {
        users: state.users,
        user: action.payload.response,
        message: action.payload.message,
        success: action.payload.success,
        status: action.payload.status
      }
      return newState
    })
    .addCase(deleteOne.rejected, (state, action) => {
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

const initialStateAuth = {
  auth:[],
  message: [],
  success: []
}

const authReducer = createReducer(initialStateAuth, (builder) => {
  builder
    .addCase(signInToken.fulfilled, (state, action) => {
      let newState = {
        auth: action.payload.response,
        message: action.payload.message,
        success: action.payload.success
      }
      return newState
    })
    .addCase(signInToken.rejected, (state, action) => {
      let newState = {
        auth: null,
        message: action.payload
      }
      return newState
    })
})

const usersReducers = {
  userReducer,
  authReducer
}

export default usersReducers