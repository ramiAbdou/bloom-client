import { useEffect } from 'react';

import useManualQuery from '@hooks/useManualQuery';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { QueryEvent } from '@util/constants.events';

const useInitSidebarLinkNotificationCircle = (to: string): void => {
  const [listApplicants] = useManualQuery<IMember[]>({
    fields: ['id', 'status', { community: ['id'] }],
    operation: QueryEvent.LIST_APPLICANTS,
    schema: [Schema.MEMBER]
  });

  useEffect(() => {
    (async () => {
      if (to === 'applicants') await listApplicants();
    })();
  }, [to]);
};

export default useInitSidebarLinkNotificationCircle;
