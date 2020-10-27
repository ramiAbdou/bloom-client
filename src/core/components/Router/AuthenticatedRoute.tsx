/**
 * @fileoverview Component: AuthenticatedRoute
 * @author Rami Abdou
 */

import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import Loader from '@components/Loader/Loader';
import { useStoreActions } from '@store/Store';
import { GET_USER } from '@store/User.gql';
import TokenRoute from './TokenRoute';

/**
 * For an authenticated route, we first try to retrieve the user (by using the
 * token stored in the httpOnly cookies), and if the user exists, we update
 * the global state with the user.
 */
export default ({ component, ...rest }: RouteProps) => {
  const loginToken = new URLSearchParams(window.location.search).get('token');
  const { loading, data, error } = useQuery(GET_USER);
  const initUser = useStoreActions(({ user }) => user.init);

  useEffect(() => {
    if (!data?.getUser) return;
    initUser(data.getUser);
  }, [data?.getUser?.id]);

  // If there are already memberships stored in the Membership state, then we
  // know that the user is loaded, so show that.
  if (loginToken) return <TokenRoute token={loginToken} />;
  if (loading) return <Loader />;
  if (error) return <Redirect to="/login" />;

  return <Route exact {...rest} component={component} />;
};
