import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import Photo from '../components/feed/photo.component';
import PageTitle from '../components/page-title.component';
import { logUserOut } from '../apollo';
import { IPhoto } from '../components/shared';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../common/fragments/common.fragment';

const Container = styled.div``;

const FEED_QUERY = gql`
   query seeFeed($seeFeedInput: SeeFeedInput!) {
      seeFeed(input: $seeFeedInput) {
         photos {
            ...PhotoFragment
            user {
               username
               avatar
            }
            caption
            createdAt
            isMine
            comments {
               ...CommentFragment
            }
         }
      }
   }
   ${PHOTO_FRAGMENT}
   ${COMMENT_FRAGMENT}
`;

const Home = () => {
   const { data, loading } = useQuery(FEED_QUERY, {
      variables: {
         seeFeedInput: {
            page: 1,
         },
      },
   });

   console.log(data);

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
