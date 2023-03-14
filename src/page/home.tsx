import styled from 'styled-components';
import { isLoggedInVar, logUserOut } from '../apollo';
import { useReactiveVar, gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/avatar';
import { FatText } from '../components/shared';

interface IPhoto {
   id: number;
   user: {
      username: string;
      avatar: string;
   };
   file: string;
   caption: string;
   likes: number;
   comments: number;
   createdAt: string;
   isMine: boolean;
}

const Container = styled.div``;

const PhotoContainer = styled.div`
   background-color: white;
   border: 1px solid ${({ theme }) => theme.borderColor};
   margin-bottom: 20px;
`;

const PhotoHeader = styled.div`
   padding: 5px 10px;
   display: flex;
   align-items: center;
`;

const Username = styled(FatText)`
   margin-left: 10px;
`;

const FEED_QUERY = gql`
   query seeFeed {
      seeFeed {
         photos {
            id
            user {
               username
               avatar
            }
            file
            caption
            likes
            comments
            createdAt
            isMine
         }
      }
   }
`;

const Home = () => {
   const { data } = useQuery(FEED_QUERY);
   return (
      <Container>
         {data?.seeFeed?.photos?.map((photo: IPhoto) => (
            <PhotoContainer>
               <PhotoHeader></PhotoHeader>
               <Avatar url={photo.user.avatar} />
               <Username>{photo.user.username}</Username>
            </PhotoContainer>
         ))}
      </Container>
   );
};

export default Home;
