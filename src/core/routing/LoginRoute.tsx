import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import useQuery from '@hooks/useQuery';
import Loader from '@molecules/Loader/Loader';
import LoginPage from '@scenes/Login/Login';
import { IS_LOGGED_IN } from './Router.gql';

// We need to pass in the path instead of just setting it to /login here, so
// that the Switch component in the router properly switches.
const LoginRoute: React.FC<Pick<RouteProps, 'path'>> = ({ path }) => {
  // Check to see if the user is logged in (if they have tokens stored in the
  // httpOnly cookies), and if so, redirect them to the home page.
  const { loading, data: isLoggedIn } = useQuery<boolean>({
    name: 'isUserLoggedIn',
    query: IS_LOGGED_IN
  });

  if (loading) return <Loader />;
  if (isLoggedIn) return <Redirect to="/" />;
  return <Route component={LoginPage} path={path} />;
};

export default LoginRoute;
