import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { isLoggedInVar } from '../apollo';
import { useReactiveVar } from '@apollo/client';
import { faCompass, faUser } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const SHeader = styled.header`
   width: 100%;
   border-radius: 1px solid ${({ theme }) => theme.borderColor};
   background-color: ${({ theme }) => theme.bgColor};
   padding: 10px 0;
   display: flex;
   align-items: center;
   justify-content: center;
`;

const Wrapper = styled.div`
   max-width: 930px;
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
   margin-left: 15px;
`;

const Header = () => {
   const isLoggedInIn = useReactiveVar(isLoggedInVar);
   return (
      <SHeader>
         <Wrapper>
            <Column>
               <FontAwesomeIcon icon={faInstagram} size='2x' />
            </Column>
            <Column>
               {isLoggedInIn ? (
                  <>
                     <Icon>
                        <FontAwesomeIcon icon={faHome} size='lg' />
                     </Icon>
                     <Icon>
                        <FontAwesomeIcon icon={faCompass} size='lg' />
                     </Icon>
                     <Icon>
                        <FontAwesomeIcon icon={faUser} size='lg' />
                     </Icon>
                  </>
               ) : null}
            </Column>
         </Wrapper>
      </SHeader>
   );
};

export default Header;
