import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import useQuery from '@hooks/useQuery';
import Loader from '@molecules/Loader/Loader';
import LoginPage from '@scenes/Login/Login';
import { IS_LOGGED_IN } from './Router.gql';

// We need to pass in the path instead of just setting it to /login here, so
// that the Switch component in the router properly switches.

export default ({ path }: Partial<RouteProps>) => {
  // Check to see if the user is logged in (if they have tokens stored in the
  // httpOnly cookies), and if so, redirect them to the home page.
  const { error, loading, data: isAuthenticated } = useQuery<boolean>({
    name: 'isUserLoggedIn',
    query: IS_LOGGED_IN
  });

  if (loading) return <Loader />;
  // If there is an error in the GraphQL query, whether the query structure
  // was wrong or there the user wasn't authenticated for the request.
  if (!error && isAuthenticated) return <Redirect to="/" />;
  return <Route component={LoginPage} path={path} />;
};
