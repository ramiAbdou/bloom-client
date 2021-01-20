import React, { useEffect, useState } from 'react';

import SearchBar, { SearchBarProps } from '@molecules/SearchBar/SearchBar';
import ListStore from './List.store';

const ListSearchBar: React.FC<Pick<SearchBarProps, 'placeholder'>> = ({
  placeholder
}) => {
  const [value, setValue] = useState('');

  const setSearchString = ListStore.useStoreActions(
    (store) => store.setSearchString
  );

  useEffect(() => {
    const timeout = setTimeout(() => setSearchString(value), 300);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <SearchBar placeholder={placeholder} value={value} onChange={setValue} />
  );
};

export default ListSearchBar;
