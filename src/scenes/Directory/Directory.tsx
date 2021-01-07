import React from 'react';

import MainContent from '@containers/Main/MainContent';
import LoadingStore from '@store/Loading.store';
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
  <LoadingStore.Provider>
    <DirectoryStore.Provider>
      <DirectoryContent />
    </DirectoryStore.Provider>
  </LoadingStore.Provider>
);

export default Directory;
