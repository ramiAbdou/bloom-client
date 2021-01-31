import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useManualQuery from '@hooks/useManualQuery';
import useQuery from '@hooks/useQuery';
import { useStoreActions } from '@store/Store';
import { IS_USER_LOGGED_IN, VERIFY_TOKEN, VerifyTokenArgs } from './Router.gql';

const useInitRouter = (): boolean => {
  const token = new URLSearchParams(window.location.search).get('token');
  const setIsAuthenticated = useStoreActions(({ db }) => db.setIsAuthenticated);

  const {
    loading: isUserLoggedInLoading,
    data: isAuthenticated
  } = useQuery<boolean>({
    name: 'isUserLoggedIn',
    query: IS_USER_LOGGED_IN
  });

  const [verifyToken, { loading: isVerifyTokenLoading }] = useManualQuery<
    boolean,
    VerifyTokenArgs
  >({
    name: 'verifyToken',
    query: VERIFY_TOKEN,
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

  useEffect(() => {
    setIsAuthenticated(isAuthenticated);
  }, [isAuthenticated, token]);

  return isUserLoggedInLoading || isVerifyTokenLoading;
};

export default useInitRouter;
