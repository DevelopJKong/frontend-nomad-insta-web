import styled from "styled-components";

const Container = styled.div``;
const Title = styled.h2``;
const Button = styled.button``;

const Login = () => {
   return (
      <Container>
         <Title>Login</Title>
         <Button onClick={() => console.log("login")}>Login</Button>
      </Container>
   );
};

export default Login;
