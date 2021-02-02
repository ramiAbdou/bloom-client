import React, { useEffect, useState } from 'react';

import SearchBar, { SearchBarProps } from '@molecules/SearchBar/SearchBar';
import ListStore from './List.store';

const ListSearchBar: React.FC<Pick<SearchBarProps, 'placeholder' | 'show'>> = (
  props
) => {
  const [value, setValue] = useState('');

  const setSearchString = ListStore.useStoreActions(
    (store) => store.setSearchString
  );

  useEffect(() => {
    const timeout = setTimeout(() => setSearchString(value), 300);
    return () => clearTimeout(timeout);
  }, [value]);

  return <SearchBar value={value} onChange={setValue} {...props} />;
};

export default ListSearchBar;
