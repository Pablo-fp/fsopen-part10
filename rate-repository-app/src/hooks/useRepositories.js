// src/hooks/useRepositories.js
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries'; // Import your query

const useRepositories = () => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
    // Other options like variables can be added here later if needed
  });

  // The 'data' object directly contains 'repositories' if the query is successful
  // So, data?.repositories would be the equivalent of the 'repositories' state previously
  // Error handling can be added here if needed
  if (error) {
    console.error('Error fetching repositories:', error);
  }

  return {
    repositories: data ? data.repositories : undefined, // data.repositories contains edges, pageInfo etc.
    loading,
    refetch // Expose refetch for potential pull-to-refresh functionality
  };
};

export default useRepositories;
