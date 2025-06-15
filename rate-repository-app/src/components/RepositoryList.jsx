import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';

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

const RepositoryList = () => {
  const [sort, setSort] = useState(SORT_OPTIONS[0].value);

  // Pass the sorting variables directly to the hook
  const { repositories } = useRepositories({
    orderBy: sort.orderBy,
    orderDirection: sort.orderDirection,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      ListHeaderComponent={
        <View style={{ backgroundColor: 'white', padding: 10 }}>
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
      }
    />
  );
};

export default RepositoryList;
