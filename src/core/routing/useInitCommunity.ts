import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useQuery from '@hooks/useQuery';
import useLoader from '@organisms/Loader/useLoader';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import {
  GET_COMMUNITY,
  GET_INTEGRATIONS,
  GET_MEMBER,
  GET_QUESTIONS,
  GET_TYPES
} from './Router.gql';

const useInitCommunity = (): boolean => {
  const activeUrlName = useStoreState(({ db }) => db.community?.urlName);
  const setActive = useStoreActions(({ db }) => db.setActive);

  const { push } = useHistory();

  const { data: data1, loading: loading1 } = useQuery({
    name: 'getCommunity',
    query: GET_COMMUNITY,
    schema: Schema.COMMUNITY
  });

  const { loading: loading2 } = useQuery({
    name: 'getIntegrations',
    query: GET_INTEGRATIONS,
    schema: Schema.COMMUNITY_INTEGRATIONS
  });

  const { data: data3, loading: loading3 } = useQuery({
    name: 'getMember',
    query: GET_MEMBER,
    schema: Schema.MEMBER
  });

  const { loading: loading4 } = useQuery({
    name: 'getQuestions',
    query: GET_QUESTIONS,
    schema: [Schema.QUESTION]
  });

  const { loading: loading5 } = useQuery({
    name: 'getTypes',
    query: GET_TYPES,
    schema: [Schema.MEMBER_TYPE]
  });

  useEffect(() => {
    if (data1) setActive({ id: data1.id, table: 'communities' });
  }, [data1]);

  useEffect(() => {
    if (data3) setActive({ id: data3.id, table: 'members' });
  }, [data3]);

  useEffect(() => {
    if (activeUrlName) push(`/${activeUrlName}`);
  }, [activeUrlName]);

  const loading = loading1 || loading2 || loading3 || loading4 || loading5;
  useLoader(loading);

  return loading;
};

export default useInitCommunity;
