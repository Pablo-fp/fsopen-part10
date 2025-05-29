// src/components/FormikTextInput.jsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useField } from 'formik';
import { TextInput as NativeTextInput } from 'react-native'; // Using NativeTextInput
import Text from './Text'; // Your custom Text component
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: -5,
    marginBottom: 10,
    color: theme.colors.error
  },
  inputField: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    paddingVertical: 10, // Adjusted padding
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: theme.fontSizes.body,
    // Ensure you have a height or sufficient padding for the text input to be visible
    height: 40 // Or adjust paddingVertical
  },
  inputError: {
    borderColor: theme.colors.error
  }
});

const FormikTextInput = ({ name, style, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View>
      <NativeTextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        style={[
          styles.inputField,
          showError && styles.inputError,
          style // Allow passing additional styles
        ]}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;
