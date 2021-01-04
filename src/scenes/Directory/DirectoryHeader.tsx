import MainHeader from 'core/templates/Main/Header';
import React from 'react';

import Directory from './Directory.store';
import DirectoryHeaderSearchBar from './DirectorySearchBar';

const DirectoryHeader = () => {
  const numMembers = Directory.useStoreState((store) => store.numMembers);

  return (
    <MainHeader
      className="s-directory-header"
      numberTag={`${numMembers} Members`}
      title="Directory"
    >
      <DirectoryHeaderSearchBar />
    </MainHeader>
  );
};

export default DirectoryHeader;
