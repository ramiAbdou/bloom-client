import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_DUES_INFORMATION, GetDuesInformationResult } from './Payment.gql';

export default function useFetchDuesInformation(): boolean {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { data, loading } = useQuery<GetDuesInformationResult>({
    name: 'getDuesInformation',
    query: GET_DUES_INFORMATION
  });

  useEffect(() => {
    if (!data) return;
    const { stripeAccountId, types } = data;

    mergeEntities({
      data: { integrations: { stripeAccountId }, types },
      schema: {
        integrations: Schema.INTEGRATIONS,
        types: [Schema.MEMBER_TYPE]
      }
    });
  }, [data]);

  return loading;
}
