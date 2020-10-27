/**
 * @fileoverview Component: Profile Picture
 * @author Rami Abdou
 */

import React from 'react';

import { useStoreState } from '@store/Store';

const NoPictureContainer = () => {
  const initals = useStoreState(({ user }) => user.initials);
  return (
    <button className="c-nav-profile-pic c-nav-profile-pic--none">
      {initals}
    </button>
  );
};

const FullName = () => {
  const firstName = useStoreState(({ user }) => user.firstName);
  const lastName = useStoreState(({ user }) => user.lastName);

  return (
    <button>
      <p>{firstName}</p>
      <p>{lastName}</p>
    </button>
  );
};

export default () => {
  // const pictureUrl = useStoreState(({ user }) => user.pictureUrl);

  return (
    <div className="c-nav-profile">
      <NoPictureContainer />
      <FullName />
    </div>
  );
};
