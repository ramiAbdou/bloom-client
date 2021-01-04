import React from 'react';

import Loading from '@store/Loading.store';
import MainContent from '@templates/Main/Content';
import DirectoryStore from './Directory.store';
import DirectoryCardContainer from './DirectoryCardContainer';
import DirectoryHeader from './DirectoryHeader';
import useFetchDirectory from './useFetchDirectory';

const DirectoryContent: React.FC = () => {
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

const Directory: React.FC = () => (
  <Loading.Provider>
    <DirectoryStore.Provider>
      <DirectoryContent />
    </DirectoryStore.Provider>
  </Loading.Provider>
);

export default Directory;
