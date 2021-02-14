import { useEffect } from 'react';

import useManualQuery from '@hooks/useManualQuery';
import useLoader from '@organisms/Loader/useLoader';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';

const useInitCommunity = (): boolean => {
  const communityId = useStoreState(({ db }) => db.community?.id);
  const setActive = useStoreActions(({ db }) => db.setActive);

  const [getCommunity, { data: data1, loading: loading1 }] = useManualQuery({
    fields: ['autoAccept', 'id', 'logoUrl', 'name', 'primaryColor', 'urlName'],
    operation: 'getCommunity',
    schema: Schema.COMMUNITY
  });

  const [getIntegrations, { loading: loading2 }] = useManualQuery({
    fields: [
      'id',
      'isMailchimpAuthenticated',
      'mailchimpListId',
      'mailchimpListName',
      'stripeAccountId',
      { community: ['id'] },
      { mailchimpLists: ['id', 'name'] }
    ],
    operation: 'getIntegrations',
    schema: Schema.COMMUNITY_INTEGRATIONS
  });

  const [getMember, { data: data3, loading: loading3 }] = useManualQuery({
    fields: [
      'autoRenew',
      'bio',
      'id',
      'isDuesActive',
      'role',
      'status',
      { community: ['id'] },
      { type: ['id'] },
      { user: ['id'] }
    ],
    operation: 'getMember',
    schema: Schema.MEMBER
  });

  const [getQuestions, { loading: loading4 }] = useManualQuery({
    fields: [
      'category',
      'id',
      'inDirectoryCard',
      'inExpandedDirectoryCard',
      'options',
      'title',
      'type',
      { community: ['id'] }
    ],
    operation: 'getQuestions',
    schema: [Schema.QUESTION]
  });

  const [getTypes, { loading: loading5 }] = useManualQuery({
    fields: [
      'amount',
      'id',
      'isFree',
      'name',
      'recurrence',
      { community: ['id'] }
    ],
    operation: 'getTypes',
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

  const loading = loading1 || loading2 || loading3 || loading4 || loading5;
  useLoader(loading);

  return loading;
};

export default useInitCommunity;
