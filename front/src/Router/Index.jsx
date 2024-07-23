import { createBrowserRouter } from "react-router-dom"
import Layout from "../Layouts/Layout"
import Home from "../Pages/Home"
import AddUser from "../Pages/AddUser"
import Register from "../Pages/Register"
import Signin from "../Pages/Signin"
import AdminUsers from "../Pages/AdminUsers"

const router = createBrowserRouter([

  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Signin />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        element: <AddUser />,
        path: '/addUser'
      },
      {
        element: <Register />,
        path: '/signup'
      },
      {
        element: <AdminUsers />,
        path: '/adminUsers'
      }
    ]
  }

])

export default router