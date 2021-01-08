import React from 'react';

import MainContent from '@containers/Main/MainContent';
import useQuery from '@hooks/useQuery';
import { ICommunity } from '@store/entities';
import LoadingStore from '@store/Loading.store';
import { Schema } from '@store/schema';
import { GET_DIRECTORY } from './Directory.gql';
import DirectoryStore from './Directory.store';
import DirectoryCardContainer from './DirectoryCardContainer';
import DirectoryHeader from './DirectoryHeader';

const DirectoryContent: React.FC = () => {
  const { loading } = useQuery<ICommunity>({
    name: 'getDirectory',
    query: GET_DIRECTORY,
    schema: Schema.COMMUNITY
  });

  return (
    <>
      <DirectoryHeader />

      <MainContent loading={loading}>
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
