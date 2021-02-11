import { useEffect } from 'react';

import useManualQuery from '@hooks/useManualQuery';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import {
  GET_COMMUNITY,
  GET_INTEGRATIONS,
  GET_MEMBER,
  GET_QUESTIONS,
  GET_TYPES
} from '../store/Db/Db.gql';

const useInitCommunity = (): boolean => {
  const communityId = useStoreState(({ db }) => db.community?.id);
  const setActive = useStoreActions(({ db }) => db.setActive);

  const [getCommunity, { data: data1, loading: loading1 }] = useManualQuery({
    name: 'getCommunity',
    query: GET_COMMUNITY,
    schema: Schema.COMMUNITY
  });

  const [getIntegrations, { loading: loading2 }] = useManualQuery({
    name: 'getIntegrations',
    query: GET_INTEGRATIONS,
    schema: Schema.COMMUNITY_INTEGRATIONS
  });

  const [getMember, { data: data3, loading: loading3 }] = useManualQuery({
    name: 'getMember',
    query: GET_MEMBER,
    schema: Schema.MEMBER
  });

  const [getQuestions, { loading: loading4 }] = useManualQuery({
    name: 'getQuestions',
    query: GET_QUESTIONS,
    schema: [Schema.QUESTION]
  });

  const [getTypes, { loading: loading5 }] = useManualQuery({
    name: 'getTypes',
    query: GET_TYPES,
    schema: [Schema.MEMBER_TYPE]
  });

  useEffect(() => {
    (async () => {
      await Promise.all([
        getCommunity(),
        getIntegrations(),
        getMember(),
        getQuestions(),
        getTypes()
      ]);
    })();
  }, [communityId]);

  useEffect(() => {
    if (data1) setActive({ id: data1.id, table: 'communities' });
  }, [data1]);

  useEffect(() => {
    if (data3) setActive({ id: data3.id, table: 'members' });
  }, [data3]);

  return loading1 || loading2 || loading3 || loading4 || loading5;
};

export default useInitCommunity;
