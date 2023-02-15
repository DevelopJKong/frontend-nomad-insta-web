import styled from "styled-components";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100vh;
   flex-direction: column;
`;

const Wrapper = styled.div`
   max-width: 350px;
   width: 100%;
`;

const Footer = styled.footer`
   margin-top: 20px;
`;

const DarkModeBtn = styled.span`
   cursor: pointer;
`;

const AuthLayout = ({ children }: { children: ReactNode }) => {
   const darkMode = useReactiveVar(darkModeVar);
   return (
      <Container>
         <Wrapper>{children}</Wrapper>
         <Footer>
            <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
               <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </DarkModeBtn>
         </Footer>
      </Container>
   );
};

export default AuthLayout;
