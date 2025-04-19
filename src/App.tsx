import { RouterProvider } from "react-router"
import { appRoutes } from "./routes/Routes"

function App() {

  return (
    <>
      <RouterProvider router={appRoutes} />
    </>
  )
}

export default App
