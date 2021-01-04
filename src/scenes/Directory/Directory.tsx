import React from 'react';

import Loading from '@store/Loading.store';
import MainContent from '@templates/Main/Content';
import Directory from './Directory.store';
import DirectoryCardContainer from './DirectoryCardContainer';
import DirectoryHeader from './DirectoryHeader';
import useFetchDirectory from './useFetchDirectory';

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
  <Loading.Provider>
    <Directory.Provider>
      <DirectoryContent />
    </Directory.Provider>
  </Loading.Provider>
);
