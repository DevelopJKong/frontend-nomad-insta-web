import { ReactNode } from 'react';
import Header from './header';
import styled from 'styled-components';

const Content = styled.main`
   margin-top: 45px;
   max-width: 930px;
   width: 100%;
   margin: 0 auto;
`;

const Layout = ({ children }: { children: ReactNode }) => {
   return (
      <>
         <Header />
         <Content>{children}</Content>
      </>
   );
};

export default Layout;
