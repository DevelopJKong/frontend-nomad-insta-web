import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import { useReactiveVar } from "@apollo/client";

const Container = styled.div``;

const Title = styled.h2``;

const Button = styled.button``;

const Home = () => {
   const isLoggedIn = useReactiveVar(isLoggedInVar);
   return (
      <Container>
         <Title>Home {isLoggedIn ? "Login" : "Logout"}</Title>
         {isLoggedIn ? (
            <Button onClick={() => isLoggedInVar(false)}>Login</Button>
         ) : (
            <Button onClick={() => isLoggedInVar(true)}>Logout</Button>
         )}
      </Container>
   );
};

export default Home;
