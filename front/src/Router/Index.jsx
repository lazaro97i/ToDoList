import { createBrowserRouter } from "react-router-dom"
import Layout from "../Layouts/Layout"
import Home from "../Pages/Home"
import AddUser from "../Pages/AddUser"
import Register from "../Pages/Register"
import Signin from "../Pages/Signin"

const router = createBrowserRouter([

  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signin",
        element: <Signin />
      },
      {
        element: <AddUser />,
        path: '/addUser'
      },
      {
        element: <Register />,
        path: '/signup'
      }
    ]
  }

])

export default router