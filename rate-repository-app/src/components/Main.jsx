// src/components/Main.jsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepositoryView from './SingleRepositoryView';
import CreateReview from './CreateReview'; // Add this import
import SignUp from './SignUp'; // Add this import
import MyReviews from './MyReviews'; // Add this import
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repositories/:id" element={<SingleRepositoryView />} />
        <Route path="/create-review" element={<CreateReview />} /> {/* Add this line */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
