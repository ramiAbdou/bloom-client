import React from 'react';

import { LoadingProps } from '@constants';
import { MainContent, MainHeader } from '@containers/Main';
import useQuery from '@hooks/useQuery';
import { ICommunity } from '@store/entities';
import { Schema } from '@store/schema';
import { GET_DIRECTORY } from './Directory.gql';
import DirectoryStore from './Directory.store';
import DirectoryCardContainer from './DirectoryCardContainer';
import DirectoryHeaderSearchBar from './DirectorySearchBar';

const DirectoryHeader: React.FC<LoadingProps> = ({ loading }) => {
  const numMembers = DirectoryStore.useStoreState((store) => store.numMembers);

  return (
    <MainHeader
      className="s-directory-header"
      headerTag={`${numMembers} Members`}
      loading={loading}
      title="Directory"
    >
      <DirectoryHeaderSearchBar />
    </MainHeader>
  );
};

const DirectoryContent: React.FC = () => {
  const { loading } = useQuery<ICommunity>({
    name: 'getDirectory',
    query: GET_DIRECTORY,
    schema: Schema.COMMUNITY
  });

  return (
    <MainContent Header={DirectoryHeader} loading={loading}>
      <DirectoryCardContainer />
    </MainContent>
  );
};

const Directory: React.FC = () => (
  <DirectoryStore.Provider>
    <DirectoryContent />
  </DirectoryStore.Provider>
);

export default Directory;
