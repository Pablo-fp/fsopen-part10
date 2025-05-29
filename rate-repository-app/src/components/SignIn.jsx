// src/components/SignIn.jsx
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import Text from './Text'; // Your custom Text component
import FormikTextInput from './FormikTextInput'; // We will create this for reusability, or use TextInput directly

// For better reusability with Formik and styling, let's create a FormikTextInput.
// You can put this in a new file src/components/FormikTextInput.jsx or define TextInput directly here.
// For now, let's define how we'd use TextInput directly and then consider FormikTextInput.

// If using TextInput directly with Formik:
import { TextInput } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.repositoryItemBackground // White background for the form area
  },
  inputField: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary, // Default border color
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: theme.fontSizes.body
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold
  }
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        // For exercise 10.9, we will add onBlur={formik.handleBlur('username')}
        // and check formik.touched.username && formik.errors.username for error styling
      />
      <TextInput
        style={styles.inputField}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
        // For exercise 10.9, we will add onBlur={formik.handleBlur('password')}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
    // Later, you'll handle actual sign-in logic here
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
