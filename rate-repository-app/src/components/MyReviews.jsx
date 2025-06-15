import React from 'react';
import { View, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { format } from 'date-fns';
import Text from './Text';
import { GET_CURRENT_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useQuery } from '@apollo/client';

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  viewButton: {
    backgroundColor: '#0366d6',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center'
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

const ReviewItem = ({ review, onViewRepository, onDelete }) => (
  <View style={{ backgroundColor: 'white', padding: 15, marginBottom: 10 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={{
          width: 45,
          height: 45,
          borderRadius: 22.5,
          borderWidth: 3,
          borderColor: '#0366d6',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 15
        }}
      >
        <Text style={{ color: '#0366d6', fontWeight: 'bold', fontSize: 18 }}>
          {review.rating}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text fontWeight="bold">{review.repository.fullName}</Text>
        <Text color="textSecondary">
          {format(new Date(review.createdAt), 'dd.MM.yyyy')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
    <View style={styles.buttonRow}>
      <Pressable style={styles.viewButton} onPress={onViewRepository}>
        <Text style={styles.buttonText}>View repository</Text>
      </Pressable>
      <Pressable style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.buttonText}>Delete review</Text>
      </Pressable>
    </View>
  </View>
);

const MyReviews = () => {
  const { data, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true }
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  if (!data?.me?.reviews) return null;

  const reviews = data.me.reviews.edges.map((edge) => edge.node);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReview({ variables: { id } });
              refetch();
            } catch (e) {
              Alert.alert('Error', 'Could not delete review.');
            }
          }
        }
      ]
    );
  };

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onViewRepository={() =>
            navigate(`/repositories/${item.repository.id}`)
          }
          onDelete={() => handleDelete(item.id)}
        />
      )}
    />
  );
};

export default MyReviews;
