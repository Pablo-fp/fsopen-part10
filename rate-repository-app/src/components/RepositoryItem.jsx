// src/components/RepositoryItem.jsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text'; // Custom Text component
import theme from '../theme';
import { formatCount } from '../utils/formatters'; // Adjust path if needed

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.repositoryItemBackground, // White background for item
    padding: 15
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5, // Or 25 for circular
    marginRight: 15
  },
  infoContainer: {
    flex: 1, // Takes remaining space
    justifyContent: 'space-around' // Distribute space within info
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    alignSelf: 'flex-start', // Important for background to wrap text
    marginTop: 5,
    overflow: 'hidden' // For borderRadius on Android
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute stats evenly
    marginTop: 10
  },
  statItem: {
    alignItems: 'center' // Center text within each stat item
  }
  // No specific styles needed for Text components if props are used
});

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.infoContainer}>
          <Text fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text style={styles.languageTag}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(item.reviewCount)}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(item.ratingAverage)}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
