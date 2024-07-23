import { configureStore } from "@reduxjs/toolkit"
import tasksReducers from "./tasks_store/reducers"
import usersReducers from "./users_store/reducers"

const { userReducer, authReducer } = usersReducers

const store = configureStore({
  reducer: {
    tasks: tasksReducers,
    user: userReducer,
    auth: authReducer
  }
})

export default store