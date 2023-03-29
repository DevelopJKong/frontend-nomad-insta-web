import { useParams } from 'react-router-dom';
const Profile = () => {
   const { username } = useParams();
   return <div>Profile {username}</div>;
};

export default Profile;
