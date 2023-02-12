import { RouterProvider } from "react-router-dom";
import Router from "./router";
import { isLoggedInVar, darkModeVar } from "./apollo";
import { useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, darkTheme, lightTheme } from "./styles";

function App() {
   const { logoutRouter, loginRouter } = Router();
   const isLoggedIn = useReactiveVar(isLoggedInVar);
   const darkMode = useReactiveVar(darkModeVar);
   return (
      <>
         <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <GlobalStyles />
            <RouterProvider router={isLoggedIn ? loginRouter : logoutRouter} />
         </ThemeProvider>
      </>
   );
}

export default App;
