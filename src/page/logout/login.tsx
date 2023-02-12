import styled from "styled-components";
import { darkModeVar } from "../../apollo";

const Container = styled.div`
   background-color: ${({ theme }) => theme.bgColor};
`;
const Title = styled.h2`
   color: ${({ theme }) => theme.fontColor};
`;
const Button = styled.button``;

const Login = () => {
   return (
      <Container>
         <Title>Login</Title>
         <Button onClick={() => darkModeVar(true)}>To Dark</Button>
         <Button onClick={() => darkModeVar(false)}>To White</Button>
      </Container>
   );
};

export default Login;
