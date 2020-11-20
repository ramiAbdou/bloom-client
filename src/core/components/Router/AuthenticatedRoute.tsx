/**
 * @fileoverview Component: AuthenticatedRoute
 * @author Rami Abdou
 */

import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import FullScreenLoader from '@components/Loader/FullScreenLoader';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_USER } from './Router.gql';
import TokenRoute from './TokenRoute';

/**
 * For an authenticated route, we first try to retrieve the user (by using the
 * token stored in the httpOnly cookies), and if the user exists, we update
 * the global state with the user.
 */
export default ({ component, ...rest }: RouteProps) => {
  const { loading, data, error } = useQuery(GET_USER);
  const updateEntities = useStoreActions((actions) => actions.updateEntities);
  const encodedUrlName = useStoreState(
    ({ community }) => community?.encodedUrlName
  );

  useEffect(() => {
    if (!data?.getUser) return;
    updateEntities({ data: data.getUser, schema: Schema.USER });
  }, [data?.getUser]);

  const isHome = rest.path === '/';

  // If there are already memberships stored in the Membership state, then we
  // know that the user is loaded, so show that.
  const token = new URLSearchParams(window.location.search).get('loginToken');
  if (token) return <TokenRoute token={token} />;
  if (loading) return <FullScreenLoader />;
  if (error || (data && !data.getUser)) return <Redirect to="/login" />;
  if (isHome && encodedUrlName) return <Redirect to={`/${encodedUrlName}`} />;

  return <Route exact {...rest} component={component} />;
};
