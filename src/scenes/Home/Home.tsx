/**
 * @fileoverview Scene: Home
 * @author Rami Abdou
 */

import React from 'react';

import { useStoreState } from '@store/Store';

export default () => {
  const firstName = useStoreState(({ user }) => user.firstName);
  return <p>First Name: {firstName} </p>;
};
