import { createBrowserRouter } from "react-router-dom";
import Root from "./page/root";
import Home from "./page/home";
import ErrorComponent from "./components/error-component";
import Check from "./page/login/check";
import Login from "./page/logout/login";
import SignUp from "./page/logout/sign-up";
import routes from "./routes";

const Router = () => {
   const logoutRouter = createBrowserRouter([
      {
         path: routes.home,
         element: <Root />,
         children: [
            {
               index: true,
               element: <Home />,
               errorElement: <ErrorComponent />,
            },
            {
               path: routes.login,
               element: <Login />,
               errorElement: <ErrorComponent />,
            },
            {
               path: routes.signUp,
               element: <SignUp />,
               errorElement: <ErrorComponent />,
            },
         ],
      },
   ]);
   const loginRouter = createBrowserRouter([
      {
         path: routes.home,
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
