import { createBrowserRouter } from "react-router-dom"
import Layout from "../Layouts/Layout"
import Home from "../Components/Home"

const router = createBrowserRouter([

  {
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home />
      }
    ]

  }

])

export default router