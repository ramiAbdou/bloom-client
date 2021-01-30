import LoginRoute from 'core/routing/LoginRoute';
import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';

import useQuery from '@hooks/useQuery';
import Loader from '@molecules/Loader/Loader';
import Application from '@scenes/Application/Application';
import { useStoreActions } from '@store/Store';
import HomeRouter from './HomeRouter';
import { IS_USER_LOGGED_IN, VERIFY_TOKEN, VerifyTokenArgs } from './Router.gql';

/**
 * Core routing logic of the entire application. Nested logic should live
 * within each of the high level components. The Home route should have the
 * most nested logic within it.
 */
const RouterContent: React.FC = () => {
  const token = new URLSearchParams(window.location.search).get('token');
  const setIsAuthenticated = useStoreActions(({ db }) => db.setIsAuthenticated);

  const {
    loading: isUserLoggedInLoading,
    data: isAuthenticated
  } = useQuery<boolean>({
    name: 'isUserLoggedIn',
    query: IS_USER_LOGGED_IN
  });

  const { data: isVerified, loading: isVerifyTokenLoading } = useQuery<
    boolean,
    VerifyTokenArgs
  >({
    name: 'verifyToken',
    query: VERIFY_TOKEN,
    variables: { token }
  });

  const { push } = useHistory();

  useEffect(() => {
    if (token) {
      setIsAuthenticated(isVerified);
      if (isVerified) push(window.location.pathname);
    } else setIsAuthenticated(isAuthenticated);
  }, [isVerified, isAuthenticated, token]);

  if (isUserLoggedInLoading || isVerifyTokenLoading) return <Loader />;

  return (
    <>
      <Switch>
        <LoginRoute path="/login" />
        <Route component={Application} path="/:urlName/apply" />
        <Route component={HomeRouter} path="/:urlName" />
        <Route exact component={HomeRouter} path="/" />
        <Redirect to="/login" />
      </Switch>
    </>
  );
};

const Router: React.FC = () => (
  <BrowserRouter>
    <RouterContent />
  </BrowserRouter>
);

export default Router;
