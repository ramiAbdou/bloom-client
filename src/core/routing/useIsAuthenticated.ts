import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useManualQuery from '@hooks/useManualQuery';
import useQuery from '@hooks/useQuery';
import useLoader from '@organisms/Loader/useLoader';
import { useStoreActions } from '@store/Store';

/**
 * Verifies the login token if one is present in the SearchParams. Will exist
 * if user logs in from email.
 */
const useVerifyToken = (): boolean => {
  const token = new URLSearchParams(window.location.search).get('token');
  const setIsAuthenticated = useStoreActions(({ db }) => db.setIsAuthenticated);

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
      setIsAuthenticated(isVerified);
      if (isVerified) push(window.location.pathname);
    })();
  }, [token]);

  return loading;
};

/**
 * Updates the authenticated status of the user by checking the httpOnly
 * cookies stored in the browser.
 */
const useIsUserLoggedIn = (): boolean => {
  const setIsAuthenticated = useStoreActions(({ db }) => db.setIsAuthenticated);

  const { loading, data: isAuthenticated } = useQuery<boolean>({
    operation: 'isUserLoggedIn'
  });

  useEffect(() => {
    setIsAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

  return loading;
};

const useIsAuthenticated = (): boolean => {
  const loading1 = useIsUserLoggedIn();
  const loading2 = useVerifyToken();
  const loading = loading1 || loading2;

  useLoader(loading);

  return loading;
};

export default useIsAuthenticated;
