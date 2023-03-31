import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { isLoggedInVar } from '../apollo';
import { useReactiveVar } from '@apollo/client';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import routes from '../common/routes';
import useUser from '../hooks/use-user.hook';
import Avatar from './avatar.component';

const SHeader = styled.header`
   width: 100%;
   border-bottom: 1px solid ${(props) => props.theme.borderColor};
   background-color: ${(props) => props.theme.bgColor};
   padding: 18px 0px;
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
const IconWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 100%;
`;

const IconContainer = styled.div`
   display: flex;
`;

const Button = styled.span`
   background-color: ${({ theme }) => theme.accent};
   border-radius: 4px;
   padding: 5px 15px;
   color: white;
   font-weight: 600;
`;

const Header = () => {
   const isLoggedIn = useReactiveVar(isLoggedInVar);
   const { data } = useUser();
   return (
      <SHeader>
         <Wrapper>
            <Column>
               <FontAwesomeIcon icon={faInstagram} size='2x' />
            </Column>
            <Column>
               {isLoggedIn ? (
                  <IconContainer>
                     <Icon>
                        <IconWrapper>
                           <FontAwesomeIcon icon={faHome} size='lg' />
                        </IconWrapper>
                     </Icon>
                     <Icon>
                        <IconWrapper>
                           <FontAwesomeIcon icon={faCompass} size='lg' />
                        </IconWrapper>
                     </Icon>
                     <Icon>
                        <Link to={`/users/${data?.me?.user?.username}`}>
                           <Avatar isLarge={true} url={data?.me?.user?.avatar} />
                        </Link>
                     </Icon>
                  </IconContainer>
               ) : (
                  <Link to={routes.home}>
                     <Button>Login</Button>
                  </Link>
               )}
            </Column>
         </Wrapper>
      </SHeader>
   );
};

export default Header;
