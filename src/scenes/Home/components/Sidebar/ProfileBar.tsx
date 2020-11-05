/**
 * @fileoverview Scene: ProfileBar
 * @author Rami Abdou
 */

import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import { useStoreState } from '@store/Store';

const PictureContainer = () => {
  const pictureURL = useStoreState(({ user }) => user.pictureURL);
  const initials = useStoreState(
    ({ user }) => `${user.firstName[0]}${user.lastName[0]}`
  );

  if (pictureURL)
    return <img className="s-home-sidebar-profile__picture" src={pictureURL} />;
  return <h4 className="s-home-sidebar-profile__picture">{initials}</h4>;
};

const FullName = () => {
  const fullName = useStoreState(
    ({ user }) => `${user.firstName} ${user.lastName}`
  );
  return <p>{fullName}</p>;
};

const CommunityRole = () => {
  const role = useStoreState(({ membership }) => membership.role);
  return <p>{role.toLowerCase()}</p>;
};

export default () => (
  <button className="s-home-sidebar-profile">
    <div>
      <PictureContainer />

      <div>
        <FullName />
        <CommunityRole />
      </div>
    </div>

    <IoIosArrowForward color="#000" />
  </button>
);
