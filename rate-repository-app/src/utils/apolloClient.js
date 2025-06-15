import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities'; // <-- Add this import

const httpLink = createHttpLink({
  uri: Constants.expoConfig.extra.apolloUri
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      // 1. Get the authentication token from storage
      const accessToken = await authStorage.getAccessToken();

      // 2. Return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : ''
        }
      };
    } catch (e) {
      console.log(e);
      return {
        headers
      };
    }
  });

  return new ApolloClient({
    // 3. Chain the authLink and httpLink together
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Repository: {
          fields: {
            reviews: relayStylePagination(), // <-- Add this line
          },
        },
      },
    }),
  });
};

export default createApolloClient;
