import React, { useEffect, useState } from 'react';

import SearchBar from '@molecules/SearchBar/SearchBar';
import Loading from '@store/Loading.store';
import Directory from './Directory.store';

const DirectorySearchBar = () => {
  const [value, setValue] = useState('');
  const loading = Loading.useStoreState((store) => store.loading);

  const setSearchString = Directory.useStoreActions(
    (store) => store.setSearchString
  );

  useEffect(() => {
    const timeout = setTimeout(() => setSearchString(value), 300);
    return () => clearTimeout(timeout);
  }, [value]);

  // Only show if not loading.
  if (loading) return null;

  return (
    <SearchBar
      placeholder="Search members..."
      value={value}
      onChange={setValue}
    />
  );
};

export default DirectorySearchBar;
