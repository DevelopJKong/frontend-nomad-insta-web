import { ApolloClient, InMemoryCache, createHttpLink, makeVar, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_DARK_MODE } from './common/constants/common.constant';
import { seeFeed_seeFeed as ISeeFeed, seeFeed_seeFeed_photos as ISeeFeedPhotos } from './__generated__/seeFeed';
import * as _ from 'lodash';

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
const mode = Boolean(localStorage.getItem(LOCAL_STORAGE_DARK_MODE));

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
export const darkModeVar = makeVar(mode);

export const logUserIn = (token: string) => {
   localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
   authTokenVar(token);
   isLoggedInVar(true);
};

export const logUserOut = () => {
   localStorage.removeItem(LOCAL_STORAGE_TOKEN);
   authTokenVar('');
   isLoggedInVar(false);
};

export const enableDarkMode = () => {
   localStorage.setItem(LOCAL_STORAGE_DARK_MODE, 'enabled');
   darkModeVar(true);
};

export const disableDarkMode = () => {
   localStorage.removeItem(LOCAL_STORAGE_DARK_MODE);
   darkModeVar(false);
};

const httpLink = createHttpLink({
   uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
});

const wsLink = new WebSocketLink({
   uri: `${process.env.REACT_APP_WEBSOCKET_URL}/graphql`,
   options: {
      reconnect: true,
      connectionParams: {
         'x-jwt': authTokenVar() || '',
      },
   },
});

const authLink = setContext((_, { headers }) => {
   return {
      headers: {
         ...headers,
         'x-jwt': authTokenVar() || '',
      },
   };
});

const splitLink = split(
   ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
   },
   wsLink,
   authLink.concat(httpLink),
);

export const client = new ApolloClient({
   link: splitLink,
   cache: new InMemoryCache({
      typePolicies: {
         User: {
            keyFields: (obj) => `User:${obj.username}`,
         },

         Query: {
            fields: {
               isLoggedIn: {
                  read() {
                     return isLoggedInVar();
                  },
               },
               token: {
                  read() {
                     return authTokenVar();
                  },
               },
               darkMode: {
                  read() {
                     return darkModeVar();
                  },
               },

               seeFeed: {
                  keyArgs: false,
                  merge(existing: ISeeFeed, incoming: ISeeFeed) {
                     if (existing) {
                        return {
                           ...existing,
                           photos: [
                              ...(!_.isEmpty(existing?.photos as ISeeFeedPhotos[]) ? (existing.photos as ISeeFeedPhotos[]) : []),
                              ...(!_.isEmpty(incoming?.photos as ISeeFeedPhotos[]) ? (incoming.photos as ISeeFeedPhotos[]) : []),
                           ],
                        };
                     }
                     return incoming;
                  },
               },
            },
         },
      },
   }),
});
