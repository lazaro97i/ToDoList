import { RouterProvider } from 'react-router-dom'
import Home from './Components/Home'
import router from './Router/Index'

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
