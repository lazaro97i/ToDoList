import { RouterProvider } from 'react-router-dom'
import router from './Router/Index'
import store from './Store/store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
