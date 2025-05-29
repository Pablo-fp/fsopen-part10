// src/components/SignIn.jsx
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik'; // Use Formik component for validationSchema
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput'; // Use the new component
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.repositoryItemBackground
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10 // Add some margin above button
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold
  }
});

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

// SignInForm now uses Formik component directly
const SignInForm = ({ onSubmit }) => {
  return (
    // No need for useFormik hook directly if using <Formik> component
    // However, the example text used useFormik with validationSchema.
    // Let's stick to useFormik as per the text structure:
    // This means SignInForm would become a bit more complex if we want to use <Formik>
    // To keep it simple and aligned with the previous structure of useFormik:
    // We'll pass formik instance to FormikTextInput if not using useField
    // OR FormikTextInput will use useField as implemented above.
    // The useField approach in FormikTextInput is cleaner.
    // We need to wrap the form content in <Formik> for useField to work.

    // Let's define the SignInContainer that uses the Formik component
    // This approach is more standard when using `useField` in custom inputs.
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable style={styles.button} onPress={onSubmit}>
        {/* Note: 'onSubmit' here is from Formik's handleSubmit, not the prop passed to SignInForm */}
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
