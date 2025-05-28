// src/components/RepositoryItem.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  fullName: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  description: {
    marginBottom: 5
  },
  language: {
    backgroundColor: '#0366d6', // Example blue color
    color: 'white',
    padding: 5,
    borderRadius: 3,
    alignSelf: 'flex-start', // So the background only covers the text
    marginBottom: 5,
    overflow: 'hidden' // Ensures borderRadius is respected on Android
  },
  countsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Or 'space-between'
    marginTop: 5
  },
  countItem: {
    alignItems: 'center'
  },
  countText: {
    fontWeight: 'bold'
  }
  // Add more styles as needed for padding, margins, etc.
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fullName}>{item.fullName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.language}>{item.language}</Text>
      <View style={styles.countsContainer}>
        <View style={styles.countItem}>
          <Text style={styles.countText}>{item.stargazersCount}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.countItem}>
          <Text style={styles.countText}>{item.forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.countItem}>
          <Text style={styles.countText}>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.countItem}>
          <Text style={styles.countText}>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
