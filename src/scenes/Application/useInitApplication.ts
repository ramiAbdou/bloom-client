import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import useLoader from '@organisms/Loader/useLoader';
import { IApplication, IMemberPlan, IRankedQuestion } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { UrlNameProps } from '@util/constants';

const useInitApplication = (): Pick<QueryResult, 'error' | 'loading'> => {
  const setActive = useStoreActions(({ db }) => db.setActive);
  const { urlName } = useParams() as UrlNameProps;

  const { data, error, loading: loading1 } = useQuery<
    IApplication,
    UrlNameProps
  >({
    fields: [
      'description',
      'id',
      'title',
      {
        community: [
          'autoAccept',
          'id',
          'logoUrl',
          'name',
          'primaryColor',
          'urlName',
          { integrations: ['stripeAccountId'] }
        ]
      }
    ],
    operation: 'getApplication',
    schema: Schema.APPLICATION,
    types: { urlName: { required: true } },
    variables: { urlName }
  });

  const { loading: loading2 } = useQuery<IRankedQuestion[], UrlNameProps>({
    fields: [
      'id',
      'rank',
      { application: ['id'] },
      {
        question: [
          'category',
          'description',
          'id',
          'options',
          'required',
          'title',
          'type',
          { community: ['id'] }
        ]
      }
    ],
    operation: 'getRankedQuestions',
    schema: [Schema.APPLICATION_QUESTION],
    types: { urlName: { required: false } },
    variables: { urlName }
  });

  const { loading: loading3 } = useQuery<IMemberPlan[]>({
    fields: [
      'amount',
      'id',
      'isFree',
      'name',
      'recurrence',
      { community: ['id'] }
    ],
    operation: 'getMemberPlans',
    schema: [Schema.MEMBER_PLAN],
    types: { urlName: { required: false } },
    variables: { urlName }
  });

  // @ts-ignore b/c community is entire entity, not ID.
  const communityId = data?.community?.id;

  useEffect(() => {
    if (communityId) setActive({ id: communityId, table: 'communities' });
  }, [communityId]);

  useLoader(loading1 || loading2 || loading3);

  return { error, loading: loading1 || loading2 || loading3 };
};

export default useInitApplication;
