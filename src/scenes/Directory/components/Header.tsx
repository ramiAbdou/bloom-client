import React, { useEffect, useState } from 'react';

import SearchBar from '@components/Elements/SearchBar/SearchBar';
import MainHeader from '@components/Main/Header';
import Directory from '../Directory.store';

const SearchContainer = () => {
  const [value, setValue] = useState('');
  const loading = Directory.useStoreState((store) => store.loading);

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

const DirectoryHeader = () => {
  const loading = Directory.useStoreState((store) => store.loading);
  const numMembers = Directory.useStoreState((store) => store.numMembers);

  return (
    <MainHeader
      className="s-directory-header"
      loading={loading}
      numberTag={`${numMembers} Members`}
      title="Directory"
    >
      <SearchContainer />
    </MainHeader>
  );
};

export default DirectoryHeader;
