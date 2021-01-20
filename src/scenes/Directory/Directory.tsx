import React from 'react';

import { LoadingProps } from '@constants';
import { MainContent, MainHeader } from '@containers/Main';
import useQuery from '@hooks/useQuery';
import ListStore from '@organisms/List/List.store';
import { ICommunity } from '@store/entities';
import { Schema } from '@store/schema';
import { GET_DIRECTORY } from './Directory.gql';
import DirectoryCardContainer from './DirectoryCardContainer';
import DirectoryHeaderSearchBar from './DirectorySearchBar';

const DirectoryHeader: React.FC<LoadingProps> = ({ loading }) => {
  const numResults = ListStore.useStoreState((store) => store.numResults);

  return (
    <MainHeader
      className="s-directory-header"
      headerTag={`${numResults} Members`}
      loading={loading}
      title="Directory"
    >
      <DirectoryHeaderSearchBar />
    </MainHeader>
  );
};

const Directory: React.FC = () => {
  const { loading } = useQuery<ICommunity>({
    name: 'getDirectory',
    query: GET_DIRECTORY,
    schema: Schema.COMMUNITY
  });

  return (
    <ListStore.Provider>
      <MainContent Header={DirectoryHeader} loading={loading}>
        <DirectoryCardContainer />
      </MainContent>
    </ListStore.Provider>
  );
};

export default Directory;
