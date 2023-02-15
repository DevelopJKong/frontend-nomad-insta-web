import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../apollo";
import { useReactiveVar } from "@apollo/client";

const Container = styled.div``;

const Title = styled.h2``;

const Button = styled.button``;

const Home = () => {
   const isLoggedIn = useReactiveVar(isLoggedInVar);
   return (
      <Container>
         <Title>Home {isLoggedIn ? "Logout" : "Login"}</Title>
         <Button onClick={() => logUserOut()}>Log out now!</Button>
      </Container>
   );
};

export default Home;
