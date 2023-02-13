import styled from "styled-components";
import { ReactNode } from "react";

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

const AuthLayout = ({ children }: { children: ReactNode }) => {
   return (
      <Container>
         <Wrapper>{children}</Wrapper>
      </Container>
   );
};

export default AuthLayout;
