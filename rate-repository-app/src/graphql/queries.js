// src/graphql/queries.js
import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    # You can name your query
    repositories {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
      # pageInfo { # Optional for now, but good for pagination later
      #   endCursor
      #   startCursor
      #   hasNextPage
      # }
    }
  }
`;
