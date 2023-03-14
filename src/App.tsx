import { RouterProvider } from 'react-router-dom';
import Router from './router';
import { isLoggedInVar, darkModeVar } from './apollo';
import { useReactiveVar, gql, useQuery } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, lightTheme, darkTheme } from './styles';

function App() {
   const HEALTH_CHECK = gql`
      query healthCheck {
         hi {
            ok
         }
      }
   `;
   useQuery(HEALTH_CHECK);

   const { logoutRouter, loginRouter } = Router();
   const isLoggedIn = useReactiveVar(isLoggedInVar);
   const darkMode = useReactiveVar(darkModeVar);
   return (
      <>
         <ThemeProvider theme={darkMode ? lightTheme : darkTheme}>
            <GlobalStyles />
            <RouterProvider router={isLoggedIn ? loginRouter : logoutRouter} />
         </ThemeProvider>
      </>
   );
}

export default App;
