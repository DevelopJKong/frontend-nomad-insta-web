import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { PHOTO_FRAGMENT } from '../../common/fragments/common.fragment';
import styled from 'styled-components';
import { FatText } from '../../components/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import PageTitle from '../../components/page-title.component';

interface IProfile {
   isMe: boolean;
   isFollowing: boolean;
}

const Header = styled.div`
   display: flex;
`;

const Avatar = styled.img`
   margin-left: 50px;
   height: 160px;
   width: 160px;
   border-radius: 50%;
   margin-right: 150px;
   background-color: #2c2c2c;
`;

const Column = styled.div``;

const Username = styled.div`
   font-size: 28px;
   font-weight: 400;
`;

const Row = styled.div`
   margin-bottom: 20px;
   font-size: 16px;
   display: flex;
`;

const List = styled.ul`
   display: flex;
`;

const Item = styled.li`
   margin-right: 20px;
`;

const Value = styled(FatText)`
   font-size: 18px;
`;

const Name = styled(FatText)`
   font-size: 20px;
`;

const Grid = styled.div`
   display: grid;
   grid-auto-rows: 290px;
   grid-template-columns: repeat(3, 1fr);
   gap: 30px;
   margin-top: 50px;
`;

const Photo = styled.div<{ bg: string }>`
   background-image: url('${({ bg }) => bg}');
   background-size: cover;
   position: relative;
   cursor: pointer;
`;

const Icons = styled.div`
   position: absolute;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.5);
   color: white;
   opacity: 0;
   &:hover {
      opacity: 1;
   }
`;

const Icon = styled.span`
   font-size: 18px;
   display: flex;
   align-items: center;
   margin: 0px 5px;
   svg {
      font-size: 14px;
      margin-right: 5px;
   }
`;

const ProfileBtn = styled.span`
   cursor: pointer;
   border: none;
   border-radius: 3px;
   margin-left: 10px;
   background-color: ${(props) => props.theme.accent};
   color: white;
   text-align: center;
   padding: 8px 0px;
   font-weight: 600;
   width: 100%;
`;

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

const FOLLOW_USER_MUTATION = gql`
   mutation followUser($followUserInput: FollowUserInput!) {
      followUser(input: $followUserInput) {
         ok
      }
   }
`;

const UN_FOLLOW_USER_MUTATION = gql`
   mutation unFollowUser($unFollowUserInput: UnFollowUserInput!) {
      unFollowUser(input: $unFollowUserInput) {
         ok
      }
   }
`;

const Profile = () => {
   const { username } = useParams();
   const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
      variables: {
         seeProfileInput: {
            username,
         },
      },
   });

   const getButton = (seeProfile: IProfile) => {
      const { isMe, isFollowing } = seeProfile;
      if (isMe) {
         return <ProfileBtn>Edit Profile</ProfileBtn>;
      }
      if (isFollowing) {
         return <ProfileBtn>UnFollow</ProfileBtn>;
      } else {
         return <ProfileBtn>Follow</ProfileBtn>;
      }
   };

   return (
      <div>
         <Header>
            <PageTitle title={loading ? 'Loading...' : `${data?.seeProfile?.username}`} />
            <Avatar src={data?.seeProfile?.user?.avatar} />
            <Column>
               <Row>
                  <Username>{data?.seeProfile?.user?.username}</Username>
                  {data?.seeProfile ? getButton(data.seeProfile) : null}
               </Row>
               <Row>
                  <List>
                     <Item>
                        <span>
                           <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                        </span>
                     </Item>
                     <Item>
                        <span>
                           <Value>{data?.seeProfile?.totalFollowing}</Value> following
                        </span>
                     </Item>
                  </List>
               </Row>
               <Row>
                  <Name>
                     {data?.seeProfile?.user?.firstName}&nbsp;{data?.seeProfile?.user?.lastName}
                  </Name>
               </Row>
               <Row>{data?.seeProfile?.user?.bio}</Row>
            </Column>
         </Header>
         <Grid>
            {data?.seeProfile?.user?.photos?.map((photo: any, index: number) => {
               console.log(photo.file);
               return (
                  <Photo key={index} bg={photo.file}>
                     <Icons>
                        <Icon>
                           <FontAwesomeIcon icon={faHeart} />
                           {photo.likes}
                        </Icon>
                        <Icon>
                           <FontAwesomeIcon icon={faComment} />
                           {photo.commentNumber}
                        </Icon>
                     </Icons>
                  </Photo>
               );
            })}
         </Grid>
      </div>
   );
};

export default Profile;
