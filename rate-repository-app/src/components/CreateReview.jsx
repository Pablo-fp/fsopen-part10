import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-native';
import { useMutation } from '@apollo/client';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import { CREATE_REVIEW } from '../graphql/mutations'; // <-- Import the mutation here

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'flex-start'
  },
  input: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: yup.string().optional()
});

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const onSubmit = async (values, { setSubmitting }) => {
    setErrorMessage('');
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await createReview({
        variables: {
          ownerName,
          repositoryName,
          rating: Number(rating),
          text,
        },
        // Optionally, you can add refetchQueries here if your SingleRepositoryView is designed to refetch:
        // refetchQueries: [
        //   {
        //     query: GET_REPOSITORY,
        //     variables: { id: data?.createReview?.repositoryId },
        //   },
        // ],
        // awaitRefetchQueries: true,
      });

      if (data?.createReview?.repositoryId) {
        // Navigate to the repository view after successful creation
        navigate(`/repositories/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      // Show a user-friendly error if already reviewed
      if (
        e?.graphQLErrors?.[0]?.extensions?.code === 'REPOSITORY_ALREADY_REVIEWED'
      ) {
        setErrorMessage('You have already reviewed this repository.');
      } else {
        setErrorMessage('Error creating review. Please try again.');
      }
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        ownerName: state.ownerName || '',
        repositoryName: state.repositoryName || '',
        rating: '',
        text: ''
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          {errorMessage ? (
            <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>
          ) : null}
          <FormikTextInput
            name="ownerName"
            placeholder="Repository owner name"
            style={styles.input}
          />
          <FormikTextInput
            name="repositoryName"
            placeholder="Repository name"
            style={styles.input}
          />
          <FormikTextInput
            name="rating"
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
            style={styles.input}
          />
          <FormikTextInput
            name="text"
            placeholder="Review"
            multiline
            style={[styles.input, { height: 80 }]}
          />
          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default CreateReview;
