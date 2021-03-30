import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useManualQuery from '@hooks/useManualQuery';
import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import useLoader from '@organisms/Loader/useLoader';
import {
  IApplication,
  ICommunity,
  IMemberPlan,
  IRankedQuestion
} from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { UrlNameProps } from '@util/constants';
import { QueryEvent } from '@util/constants.events';

interface CommunityIdArgs {
  communityId: string;
}

const useInitApplication = (): Pick<QueryResult, 'error' | 'loading'> => {
  const setActiveEntities = useStoreActions(({ db }) => db.setActiveEntities);
  const { urlName } = useParams() as UrlNameProps;

  const { data, error, loading: loading1 } = useQuery<ICommunity, UrlNameProps>(
    {
      fields: [
        'autoAccept',
        'id',
        'logoUrl',
        'name',
        'primaryColor',
        'urlName'
      ],
      operation: QueryEvent.GET_COMMUNITY,
      schema: Schema.COMMUNITY,
      types: { urlName: { required: false } },
      variables: { urlName }
    }
  );

  const [getApplication, { loading: loading2 }] = useManualQuery<
    IApplication,
    CommunityIdArgs
  >({
    fields: ['description', 'id', 'title', { community: ['id'] }],
    operation: QueryEvent.GET_APPLICATION,
    schema: Schema.APPLICATION,
    types: { communityId: { required: true } }
  });

  const [getCommunityIntegrations, { loading: loading3 }] = useManualQuery<
    IApplication,
    CommunityIdArgs
  >({
    fields: ['id', 'stripeAccountId', { community: ['id'] }],
    operation: QueryEvent.GET_COMMUNITY_INTEGRATIONS,
    schema: Schema.COMMUNITY_INTEGRATIONS,
    types: { communityId: { required: true } }
  });

  const [getRankedQuestions, { loading: loading4 }] = useManualQuery<
    IRankedQuestion[],
    CommunityIdArgs
  >({
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
    operation: QueryEvent.LIST_RANKED_QUESTIONS,
    schema: [Schema.APPLICATION_QUESTION],
    types: { communityId: { required: false } }
  });

  const [listMemberPlans, { loading: loading5 }] = useManualQuery<
    IMemberPlan[],
    CommunityIdArgs
  >({
    fields: [
      'amount',
      'id',
      'isFree',
      'name',
      'recurrence',
      { community: ['id'] }
    ],
    operation: QueryEvent.LIST_MEMBER_PLANS,
    schema: [Schema.MEMBER_PLAN],
    types: { communityId: { required: false } }
  });

  const communityId: string = data?.id;

  useEffect(() => {
    if (!communityId) return;

    setActiveEntities({ id: communityId, table: 'communities' });

    (async () => {
      await Promise.all([
        getApplication({ communityId }),
        getCommunityIntegrations({ communityId }),
        listMemberPlans({ communityId }),
        getRankedQuestions({ communityId })
      ]);
    })();
  }, [communityId]);

  const loading: boolean =
    loading1 || loading2 || loading3 || loading4 || loading5;

  useLoader(loading);

  return { error, loading };
};

export default useInitApplication;
