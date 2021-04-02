import { useEffect } from 'react';

import useHasuraLazyQuery from '@hooks/useHasuraLazyQuery';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useInitSidebarLinkNotificationCircle = (to: string): void => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const [listApplicants] = useHasuraLazyQuery({
    fields: ['community.id', 'id', 'status'],
    operation: 'members',
    queryName: 'GetApplicantsByCommunityId',
    schema: [Schema.MEMBER],
    variables: {
      communityId: { type: 'String!', value: communityId },
      status: { type: 'String!', value: 'Pending' }
    },
    where: {
      community: { id: { _eq: '$communityId' } },
      status: { _eq: '$status' }
    }
  });

  useEffect(() => {
    (async () => {
      if (to === 'applicants') await listApplicants();
    })();
  }, [to]);
};

export default useInitSidebarLinkNotificationCircle;
