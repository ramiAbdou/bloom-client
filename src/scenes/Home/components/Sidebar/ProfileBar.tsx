/**
 * @fileoverview Scene: ProfileBar
 * @author Rami Abdou
 */

import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import { PickerAction } from '@store/Picker.store';
import { useStoreActions, useStoreState } from '@store/Store';

const PictureContainer = () => {
  const pictureURL = useStoreState(({ user }) => user.pictureURL);
  const initials = useStoreState(
    ({ user }) => `${user.firstName[0]}${user.lastName[0]}`
  );

  if (pictureURL)
    return <img className="s-home-sidebar-profile__picture" src={pictureURL} />;
  return <h3 className="s-home-sidebar-profile__picture">{initials}</h3>;
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

export default () => {
  const id = 'SIDEBAR_PROFILE';
  const showPicker = useStoreActions(({ picker }) => picker.showPicker);
  const widthRatio = useStoreState(({ screen }) => screen.widthRatio);

  const onClick = () => {
    // Show a picker that either allows them to view their profile or log out.
    const actions: PickerAction[] = [
      { onClick: () => {}, text: 'Manage Membership' },
      { onClick: () => {}, text: 'Your Profile' },
      { onClick: () => {}, separator: true, text: 'Log Out' }
    ];

    showPicker({
      actions,
      align: 4,
      id,
      isFixed: true,
      offset: { marginLeft: 18 * widthRatio }
    });
  };

  return (
    <button className="s-home-sidebar-profile" id={id} onClick={onClick}>
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
};
