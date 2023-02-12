import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import { useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Title = styled.h2``;

const Home = () => {
   const isLoggedIn = useReactiveVar(isLoggedInVar);
   return (
      <Container>
         <Title>Home {isLoggedIn ? "Logout" : "Login"}</Title>
         <Link to='/login'>Login</Link>
      </Container>
   );
};

export default Home;
