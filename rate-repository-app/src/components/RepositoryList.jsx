import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
    borderColor: '#e1e4e8',
    borderWidth: 1,
  },
});

const SORT_OPTIONS = [
  {
    label: 'Latest repositories',
    value: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  },
  {
    label: 'Highest rated repositories',
    value: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  },
  {
    label: 'Lowest rated repositories',
    value: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
  },
];

const RepositoryListHeader = ({ searchKeyword, setSearchKeyword, sort, setSort }) => (
  <View>
    <TextInput
      style={styles.searchInput}
      placeholder="Search"
      value={searchKeyword}
      onChangeText={setSearchKeyword}
      autoCapitalize="none"
      autoCorrect={false}
      testID="repositorySearchInput"
    />
    <Picker
      selectedValue={JSON.stringify(sort)}
      onValueChange={(itemValue) => setSort(JSON.parse(itemValue))}
    >
      {SORT_OPTIONS.map((option) => (
        <Picker.Item
          key={option.label}
          label={option.label}
          value={JSON.stringify(option.value)}
        />
      ))}
    </Picker>
  </View>
);

const RepositoryList = () => {
  const [sort, setSort] = useState(SORT_OPTIONS[0].value);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories } = useRepositories({
    orderBy: sort.orderBy,
    orderDirection: sort.orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      ListHeaderComponent={
        <RepositoryListHeader
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          sort={sort}
          setSort={setSort}
        />
      }
    />
  );
};

export default RepositoryList;
