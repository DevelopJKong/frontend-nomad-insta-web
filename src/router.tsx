import { createBrowserRouter } from "react-router-dom";
import Root from "./page/root";
import Home from "./page/home";
import ErrorComponent from "./components/error-component";
import Login from "./page/logout/login";
import Check from "./page/login/check";

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
   const loginRouter = createBrowserRouter([
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
               path: "check",
               element: <Check />,
               errorElement: <ErrorComponent />,
            },
         ],
      },
   ]);
   return { logoutRouter, loginRouter };
};

export default Router;
