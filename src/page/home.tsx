import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import Avatar from '../components/avatar';
import { FatText } from '../components/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';

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
   max-width: 630px;
   background-color: white;
   border: 1px solid ${({ theme }) => theme.borderColor};
   margin-bottom: 20px;
   padding: 15px 10px;
`;

const PhotoHeader = styled.div`
   padding: 5px 10px;
   display: flex;
   align-items: center;
`;

const Username = styled(FatText)`
   margin-left: 10px;
`;

const PhotoFile = styled.img`
   min-width: 100%;
`;

const PhotoData = styled.div``;

const PhotoActions = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 15px;
   div {
      display: flex;
      align-items: center;
   }
`;

const PhotoAction = styled.div`
   margin-right: 10px;
   display: block;
`;

const Likes = styled(FatText)``;

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
         {data?.seeFeed?.photos?.map((photo: IPhoto, index: number) => (
            <PhotoContainer key={index}>
               <PhotoHeader>
                  <Avatar isLarge={true} url={photo.user.avatar} />
                  <Username>{photo.user.username}</Username>
               </PhotoHeader>
               <PhotoFile src={photo.file} />
               <PhotoData>
                  <PhotoActions>
                     <div>
                        <PhotoAction>
                           <FontAwesomeIcon size={'2x'} icon={faHeart} />
                        </PhotoAction>
                        <PhotoAction>
                           <FontAwesomeIcon size={'2x'} icon={faComment} />
                        </PhotoAction>
                        <PhotoAction>
                           <FontAwesomeIcon size={'2x'} icon={faPaperPlane} />
                        </PhotoAction>
                     </div>
                     <div>
                        <FontAwesomeIcon size={'2x'} icon={faBookmark} />
                     </div>
                  </PhotoActions>
                  <Likes>{photo.likes === 0 ? '1 like' : `${photo.likes} likes`}</Likes>
               </PhotoData>
            </PhotoContainer>
         ))}
      </Container>
   );
};

export default Home;
