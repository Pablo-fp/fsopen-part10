// src/components/RepositoryItem.jsx
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import theme from '../theme';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10
  },
  info: {
    flex: 1
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 5
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  stat: {
    alignItems: 'center'
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

const RepositoryItem = ({ item, showGitHubButton }) => {
  const openGitHub = () => {
    Linking.openURL(item.url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={{ fontWeight: 'bold' }}>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text>{item.stargazersCount}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text>{item.forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      {showGitHubButton && (
        <Pressable style={styles.button} onPress={openGitHub}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
