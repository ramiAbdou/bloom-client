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
 * Verifies the login token if one is present in the SearchParams. Will exist
 * if user logs in from email.
 */
const useVerifyToken = (): boolean => {
  const token = new URLSearchParams(window.location.search).get('token');

  const [verifyToken, { loading }] = useManualQuery<boolean>({
    operation: 'verifyToken',
    types: { token: { required: true } },
    variables: { token }
  });

  const { push } = useHistory();

  useEffect(() => {
    if (!token) return;

    (async () => {
      const { data: isVerified } = await verifyToken();
      if (isVerified) push(window.location.pathname);
    })();
  }, [token]);

  return loading;
};

/**
 * Updates the authenticated status of the user by checking the httpOnly
 * cookies stored in the browser.
 */
const useInitTokens = (): boolean => {
  const { urlName }: UrlNameProps = useParams();

  const setActive = useStoreActions(({ db }) => db.setActive);

  const [getTokens, { loading }] = useManualQuery<GetTokensResult>({
    fields: ['communityId', 'memberId', 'userId'],
    operation: 'getTokens',
    types: { urlName: { required: false } }
  });

  useEffect(() => {
    (async () => {
      const { data } = await getTokens({ urlName });

      if (!data) return;

      setActive({ id: data?.communityId, table: 'communities' });
      setActive({ id: data?.memberId, table: 'members' });
      setActive({ id: data?.userId, table: 'users' });
    })();
  }, [urlName]);

  return loading;
};

const useIsAuthenticated = (): boolean => {
  const loading1 = useInitTokens();
  const loading2 = useVerifyToken();
  const loading = loading1 || loading2;

  useLoader(loading);

  return loading;
};

export default useIsAuthenticated;
