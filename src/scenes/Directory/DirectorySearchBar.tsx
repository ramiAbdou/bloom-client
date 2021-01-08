import React, { useEffect, useState } from 'react';

import SearchBar from '@molecules/SearchBar/SearchBar';
import Directory from './Directory.store';

const DirectorySearchBar = () => {
  const [value, setValue] = useState('');

  const setSearchString = Directory.useStoreActions(
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
