import styled from 'styled-components';
import { FatText } from '../shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faPaperPlane, faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../avatar.component';
import { gql, useMutation } from '@apollo/client';
import { toggleLike, toggleLikeVariables } from '../../__generated__/toggleLike';
import { toast } from 'react-toastify';

interface IPhoto {
   id: number;
   user: {
      username: string;
      avatar: string;
   };
   file: string;
   isLiked: boolean;
   likes: number;
}

interface IPhotoAction {
   onClick?: (e: Event) => void;
}

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

const PhotoAction = styled.div<IPhotoAction>`
   margin-right: 10px;
   display: block;
   cursor: pointer;
`;

const Likes = styled(FatText)`
   padding: 15px;
`;

const TOGGLE_LIKE_MUTATION = gql`
   mutation toggleLike($toggleLikeInput: ToggleLikeInput!) {
      toggleLike(input: $toggleLikeInput) {
         ok
         error
         message
      }
   }
`;

const Photo = ({ id, user, file, isLiked, likes }: IPhoto) => {
   const updateToggleLike = (cache: any, result: any) => {
      const updateData: { data: toggleLike } = result;
      const {
         data: {
            toggleLike: { ok },
         },
      } = updateData;

      if (ok) {
         cache.writeFragment({
            id: `Photo:${id}`,
            fragment: gql`
               fragment PhotoFragment on Photo {
                  isLiked
               }
            `,
            data: {
               isLiked: !isLiked,
            },
         });
      }
   };
   const [toggleLikeMutation, { loading }] = useMutation<toggleLike, toggleLikeVariables>(TOGGLE_LIKE_MUTATION, {
      variables: {
         toggleLikeInput: { id },
      },
      update: updateToggleLike,
   });
   return (
      <PhotoContainer key={id}>
         <PhotoHeader>
            <Avatar isLarge={true} url={user.avatar} />
            <Username>{user.username}</Username>
         </PhotoHeader>
         <PhotoFile src={file} />
         <PhotoData>
            <PhotoActions>
               <div>
                  <PhotoAction
                     onClick={() => {
                        toggleLikeMutation();
                        if (loading) return;
                        toast(isLiked ? '👎Unlike' : '👍Like', {
                           position: 'top-right',
                           autoClose: 1000,
                           hideProgressBar: true,
                           closeOnClick: true,
                           pauseOnHover: true,
                           draggable: true,
                           progress: undefined,
                           theme: 'colored',
                        });
                     }}
                  >
                     <FontAwesomeIcon style={{ color: isLiked ? 'tomato' : 'inherit' }} icon={isLiked ? SolidHeart : faHeart} />
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
            <Likes>{likes === 0 ? '1 like' : `${likes} likes`}</Likes>
         </PhotoData>
      </PhotoContainer>
   );
};

export default Photo;
