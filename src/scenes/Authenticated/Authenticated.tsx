/**
 * @fileoverview Scene: Login
 * @author Rami Abdou
 */

import { useQuery } from 'graphql-hooks';
import React from 'react';
import { Redirect } from 'react-router-dom';

import { Loader } from '@components/Loader';
import { GET_USER } from './Authenticated.gql';

export default () => {
  const { loading, data } = useQuery(GET_USER);

  if (loading) return <Loader />;
  if (data?.getUser) return <div>Authenticated</div>;
  return <Redirect to="/login" />;
};
