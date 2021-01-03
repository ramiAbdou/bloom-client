import React from 'react';

import MainHeader from '@components/Main/Header';
import DirectoryHeaderSearchBar from './components/SearchBar';
import Directory from './Directory.store';

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
      <DirectoryHeaderSearchBar />
    </MainHeader>
  );
};

export default DirectoryHeader;
