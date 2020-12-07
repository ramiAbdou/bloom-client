import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import Spinner from '@components/Loader/Spinner';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_DIRECTORY } from '../Directory.gql';

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
    <div className="s-home-header">
      <div>
        <h1 className="s-home-header-title">Directory</h1>
        {loading && <Spinner dark />}
      </div>
    </div>
  );
};
