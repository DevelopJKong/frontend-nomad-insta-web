import { RouterProvider } from "react-router-dom";
import Router from "./router";
import { isLoggedInVar } from "./apollo";
import { useReactiveVar } from "@apollo/client";

function App() {
   const isLoggedIn = useReactiveVar(isLoggedInVar);
   const { logoutRouter, loginRouter } = Router();
   return (
      <>
         <RouterProvider router={isLoggedIn ? logoutRouter : loginRouter} />
      </>
   );
}

export default App;
