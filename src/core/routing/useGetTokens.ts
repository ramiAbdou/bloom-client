import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { UrlNameProps } from '@constants';
import useManualQuery from '@hooks/useManualQuery';
import useLoader from '@organisms/Loader/useLoader';
import { useStoreActions } from '@store/Store';

interface GetTokensResult {
  communityId: string;
  memberId: string;
  userId: string;
}

/**
 * Updates the authenticated status of the user by checking the decoded httpOnly
 * cookies stored in the browser.
 */
const useGetTokens = (checkUrlName = false): boolean => {
  const token = new URLSearchParams(window.location.search).get('token');
  const { urlName }: UrlNameProps = useParams();

  const setActive = useStoreActions(({ db }) => db.setActive);
  const { push } = useHistory();

  const [getTokens, result] = useManualQuery<GetTokensResult>({
    fields: ['communityId', 'memberId', 'userId'],
    operation: 'getTokens',
    types: { urlName: { required: false } }
  });

  useEffect(() => {
    (async () => {
      const { data } = await getTokens({ urlName });

      if (!data?.userId) {
        if (checkUrlName && !urlName) push('/login');
        return;
      }

      setActive([
        { id: data?.communityId, table: 'communities' },
        { id: data?.memberId, table: 'members' },
        { id: data?.userId, table: 'users' }
      ]);
    })();
  }, [checkUrlName, token, urlName]);

  const loading = (!result.data && !result.error) || result.loading;
  useLoader(loading);

  return loading;
};

export default useGetTokens;
