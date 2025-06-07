import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    // Replace the IP address with your own machine's IP address!
    uri: 'http://192.168.1.132:4000/graphql',
    cache: new InMemoryCache()
  });
};

export default createApolloClient;
