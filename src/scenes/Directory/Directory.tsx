import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import MemberCardContainer from './components/Card/Card.container';
import Header from './components/Header';
import { GET_DIRECTORY } from './Directory.gql';
import Directory from './Directory.store';

const useFetchDirectory = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const currentLoading = Directory.useStoreState((store) => store.loading);
  const setLoading = Directory.useStoreActions((store) => store.setLoading);

  const { data, loading } = useQuery(GET_DIRECTORY);

  useEffect(() => {
    if (loading !== currentLoading) setLoading(loading);
  }, [loading]);

  useEffect(() => {
    const { id, members, questions } = data?.getDirectory ?? {};
    if (!id) return;

    mergeEntities({
      data: { id, members, questions },
      schema: Schema.COMMUNITY
    });
  }, [data]);
};

const DirectoryContent = () => {
  useFetchDirectory();

  return (
    <div>
      <Header />
      <MemberCardContainer />
    </div>
  );
};

export default () => (
  <Directory.Provider>
    <DirectoryContent />
  </Directory.Provider>
);
