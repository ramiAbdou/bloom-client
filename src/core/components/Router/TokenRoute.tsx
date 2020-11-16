/**
 * @fileoverview Component: TokenRoute
 * @author Rami Abdou
 */

import { query } from 'gql-query-builder';
import { useQuery } from 'graphql-hooks';
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import FullScreenLoader from '@components/Loader/FullScreenLoader';

// We're not exporting this to another file since this is the only place we
// need it.
const VERIFY_LOGIN_TOKEN = query({
  operation: 'verifyLoginToken',
  variables: { loginToken: { required: true } }
}).query;

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
