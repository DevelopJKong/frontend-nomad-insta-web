import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

const SAvatar = styled.div`
   width: 20px;
   height: 20px;
   border-radius: 15px;
   background-color: ${({ theme }) => theme.color.dark};
   overflow: hidden;
   display: flex;
   align-items: center;
   justify-content: center;
`;

const Img = styled.img`
   max-width: 100%;
`;

const Avatar = ({ url = '' }: { url: string }) => {
   return <SAvatar>{url !== '' ? <Img src={url} alt='avatar' /> : <FontAwesomeIcon icon={faUser} />}</SAvatar>;
};

export default Avatar;
