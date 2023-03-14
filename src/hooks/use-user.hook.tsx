import { useReactiveVar, gql, useQuery } from '@apollo/client';
import { isLoggedInVar } from '../apollo';

const ME_QUERY = gql`
   query me {
      me {
         user {
            username
            avatar
         }
      }
   }
`;

const useUser = () => {
   const isLoggedIn = useReactiveVar(isLoggedInVar);
   const { data, error } = useQuery(ME_QUERY, {
      skip: !isLoggedIn,
   });
   return;
};

export default useUser;
