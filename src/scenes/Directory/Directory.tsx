import React from 'react';

import MainContent from '@components/Main/Content';
import Header from './components/Header';
import DirectoryCardContainer from './containers/Card';
import Directory from './Directory.store';
import useFetchDirectory from './hooks/useFetchDirectory';

const DirectoryContent = () => {
  useFetchDirectory();

  return (
    <div>
      <Header />

      <MainContent>
        <DirectoryCardContainer />
      </MainContent>
    </div>
  );
};

export default () => (
  <Directory.Provider>
    <DirectoryContent />
  </Directory.Provider>
);
