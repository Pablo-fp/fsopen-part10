// src/components/Main.jsx
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar'; // Import AppBar
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight, // REMOVE THIS LINE
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;
