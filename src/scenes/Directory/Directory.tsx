import React from 'react';

import MainContent from '@components/Main/Content';
import DirectoryCardContainer from './components/CardContainer';
import Header from './components/Header';
import Directory from './Directory.store';
import useFetchDirectory from './hooks/useFetchDirectory';

const DirectoryContent = () => {
  useFetchDirectory();

  return (
    <>
      <Header />

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
