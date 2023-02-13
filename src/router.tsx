import { createBrowserRouter } from "react-router-dom";
import Root from "./page/root";
import ErrorComponent from "./components/error-component";
import Login from "./page/logout/login";
import SignUp from "./page/logout/sign-up";
import routes from "./routes";

const Router = () => {
   const logoutRouter = createBrowserRouter([
      {
         path: routes.login,
         element: <Root />,
         children: [
            {
               index: true,
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
         path: routes.login,
         element: <Root />,
         children: [
            {
               index: true,
               element: <Login />,
               errorElement: <ErrorComponent />,
            },
         ],
      },
   ]);
   return { logoutRouter, loginRouter };
};

export default Router;
