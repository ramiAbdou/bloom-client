import { useEffect } from 'react';

import useManualQuery from '@hooks/useManualQuery';
import { QueryResult } from '@hooks/useQuery.types';
import useLoader from '@organisms/Loader/useLoader';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/events';

const useInitCommunity = (): Partial<QueryResult> => {
  const communityId = useStoreState(({ db }) => db.community?.id);

  const [getCommunity, { loading: loading1 }] = useManualQuery({
    fields: [
      'autoAccept',
      'id',
      'logoUrl',
      'name',
      'primaryColor',
      'urlName',
      { highlightedQuestion: ['id'] }
    ],
    operation: QueryEvent.GET_COMMUNITY,
    schema: Schema.COMMUNITY
  });

  const [getIntegrations, { loading: loading2 }] = useManualQuery({
    fields: [
      'id',
      'isMailchimpAuthenticated',
      'mailchimpListId',
      'mailchimpListName',
      'stripeAccountId',
      { community: ['id'] }
    ],
    operation: QueryEvent.GET_INTEGRATIONS,
    schema: Schema.COMMUNITY_INTEGRATIONS
  });

  const [getQuestions, { loading: loading3 }] = useManualQuery({
    fields: [
      'category',
      'description',
      'id',
      'locked',
      'options',
      'rank',
      'required',
      'title',
      'type',
      { community: ['id'] }
    ],
    operation: QueryEvent.GET_QUESTIONS,
    schema: [Schema.QUESTION]
  });

  const [getMemberPlans, { loading: loading4 }] = useManualQuery({
    fields: [
      'amount',
      'id',
      'isFree',
      'name',
      'recurrence',
      { community: ['id'] }
    ],
    operation: QueryEvent.GET_MEMBER_PLANS,
    schema: [Schema.MEMBER_PLAN]
  });

  useEffect(() => {
    if (!communityId) return;

    (async () => {
      await Promise.all([
        getCommunity(),
        getIntegrations(),
        getQuestions(),
        getMemberPlans()
      ]);
    })();
  }, [communityId]);

  const loading: boolean = loading1 || loading2 || loading3 || loading4;

  useLoader(loading);

  return { loading };
};

export default useInitCommunity;
