import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useManualQuery from '@hooks/useManualQuery';
import useLoader from '@organisms/Loader/useLoader';

/**
 * Verifies the login token if one is present in the SearchParams. Will exist
 * if user logs in from email.
 */
const useVerifyToken = (): boolean => {
  const token = new URLSearchParams(window.location.search).get('token');

  const [verifyToken, result] = useManualQuery<boolean>({
    operation: 'verifyToken',
    types: { token: { required: true } },
    variables: { token }
  });

  const { push } = useHistory();

  useEffect(() => {
    if (!token) return;

    (async () => {
      const { data: isVerified } = await verifyToken();

      // If the token is verified, we push to the pathname (essentially just
      // gets rid of the token attached as a query parameter).
      if (isVerified) push(window.location.pathname);
    })();
  }, [token]);

  const loading = !!token && (result.loading || result.data === null);
  useLoader(loading);

  return loading;
};

export default useVerifyToken;
