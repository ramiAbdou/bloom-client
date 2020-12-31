import React from 'react';

import Header from './components/Header';
import DirectoryCardContainer from './containers/Card';
import Directory from './Directory.store';
import useFetchDirectory from './hooks/useFetchDirectory';

const DirectoryContent = () => {
  useFetchDirectory();

  return (
    <div>
      <Header />
      <DirectoryCardContainer />
    </div>
  );
};

export default () => (
  <Directory.Provider>
    <DirectoryContent />
  </Directory.Provider>
);
