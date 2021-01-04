import React from 'react';

import MainContent from 'core/templates/Main/Content';
import Directory from './Directory.store';
import DirectoryCardContainer from './DirectoryCardContainer';
import DirectoryHeader from './DirectoryHeader';
import useFetchDirectory from './hooks/useFetchDirectory';

const DirectoryContent = () => {
  useFetchDirectory();

  return (
    <>
      <DirectoryHeader />

      <MainContent>
        <DirectoryCardContainer />
      </MainContent>
    </>
  );
};

export default () => (
  <Directory.Provider>
    <DirectoryContent />
  </Directory.Provider>
);
