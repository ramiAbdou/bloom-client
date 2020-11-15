/**
 * @fileoverview Scene: ProfileBar
 * - Controls the ability to log out, manage membership and go to profile.
 * @author Rami Abdou
 */

import { useMutation } from 'graphql-hooks';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useHistory } from 'react-router-dom';

import { PickerAction } from '@store/Picker.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { LOGOUT } from '@store/User.gql';

const PictureContainer = () => {
  const pictureURL = useStoreState(({ user }) => user.pictureURL);
  const initials = useStoreState(
    ({ user }) => `${user.firstName[0]}${user.lastName[0]}`
  );

  if (pictureURL)
    return <img className="s-home-sidebar-profile__picture" src={pictureURL} />;
  return <h3 className="s-home-sidebar-profile__picture">{initials}</h3>;
};

export default () => {
  const id = 'SIDEBAR_PROFILE';
  const showPicker = useStoreActions(({ picker }) => picker.showPicker);
  const widthRatio = useStoreState(({ screen }) => screen.widthRatio);
  const role = useStoreState(({ membership }) => membership.role);
  const fullName = useStoreState(
    ({ user }) => `${user.firstName} ${user.lastName}`
  );

  const { push } = useHistory();
  const [logout] = useMutation(LOGOUT);

  const onLogout = async () => {
    const { error } = await logout();
    if (!error) push('/login');
  };

  const onClick = () => {
    // Show a picker that either allows them to view their profile or log out.
    const actions: PickerAction[] = [
      { onClick: () => {}, text: 'Manage Membership' },
      { onClick: () => {}, text: 'Your Profile' },
      { onClick: onLogout, separator: true, text: 'Log Out' }
    ];

    showPicker({
      actions,
      align: 4,
      id,
      isFixed: true,
      offset: { marginLeft: 24 * widthRatio }
    });
  };

  return (
    <button className="s-home-sidebar-profile" id={id} onClick={onClick}>
      <div>
        <PictureContainer />

        <div>
          <p>{fullName}</p>
          <p>{role.toLowerCase()}</p>
        </div>
      </div>

      <IoIosArrowForward color="#000" />
    </button>
  );
};
