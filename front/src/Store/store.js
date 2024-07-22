import { configureStore } from "@reduxjs/toolkit"
import tasksReducers from "./tasks_store/reducers"
import usersReducers from "./users_store/reducers"

const store = configureStore({
  reducer: {
    tasks: tasksReducers,
    user: usersReducers
  }
})

export default store