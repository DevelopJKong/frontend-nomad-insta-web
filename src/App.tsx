import { RouterProvider } from "react-router-dom";
import Router from "./router";
import { isLoggedInVar, darkModeVar } from "./apollo";
import { useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, darkTheme, lightTheme } from "./styles";

function App() {
   const isLoggedIn = useReactiveVar(isLoggedInVar);
   const { logoutRouter, loginRouter } = Router();
   const darkMode = useReactiveVar(darkModeVar);

   return (
      <>
         <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <GlobalStyles />
            <RouterProvider router={isLoggedIn ? logoutRouter : loginRouter} />
         </ThemeProvider>
      </>
   );
}

export default App;
