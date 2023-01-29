import { createBrowserRouter } from "react-router-dom";
import Root from "./page/root";
import Home from "./page/logout/home";
import ErrorComponent from "./components/error-component";

const Router = () => {
   const logoutRouter = createBrowserRouter([
      {
         path: "/",
         element: <Root />,
         children: [
            {
               path: "",
               element: <Home />,
               errorElement: <ErrorComponent />,
            },
         ],
      },
   ]);
   const loginRouter = createBrowserRouter([]);
   return { logoutRouter, loginRouter };
};

export default Router;
