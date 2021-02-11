import React from 'react';

import { LoadingProps } from '@constants';
import MainContent from '@containers/Main/MainContent';
import MainHeader from '@containers/Main/MainHeader';
import useQuery from '@hooks/useQuery';
import ListStore from '@organisms/List/List.store';
import ListSearchBar from '@organisms/List/ListSearchBar';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { GET_DIRECTORY } from './Directory.gql';
import DirectoryCardList from './DirectoryCardList';

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
  const { loading } = useQuery<ICommunity>({
    operation: 'getDirectory',
    query: GET_DIRECTORY,
    schema: [Schema.MEMBER]
  });

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
