// src/components/AppBar.jsx
import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native'; // Added ScrollView for 10.7 later
import Constants from 'expo-constants';
import Text from './Text'; // Use custom Text component
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10, // Add some padding below status bar
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.appBarBackground, // Use theme color
    flexDirection: 'row' // To lay out tabs horizontally
  },
  tab: {
    marginRight: 15 // Space between tabs
  },
  tabText: {
    color: 'white', // Or another color suitable for the app bar background
    fontWeight: theme.fontWeights.bold
  }
  // ... add more styles if needed
});

// Optional: Create an AppBarTab component for reusability
const AppBarTab = ({ children, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.tab}>
      <Text style={styles.tabText} fontWeight="bold" fontSize="subheading">
        {children}
      </Text>
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      {/* ScrollView will be used more actively in 10.7 */}
      <ScrollView horizontal>
        <AppBarTab onPress={() => console.log('Repositories pressed')}>
          Repositories
        </AppBarTab>
        {/* More tabs will be added in 10.6 */}
      </ScrollView>
    </View>
  );
};

export default AppBar;
