import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight, // Keep this for now, will be removed in 10.4
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground // Use theme color
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <RepositoryList />
    </View>
  );
};

export default Main;
// This component serves as the main entry point for the Rate Repository application.
