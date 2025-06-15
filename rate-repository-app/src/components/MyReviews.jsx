import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import Text from './Text';
import { GET_CURRENT_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8'
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
  repoName: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  date: {
    color: '#586069',
    fontSize: 14,
    marginBottom: 4
  },
  reviewText: {
    fontSize: 15,
    color: '#24292e'
  }
});

const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.ratingCircle}>
      <Text style={styles.ratingText}>{review.rating}</Text>
    </View>
    <View style={styles.reviewContent}>
      <Text style={styles.repoName}>{review.repository.fullName}</Text>
      <Text style={styles.date}>
        {format(new Date(review.createdAt), 'dd.MM.yyyy')}
      </Text>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  </View>
);

const MyReviews = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default MyReviews;