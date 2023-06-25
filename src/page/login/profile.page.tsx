import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation, ApolloCache, FetchResult, useApolloClient } from '@apollo/client';
import { PHOTO_FRAGMENT } from '../../common/fragments/common.fragment';
import styled from 'styled-components';
import { FatText } from '../../components/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import PageTitle from '../../components/page-title.component';
import useUser from '../../hooks/use-user.hook';
import { unFollowerUser } from '../../__generated__/unFollowerUser';
import { followerUser } from '../../__generated__/followerUser';

interface IProfile {
   user: {
      isMe: boolean;
      isFollowing: boolean;
   };
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

const Photo = styled.div`
   position: relative;
   cursor: pointer;
`;

const PhotoImg = styled.img`
   width: 100%;
   height: 100%;
   object-fit: cover;
   position: absolute;
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
   padding: 8px 25px;
   font-weight: 600;
   width: 100%;
   cursor: pointer;
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
            totalFollowers
            totalFollowing
            isMe
            isFollowing
            following {
               id
               username
            }
            followers {
               id
               username
            }
         }
      }
   }
   ${PHOTO_FRAGMENT}
`;

const FOLLOW_USER_MUTATION = gql`
   mutation followerUser($followerUserInput: FollowerUserInput!) {
      followerUser(input: $followerUserInput) {
         ok
      }
   }
`;

const UN_FOLLOW_USER_MUTATION = gql`
   mutation unFollowerUser($unFollowerUserInput: UnFollowerUserInput!) {
      unFollowerUser(input: $unFollowerUserInput) {
         ok
      }
   }
`;

const Profile = () => {
   const { username } = useParams();
   const { data: userData } = useUser();
   const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
      variables: {
         seeProfileInput: {
            username,
         },
      },
   });

   const client = useApolloClient();

   const unFollowerUserUpdate = (cache: ApolloCache<any>, result: Omit<FetchResult<unFollowerUser>, 'context'>) => {
      if (!result?.data) return;
      const {
         data: {
            unFollowerUser: { ok },
         },
      } = result;

      if (!ok) return;

      cache.modify({
         id: `User:${username}`,
         fields: {
            isFollowing(_prev) {
               return false;
            },
            totalFollowers(prev) {
               return prev - 1;
            },
         },
      });

      const { me } = userData;
      cache.modify({
         id: `User:${me.username}`,
         fields: {
            totalFollowing(prev) {
               return prev - 1;
            },
         },
      });
   };
   const followerUserCompleted = (data: followerUser) => {
      if (!data) return;
      const {
         followerUser: { ok },
      } = data;

      if (!ok) return;

      const { cache } = client;
      cache.modify({
         id: `User:${username}`,
         fields: {
            isFollowing(_prev) {
               return true;
            },
            totalFollowers(prev) {
               return prev + 1;
            },
         },
      });
      const { me } = userData;
      cache.modify({
         id: `User:${me.username}`,
         fields: {
            totalFollowing(prev) {
               return prev + 1;
            },
         },
      });
   };

   const [unFollowerUser] = useMutation(UN_FOLLOW_USER_MUTATION, {
      variables: {
         unFollowerUserInput: {
            username,
         },
      },
      update: unFollowerUserUpdate,
   });

   const [followerUser] = useMutation(FOLLOW_USER_MUTATION, {
      variables: {
         followerUserInput: {
            username,
         },
      },
      onCompleted: followerUserCompleted,
   });

   const getButton = (seeProfile: IProfile) => {
      const {
         user: { isMe, isFollowing },
      } = seeProfile;
      if (isMe) {
         return <ProfileBtn>Edit Profile</ProfileBtn>;
      }
      if (isFollowing) {
         return <ProfileBtn onClick={() => unFollowerUser()}>UnFollow</ProfileBtn>;
      } else {
         return <ProfileBtn onClick={() => followerUser()}>Follow</ProfileBtn>;
      }
   };

   if (loading) return <div>Loading...</div>;

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
                           <Value>{data?.seeProfile?.user?.totalFollowers}</Value> followers
                        </span>
                     </Item>
                     <Item>
                        <span>
                           <Value>{data?.seeProfile?.user?.totalFollowing}</Value> following
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
               return (
                  <Photo key={index}>
                     <PhotoImg src={photo.file} alt={`photo-${index}`} />
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
