// src/utils/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'; // Added createHttpLink
import Constants from 'expo-constants';

const APOLLO_SERVER_URI = Constants.expoConfig.extra.APOLLO_SERVER_URI;

const httpLink = createHttpLink({
  uri: APOLLO_SERVER_URI
});

const createApolloClient = (authStorage) => {
  // authStorage will be used in Ex 10.14
  // The authLink logic will be added in Exercise 10.14
  // For now, a simple client:
  return new ApolloClient({
    link: httpLink, // Use httpLink directly for now
    cache: new InMemoryCache()
  });
};

export default createApolloClient;
