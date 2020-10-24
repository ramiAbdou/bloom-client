/**
 * @fileoverview Scene: Home
 * @author Rami Abdou
 */

import { useQuery } from 'graphql-hooks';
import React from 'react';

import { useStoreState } from '@store/Store';
import { GET_MEMBERS } from './HomeGQL';

const Applicants = () => {
  const { data } = useQuery(GET_MEMBERS);

  console.log(data);

  return (
    <div>
      <div />
    </div>
  );
};

export default () => {
  const firstName = useStoreState(({ user }) => user.firstName);

  return (
    <>
      <p>First Name: {firstName} </p>
      <Applicants />
    </>
  );
};
