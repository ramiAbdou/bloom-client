import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import Header from './components/Header';
import MemberCardContainer from './components/MemberCard/MemberCard.container';
import { GET_DIRECTORY } from './Directory.gql';

export default () => {
  const updateEntities = useStoreActions((store) => store.updateEntities);

  const { data, loading } = useQuery(GET_DIRECTORY);

  useEffect(() => {
    const result = data?.getDirectory;
    if (!result) return;

    updateEntities({
      data: {
        ...result,
        members: result.memberships,
        membershipQuestions: result.questions
      },
      schema: Schema.COMMUNITY
    });
  }, [data]);

  return (
    <div className="s-directory">
      <Header loading={loading} />
      {!loading && <MemberCardContainer />}
    </div>
  );
};
