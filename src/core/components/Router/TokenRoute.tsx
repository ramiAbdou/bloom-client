/**
 * @fileoverview Component: TokenRoute
 * @author Rami Abdou
 */

import { useQuery } from 'graphql-hooks';
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import FullScreenLoader from '@components/Loader/FullScreenLoader';
import { VERIFY_LOGIN_TOKEN } from '@scenes/Home/Home.gql';

type TokenRouteProps = { token: string };

export default ({ token }: TokenRouteProps) => {
  const { push } = useHistory();
  const { data, loading } = useQuery(VERIFY_LOGIN_TOKEN, {
    variables: { loginToken: token }
  });

  if (data?.verifyLoginToken) {
    push(window.location.pathname);
    return null;
  }

  if (loading) return <FullScreenLoader />;
  return <Redirect to="/login" />;
};
