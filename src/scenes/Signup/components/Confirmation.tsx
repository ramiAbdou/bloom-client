/**
 * @fileoverview Component: MembershipForm
 * @author Rami Abdou
 */

import React from 'react';

import { useStoreState } from '@store/Store';

export default () => {
  const email = useStoreState(({ user }) => user.email);

  return (
    <>
      <h1>Confirmation</h1>
      <p>{email}</p>
    </>
  );
};
