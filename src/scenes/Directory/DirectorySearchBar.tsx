import React, { useEffect, useState } from 'react';

import SearchBar from '@molecules/SearchBar/SearchBar';
import ListStore from '@organisms/List/List.store';

const DirectorySearchBar = () => {
  const [value, setValue] = useState('');

  const setSearchString = ListStore.useStoreActions(
    (store) => store.setSearchString
  );

  useEffect(() => {
    const timeout = setTimeout(() => setSearchString(value), 300);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <SearchBar
      placeholder="Search members..."
      value={value}
      onChange={setValue}
    />
  );
};

export default DirectorySearchBar;
