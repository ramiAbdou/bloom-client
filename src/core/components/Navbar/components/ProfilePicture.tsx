/**
 * @fileoverview Component: Profile Picture
 * @author Rami Abdou
 */

import React from 'react';

import { useStoreState } from '@store/Store';

const NoPictureContainer = () => {
  const initals = useStoreState(({ user }) =>
    user ? user?.firstName[0] + user?.lastName[0] : ''
  );

  return (
    <div className="c-nav-profile-pic c-nav-profile-pic--none">{initals}</div>
  );
};

const FullName = () => {
  const firstName = useStoreState(({ user }) => user?.firstName);
  const lastName = useStoreState(({ user }) => user?.lastName);

  return (
    <div>
      <p>{firstName}</p>
      <p>{lastName}</p>
    </div>
  );
};

export default () => (
  <button className="c-nav-profile">
    <NoPictureContainer />
    <FullName />
  </button>
);
