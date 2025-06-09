import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactNativePlugin from 'eslint-plugin-react-native';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        // Add browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      react: reactPlugin,
      'react-native': reactNativePlugin
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jest/recommended'
    ],
    rules: {
      'no-unused-vars': 'warn',
      'react/prop-types': 'off'
    }
  }
];
