// src/components/SignIn.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native'; // Added View and StyleSheet for basic centering
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text fontSize="heading">The sign-in view</Text>
      {/* The form will be added in Exercise 10.8 */}
    </View>
  );
};

export default SignIn;
