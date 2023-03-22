import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import Photo from '../components/feed/photo.component';
import PageTitle from '../components/page-title.component';
import { logUserOut } from '../apollo';
import { IPhoto } from '../components/shared';

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
            commentNumber
            createdAt
            isMine
            isLiked
            comments {
               id
               user {
                  username
                  avatar
               }
               payload
               isMine
               createdAt
            }
         }
      }
   }
`;

const Home = () => {
   const { data, loading } = useQuery(FEED_QUERY);

   if (loading) return <div>Loading...</div>;
   if (!loading && !data?.seeFeed) {
      window.location.href = '/';
      logUserOut();
      return null;
   }

   return (
      <Container>
         <PageTitle title='Home' />
         {data?.seeFeed?.photos?.map((photo: IPhoto) => {
            return <Photo key={photo.id} {...photo} />;
         })}
      </Container>
   );
};

export default Home;
