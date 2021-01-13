import React from 'react';
import { Redirect } from 'react-router-dom';

import useQuery from '@hooks/useQuery';
import Loader from '@molecules/Loader/Loader';
import { VERIFY_LOGIN_TOKEN } from './Router.gql';

interface TokenRouteProps {
  token: string;
}

const TokenRoute: React.FC<TokenRouteProps> = ({ token }) => {
  const { data: isVerified, loading } = useQuery<boolean>({
    name: 'verifyLoginToken',
    query: VERIFY_LOGIN_TOKEN,
    variables: { loginToken: token }
  });

  if (loading) return <Loader />;
  if (isVerified) return <Redirect to={`/${window.location.pathname}`} />;
  return <Redirect to="/login" />;
};

export default TokenRoute;
