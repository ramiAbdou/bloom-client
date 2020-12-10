import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import Header from './components/Header';
import MemberCardContainer from './components/MemberCard/MemberCard.container';
import { GET_DIRECTORY } from './Directory.gql';
import DirectoryStore from './Directory.store';

export default () => {
  const mergeEntities = useStoreActions((store) => store.mergeEntities);

  const { data, loading } = useQuery(GET_DIRECTORY);

  useEffect(() => {
    const result = data?.getDirectory;
    if (!result) return;

    // Destructure the result data.
    const { members, questions } = result;

    mergeEntities({
      data: { ...result, members, questions },
      schema: Schema.COMMUNITY
    });
  }, [data]);

  return (
    <DirectoryStore.Provider>
      <div>
        <Header loading={loading} />
        <div className="s-home-content">
          {!loading && <MemberCardContainer />}
        </div>
      </div>
    </DirectoryStore.Provider>
  );
};
