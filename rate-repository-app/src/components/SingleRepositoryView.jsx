import React from 'react';
import { useParams, useNavigate } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import { format } from 'date-fns';

import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { GET_REPOSITORY } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
  reviewContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15
  },
  ratingCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 3,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  ratingText: {
    color: '#0366d6',
    fontWeight: 'bold',
    fontSize: 18
  },
  reviewContent: {
    flex: 1,
    flexDirection: 'column'
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  username: {
    fontWeight: 'bold',
    marginRight: 10
  },
  date: {
    color: '#586069',
    fontSize: 14
  },
  reviewText: {
    marginTop: 4,
    fontSize: 15,
    color: '#24292e'
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => (
  <RepositoryItem item={repository} showGitHubButton={true} />
);

const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.ratingCircle}>
      <Text style={styles.ratingText}>{review.rating}</Text>
    </View>
    <View style={styles.reviewContent}>
      <View style={styles.reviewHeader}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>
          {format(new Date(review.createdAt), 'dd.MM.yyyy')}
        </Text>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  </View>
);

const SingleRepositoryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network' // This ensures we get fresh data
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const repository = data?.repository;
  const reviews = repository?.reviews?.edges.map((edge) => edge.node) || [];

  // Add a button to navigate to CreateReview with pre-filled data
  const handleCreateReview = () => {
    const [ownerName, repositoryName] = repository.fullName.split('/');
    navigate('/create-review', { state: { ownerName, repositoryName } });
  };

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <>
          <RepositoryInfo repository={repository} />
          <View style={{ margin: 10 }}>
            <Pressable
              onPress={handleCreateReview}
              style={{
                backgroundColor: '#0366d6',
                padding: 12,
                borderRadius: 5,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                Create a review
              </Text>
            </Pressable>
          </View>
        </>
      )}
    />
  );
};

export default SingleRepositoryView;
