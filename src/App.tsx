import { RouterProvider } from "react-router-dom";
import Router from "./router";

function App() {
   const { logoutRouter, loginRouter } = Router();
   return (
      <>
         <RouterProvider router={logoutRouter} />
      </>
   );
}

export default App;
