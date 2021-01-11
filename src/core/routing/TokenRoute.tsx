import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import useQuery from '@hooks/useQuery';
import Loader from '@molecules/Loader/Loader';
import { VERIFY_LOGIN_TOKEN } from './Router.gql';

interface TokenRouteProps {
  token: string;
}

const TokenRoute: React.FC<TokenRouteProps> = ({ token }) => {
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

  return loading ? <Loader /> : <Redirect to="/login" />;
};

export default TokenRoute;
