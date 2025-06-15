import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    return this.props.ListHeaderComponent;
  };

  render() {
    const { repositories } = this.props;
    const navigate = this.props.navigate || (() => {});
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    const renderItem = ({ item }) => (
      <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
        <RepositoryItem item={item} />
      </Pressable>
    );

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

export default function RepositoryListContainerWithNavigation(props) {
  const navigate = useNavigate();
  return <RepositoryListContainer {...props} navigate={navigate} />;
}
