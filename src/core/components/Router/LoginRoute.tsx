/**
 * @fileoverview Component: LoginRoute
 * @author Rami Abdou
 */

import { useQuery } from 'graphql-hooks';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import FullScreenLoader from '@components/Loader/FullScreenLoader';
import LoginPage from '@scenes/Login/Login';
import { IS_LOGGED_IN } from './Router.gql';

// We need to pass in the path instead of just setting it to /login here, so
// that the Switch component in the router properly switches.

export default ({ path }: Partial<RouteProps>) => {
  // Check to see if the user is logged in (if they have tokens stored in the
  // httpOnly cookies), and if so, redirect them to the home page.
  const { error, loading, data } = useQuery(IS_LOGGED_IN);

  if (loading) return <FullScreenLoader />;
  // If there is an error in the GraphQL query, whether the query structure
  // was wrong or there the user wasn't authenticated for the request.
  if (!error && data?.isUserLoggedIn) return <Redirect to="/" />;
  return <Route exact component={LoginPage} path={path} />;
};
