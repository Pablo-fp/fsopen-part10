import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
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
    flexDirection: 'row'
  },
  tab: {
    color: 'white',
    marginRight: 15,
    fontWeight: 'bold'
  }
});

const AppBarTab = ({ to, children }) => (
  <Link to={to}>
    <Text style={styles.tab}>{children}</Text>
  </Link>
);

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const user = data?.me;

  const onSignOut = async () => {
    // 1. Remove the token from storage
    await authStorage.removeAccessToken();
    // 2. Reset the Apollo Client store
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {user ? (
          <Pressable onPress={onSignOut}>
            <Text style={styles.tab}>Sign Out</Text>
          </Pressable>
        ) : (
          <AppBarTab to="/signin">Sign In</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
