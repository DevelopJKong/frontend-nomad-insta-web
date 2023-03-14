import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
   margin-top: 30px;
`;

const Root = () => {
   return (
      <Container>
         <Outlet />
      </Container>
   );
};

export default Root;
