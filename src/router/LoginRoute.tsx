import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import LoginPage from '@scenes/Login/Login';
// import { useStoreState } from '@store/Store';

// We need to pass in the path instead of just setting it to /login here, so
// that the Switch component in the router properly switches.
const LoginRoute: React.FC<Pick<RouteProps, 'exact' | 'path'>> = ({
  exact,
  path
}) => (
  // const isAuthenticated: boolean = useStoreState(
  //   ({ db }) => !!db.isAuthenticated
  // );

  // if (isAuthenticated) return <Redirect to="/" />;
  <Route component={LoginPage} exact={exact} path={path} />
);

export default LoginRoute;
