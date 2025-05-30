// src/theme.js
import { Platform } from 'react-native'; // Import Platform

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBarBackground: '#24292e',
    mainBackground: '#e1e4e8',
    repositoryItemBackground: 'white',
    error: '#d73a4a'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 20
  },
  fonts: {
    main: Platform.select({
      // Use Platform.select
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700'
  }
};

export default theme;
