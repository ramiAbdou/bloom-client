import { useEffect } from 'react';

import useManualQuery from '@hooks/useManualQuery';
import useLoader from '@organisms/Loader/useLoader';
import { useStoreActions } from '@store/Store';

interface GetTokensResult {
  communityId: string;
  memberId: string;
  userId: string;
}

/**
 * Updates the authenticated status of the user by checking the httpOnly
 * cookies stored in the browser.
 */
const useGetTokens = (urlName?: string): boolean => {
  const setActive = useStoreActions(({ db }) => db.setActive);

  const [getTokens, { loading }] = useManualQuery<GetTokensResult>({
    fields: ['communityId', 'memberId', 'userId'],
    operation: 'getTokens',
    types: { urlName: { required: false } }
  });

  useEffect(() => {
    (async () => {
      const { data } = await getTokens({ urlName });

      if (!data?.userId) return;

      setActive({ id: data?.communityId, table: 'communities' });
      setActive({ id: data?.memberId, table: 'members' });
      setActive({ id: data?.userId, table: 'users' });
    })();
  }, [urlName]);

  useLoader(loading);

  return loading;
};

export default useGetTokens;
