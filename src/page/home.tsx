import styled from 'styled-components';
import { isLoggedInVar, logUserOut } from '../apollo';
import { useReactiveVar } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const Container = styled.div``;

const Title = styled.h2``;

const Button = styled.button``;

const Home = () => {
   const navigate = useNavigate();
   const isLoggedIn = useReactiveVar(isLoggedInVar);
   const onLogout = () => {
      logUserOut();
      navigate('/', { replace: true, state: { email: '', password: '', message: '' } });
   };
   return (
      <Container>
         <Title>Home {isLoggedIn ? 'Logout' : 'Login'}</Title>
         <Button onClick={onLogout}>Log out now!</Button>
      </Container>
   );
};

export default Home;
