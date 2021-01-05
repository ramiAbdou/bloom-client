import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import Loader from '@molecules/Loader/Loader';
import useQuery from '@hooks/useQuery';
import { IUser } from '@store/entities';
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
  const { loading, data: user, error } = useQuery<IUser>({
    name: 'getUser',
    query: GET_USER
  });

  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const encodedUrlName = useStoreState(
    ({ db }) => db.community?.encodedUrlName
  );

  useEffect(() => {
    if (!user) return;

    mergeEntities({
      data: user,
      schema: Schema.USER,
      setActiveId: true
    });
  }, [user]);

  const isHome = rest.path === '/';

  // If there are already members stored in the Member state, then we
  // know that the user is loaded, so show that.
  const token = new URLSearchParams(window.location.search).get('loginToken');
  if (token) return <TokenRoute token={token} />;
  if (loading) return <Loader />;
  if (error || !user) return <Redirect to="/login" />;
  if (isHome && encodedUrlName) return <Redirect to={`/${encodedUrlName}`} />;

  return <Route exact {...rest} component={component} />;
};
