import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';

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
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required')
});

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [errorMessage, setErrorMessage] = useState('');
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    setErrorMessage('');
    const { username, password } = values;
    try {
      await createUser({ variables: { user: { username, password } } });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      setErrorMessage('Sign up failed. Please try another username.');
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: ''
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
            name="username"
            placeholder="Username"
            style={styles.input}
          />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
          <FormikTextInput
            name="passwordConfirmation"
            placeholder="Password confirmation"
            secureTextEntry
            style={styles.input}
          />
          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;