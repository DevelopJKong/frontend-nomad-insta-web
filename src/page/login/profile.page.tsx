import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { PHOTO_FRAGMENT } from '../../common/fragments/common.fragment';

const SEE_PROFILE_QUERY = gql`
   query seeProfile($seeProfileInput: SeeProfileInput!) {
      seeProfile(input: $seeProfileInput) {
         user {
            id
            firstName
            lastName
            username
            bio
            avatar
            photos {
               ...PhotoFragment
            }
         }
         totalFollowers
         totalFollowing
         isMe
         isFollowing
      }
   }
   ${PHOTO_FRAGMENT}
`;

const Profile = () => {
   const { username } = useParams();
   const { data } = useQuery(SEE_PROFILE_QUERY, {
      variables: {
         seeProfileInput: {
            username,
         },
      },
   });
   return <div>Profile {username}</div>;
};

export default Profile;
