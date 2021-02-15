import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import LoginPage from '@scenes/Login/Login';
import { useStoreState } from '@store/Store';

// We need to pass in the path instead of just setting it to /login here, so
// that the Switch component in the router properly switches.
const LoginRoute: React.FC<Pick<RouteProps, 'path'>> = ({ path }) => {
  const isAuthenticated = useStoreState(({ db }) => !!db.user);
  if (isAuthenticated) return <Redirect to="/" />;
  return <Route component={LoginPage} path={path} />;
};

export default LoginRoute;
