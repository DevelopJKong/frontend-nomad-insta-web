import { createBrowserRouter } from 'react-router-dom';
import Root from './page/root.page';
import Error from './components/error.component';
import Login from './common/logout/login.page';
import SignUp from './common/logout/sign-up.page';
import routes from './routes';
import Home from './page/home.page';
import Layout from './components/layout.component';

const Router = () => {
   const logoutRouter = createBrowserRouter([
      {
         path: routes.login,
         element: <Root />,
         children: [
            {
               index: true,
               element: <Login />,
               errorElement: <Error />,
            },
            {
               path: routes.signUp,
               element: <SignUp />,
               errorElement: <Error />,
            },
         ],
      },
   ]);
   const loginRouter = createBrowserRouter([
      {
         path: routes.home,
         element: (
            <Layout>
               <Root />
            </Layout>
         ),
         children: [
            {
               index: true,
               element: <Home />,
               errorElement: <Error />,
            },
         ],
      },
   ]);
   return { logoutRouter, loginRouter };
};

export default Router;
