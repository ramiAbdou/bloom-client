import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import LoginPage from '@scenes/Login/Login';
import { useStoreState } from '@store/Store';
import useVerifyLoginToken from './useVerifyLoginToken';

// We need to pass in the path instead of just setting it to /login here, so
// that the Switch component in the router properly switches.
const LoginRoute: React.FC<Pick<RouteProps, 'exact' | 'path'>> = ({
  exact,
  path
}) => {
  const isAuthenticated = useStoreState(({ db }) => !!db.isAuthenticated);
  const loading = useVerifyLoginToken();

  if (loading) return null;
  if (isAuthenticated) return <Redirect to="/" />;
  return <Route component={LoginPage} exact={exact} path={path} />;
};

export default LoginRoute;
