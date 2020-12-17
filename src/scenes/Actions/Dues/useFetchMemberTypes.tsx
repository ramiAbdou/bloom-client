import { useQuery } from 'graphql-hooks';
import { useEffect } from 'react';

import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_MEMBER_TYPES } from './Dues.gql';

export default () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { data, loading } = useQuery(GET_MEMBER_TYPES);

  useEffect(() => {
    const result = data?.getMemberTypes;
    if (!result) return;

    mergeEntities({
      communityReferenceColumn: 'types',
      data: result,
      schema: [Schema.MEMBER_TYPE]
    });
  }, [data]);

  return loading;
};
