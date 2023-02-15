import { RouterProvider } from "react-router-dom";
import Router from "./router";
import { isLoggedInVar } from "./apollo";
import { useReactiveVar, gql, useQuery } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "./styles";

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
   return (
      <>
         <ThemeProvider theme={lightTheme}>
            <GlobalStyles />
            <RouterProvider router={isLoggedIn ? loginRouter : logoutRouter} />
         </ThemeProvider>
      </>
   );
}

export default App;
