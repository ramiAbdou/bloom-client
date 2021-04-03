import { useEffect } from 'react';

import { useApolloClient } from '@apollo/client';
import useLazyQuery from '@gql/useLazyQuery';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useInitSidebarLinkNotificationCircle = (to: string): void => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const client = useApolloClient();

  const [listApplicants] = useLazyQuery({
    fields: ['community.id', 'id', 'status'],
    operation: 'members',
    queryName: 'GetApplicantsByCommunityId',
    schema: [Schema.MEMBER],
    where: { community: { id: communityId }, status: 'Pending' }
  });

  useEffect(() => {
    (async () => {
      if (to === 'applicants') listApplicants();
    })();
  }, [client, to]);
};

export default useInitSidebarLinkNotificationCircle;
