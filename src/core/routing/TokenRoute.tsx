import { query } from 'gql-query-builder';
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import useQuery from '@hooks/useQuery';
import Loader from '@molecules/Loader/Loader';

// We're not exporting this to another file since this is the only place we
// need it.
const VERIFY_LOGIN_TOKEN = query({
  operation: 'verifyLoginToken',
  variables: { loginToken: { required: true } }
}).query;

type TokenRouteProps = { token: string };

export default ({ token }: TokenRouteProps) => {
  const { push } = useHistory();

  const { data: isVerified, loading } = useQuery<boolean>({
    name: 'verifyLoginToken',
    query: VERIFY_LOGIN_TOKEN,
    variables: { loginToken: token }
  });

  if (isVerified) {
    push(window.location.pathname);
    return null;
  }

  if (loading) return <Loader />;
  return <Redirect to="/login" />;
};
