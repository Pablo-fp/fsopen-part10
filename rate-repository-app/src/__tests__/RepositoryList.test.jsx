import React from 'react';
import { render, within } from '@testing-library/react-native';
import RepositoryListContainer from '../components/RepositoryListContainer';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const repositoryItems = getAllByTestId('repositoryItem');
      expect(repositoryItems).toHaveLength(2);

      // Helper to check formatted numbers
      const formatCount = (count) => {
        return count >= 1000
          ? `${(count / 1000).toFixed(1).replace('.0', '')}k`
          : String(count);
      };

      // First repository
      const firstRepository = within(repositoryItems[0]);
      expect(firstRepository.getByText('jaredpalmer/formik')).toBeDefined();
      expect(
        firstRepository.getByText('Build forms in React, without the tears')
      ).toBeDefined();
      expect(firstRepository.getByText('TypeScript')).toBeDefined();
      expect(firstRepository.getByText(formatCount(21856))).toBeDefined();
      expect(firstRepository.getByText(formatCount(1619))).toBeDefined();
      expect(firstRepository.getByText('3')).toBeDefined(); // Review Count
      expect(firstRepository.getByText('88')).toBeDefined(); // Rating Average

      // Second repository
      const secondRepository = within(repositoryItems[1]);
      expect(secondRepository.getByText('async-library/react-async')).toBeDefined();
      expect(
        secondRepository.getByText('Flexible promise-based React data loader')
      ).toBeDefined();
      expect(secondRepository.getByText('JavaScript')).toBeDefined();
      expect(secondRepository.getByText(formatCount(1760))).toBeDefined();
      expect(secondRepository.getByText(formatCount(69))).toBeDefined();
      expect(secondRepository.getByText('3')).toBeDefined(); // Review Count
      expect(secondRepository.getByText('72')).toBeDefined(); // Rating Average
    });
  });
});
