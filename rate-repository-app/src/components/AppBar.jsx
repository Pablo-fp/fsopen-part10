// src/components/AppBar.jsx
import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native'; // Added ScrollView for 10.7 later
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Text from './Text'; // Use custom Text component
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row'
  },
  scrollViewContent: {
    // To ensure tabs are laid out in a row within ScrollView
    flexDirection: 'row'
  },
  tab: {
    marginRight: 20, // Increased margin a bit
    paddingVertical: 5 // Add some vertical padding for better touch area
  },
  tabText: {
    color: 'white'
  }
});

// Optional: Create an AppBarTab component for reusability
const AppBarTab = ({ children, to, onPress }) => {
  const content = (
    <Text style={styles.tabText} fontWeight="bold" fontSize="subheading">
      {children}
    </Text>
  );

  if (to) {
    return (
      <Link to={to} component={Pressable} style={styles.tab}>
        {content}
      </Link>
    );
  }

  return (
    <Pressable onPress={onPress} style={styles.tab}>
      {content}
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/signin">Sign in</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
