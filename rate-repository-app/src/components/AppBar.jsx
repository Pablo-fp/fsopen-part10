import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link, useLocation, matchPath } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';

import Text from './Text';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingBottom: 15,
    paddingLeft: 10,
    width: '100%', // Occupy full width
  },
  tabContainer: {
    flexDirection: 'row', // Tab navigation is horizontal
  },
  tab: {
    color: 'white',
    marginRight: 15,
    fontWeight: 'bold'
  }
});

const AppBarTab = ({ to, children, onPress }) => (
  <Link to={to} onPress={onPress}>
    <Text style={styles.tab}>{children}</Text>
  </Link>
);

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const user = data?.me;

  const location = useLocation();
  const isSingleRepo = matchPath('/repositories/:id', location.pathname);

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabContainer}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {user && isSingleRepo && (
          <AppBarTab to="#" style={{ opacity: 0.5, pointerEvents: 'none' }}>
            Create a review
          </AppBarTab>
        )}
        {user && <AppBarTab to="/my-reviews">My reviews</AppBarTab>}
        {user ? (
          <AppBarTab to="/" onPress={onSignOut}>Sign Out</AppBarTab>
        ) : (
          <>
            <AppBarTab to="/signin">Sign In</AppBarTab>
            <AppBarTab to="/signup">Sign up</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
