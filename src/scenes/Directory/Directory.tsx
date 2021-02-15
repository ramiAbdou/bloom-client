import React from 'react';

import { LoadingProps } from '@constants';
import MainContent from '@containers/Main/MainContent';
import MainHeader from '@containers/Main/MainHeader';
import ListStore from '@organisms/List/List.store';
import ListSearchBar from '@organisms/List/ListSearchBar';
import DirectoryCardList from './DirectoryCardList';
import useInitDirectory from './useInitDirectory';

const DirectoryHeader: React.FC<LoadingProps> = ({ loading }) => {
  const numResults = ListStore.useStoreState((store) => store.numResults);

  return (
    <MainHeader
      headerTag={`${numResults} Members`}
      loading={loading}
      title="Directory"
    >
      <ListSearchBar />
    </MainHeader>
  );
};

const Directory: React.FC = () => {
  const loading = useInitDirectory();

  return (
    <ListStore.Provider>
      <MainContent>
        <DirectoryHeader loading={loading} />
        {!loading && <DirectoryCardList />}
      </MainContent>
    </ListStore.Provider>
  );
};

export default Directory;
