import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import useQuery from '@hooks/useQuery';
import Loader from '@molecules/Loader/Loader';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_USER, GetUserResult } from './Router.gql';
import TokenRoute from './TokenRoute';

/**
 * For an authenticated route, we first try to retrieve the user (by using the
 * token stored in the httpOnly cookies), and if the user exists, we update
 * the global state with the user.
 */
const AuthenticatedRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const activeCommunityId = useStoreState(({ db }) => db.community?.id);

  const encodedUrlName = useStoreState(
    ({ db }) => db.community?.encodedUrlName
  );

  const setActiveCommunity = useStoreActions(({ db }) => db.setActiveCommunity);

  const { loading, data, error } = useQuery<GetUserResult>({
    activeId: true,
    name: 'getUser',
    query: GET_USER,
    schema: Schema.USER
  });

  useEffect(() => {
    if (!data?.activeCommunityId) return;

    if (data?.activeCommunityId !== activeCommunityId) {
      setActiveCommunity({ communityId: data.activeCommunityId });
    }
  }, [data?.activeCommunityId]);

  // If there are already members stored in the Member state, then we
  // know that the user is loaded, so show that.
  const token = new URLSearchParams(window.location.search).get('loginToken');
  if (token) return <TokenRoute token={token} />;
  if (loading) return <Loader />;
  if (error || !data) return <Redirect to="/login" />;
  if (rest.path === '/' && encodedUrlName) {
    return <Redirect to={`/${encodedUrlName}`} />;
  }

  return <Route exact {...rest} component={component} />;
};

export default AuthenticatedRoute;
