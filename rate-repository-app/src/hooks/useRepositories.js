import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  // The optional chaining (?.) is used here to safely access `repositories`
  // even if `data` is undefined.
  const repositories = data?.repositories;

  return { repositories, loading, refetch };
};

export default useRepositories;
