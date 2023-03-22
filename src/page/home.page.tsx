import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import Photo from '../components/feed/photo.component';
import PageTitle from '../components/page-title.component';

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
   isLiked: boolean;
}

const Container = styled.div``;

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
            isLiked
         }
      }
   }
`;

const Home = () => {
   const { data } = useQuery(FEED_QUERY);
   return (
      <Container>
         <PageTitle title='Home' />
         {data?.seeFeed?.photos?.map((photo: IPhoto) => (
            <Photo key={photo.id} id={photo.id} user={photo.user} file={photo.file} isLiked={photo.isLiked} likes={photo.likes} />
         ))}
      </Container>
   );
};

export default Home;
