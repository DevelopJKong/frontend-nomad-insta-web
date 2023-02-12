import { createBrowserRouter } from "react-router-dom";
import Root from "./page/root";
import Home from "./page/home";
import ErrorComponent from "./components/error-component";
import Login from "./page/logout/login";

const Router = () => {
   const logoutRouter = createBrowserRouter([
      {
         path: "/",
         element: <Root />,
         children: [
            {
               index: true,
               element: <Home />,
               errorElement: <ErrorComponent />,
            },
            {
               path: "login",
               element: <Login />,
               errorElement: <ErrorComponent />,
            },
         ],
      },
   ]);
   const loginRouter = createBrowserRouter([]);
   return { logoutRouter, loginRouter };
};

export default Router;
