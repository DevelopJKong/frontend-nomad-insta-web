import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import Avatar from '../components/avatar';
import { FatText } from '../components/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';

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

const PhotoContainer = styled.div`
   max-width: 630px;
   background-color: white;
   border-radius: 4px;
   border: 1px solid ${({ theme }) => theme.borderColor};
   margin-bottom: 60px;
   padding: 15px 10px;
`;

const PhotoHeader = styled.div`
   padding: 5px 10px;
   display: flex;
   align-items: center;
   border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
   margin-left: 10px;
`;

const PhotoFile = styled.img`
   min-width: 100%;
   max-width: 100%;
`;

const PhotoData = styled.div`
   padding: 12px 15px;
`;

const PhotoActions = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 15px;
   div {
      display: flex;
      align-items: center;
   }
   svg {
      font-size: 20px;
   }
`;

const PhotoAction = styled.div`
   margin-right: 10px;
   display: block;
`;

const Likes = styled(FatText)`
   padding: 15px;
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
            isLiked
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
                           <FontAwesomeIcon
                              style={{ color: photo.isLiked ? 'tomato' : 'inherit' }}
                              icon={photo.isLiked ? SolidHeart : faHeart}
                           />
                        </PhotoAction>
                        <PhotoAction>
                           <FontAwesomeIcon icon={faComment} />
                        </PhotoAction>
                        <PhotoAction>
                           <FontAwesomeIcon icon={faPaperPlane} />
                        </PhotoAction>
                     </div>
                     <div>
                        <FontAwesomeIcon icon={faBookmark} />
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
