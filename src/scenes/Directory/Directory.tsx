import React from 'react';

import { LoadingProps } from '@constants';
import MainContent from '@containers/Main/MainContent';
import MainHeader from '@containers/Main/MainHeader';
import useQuery from '@hooks/useQuery';
import ListStore from '@organisms/List/List.store';
import ListSearchBar from '@organisms/List/ListSearchBar';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { GET_DIRECTORY, GET_DIRECTORY_QUESTIONS } from './Directory.gql';
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
  const { data: data1 } = useQuery<ICommunity>({
    name: 'getDirectory',
    query: GET_DIRECTORY,
    schema: [Schema.MEMBER]
  });

  const { data: data2 } = useQuery<ICommunity>({
    name: 'getQuestions',
    query: GET_DIRECTORY_QUESTIONS,
    schema: [Schema.QUESTION]
  });

  const loading = !data1 && !data2;

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
