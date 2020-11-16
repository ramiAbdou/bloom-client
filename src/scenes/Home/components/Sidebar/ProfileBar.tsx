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
  const clearEntities = useStoreActions((store) => store.clearEntities);
  const showPicker = useStoreActions(({ picker }) => picker.showPicker);
  const widthRatio = useStoreState(({ screen }) => screen.widthRatio);
  const role = useStoreState(({ membership }) =>
    membership.role ? membership.role.toLowerCase() : 'Member'
  );
  const fullName = useStoreState(
    ({ user }) => `${user.firstName} ${user.lastName}`
  );

  const { push } = useHistory();
  const [logout] = useMutation(LOGOUT);

  const onLogout = async () => {
    const { error } = await logout();
    if (error) return;

    // Clear the entities that we've fetched and reset the Bloom style guide
    // primary color.
    clearEntities();

    const { style } = document.documentElement;
    style.setProperty('--primary', '#f58023');
    style.setProperty('--primary-hex', `245, 128, 35`);
    style.setProperty('--primary-hue', `27`);
    style.setProperty('--gray-1', `hsl(27, 5%, 20%)`);
    style.setProperty('--gray-2', `hsl(27, 5%, 31%)`);
    style.setProperty('--gray-3', `hsl(27, 5%, 51%)`);
    style.setProperty('--gray-4', `hsl(27, 5%, 74%)`);
    style.setProperty('--gray-5', `hsl(27, 5%, 88%)`);
    style.setProperty('--gray-6', `hsl(27, 5%, 96%)`);

    push('/login');
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
          <p>{role}</p>
        </div>
      </div>

      <IoIosArrowForward color="#000" />
    </button>
  );
};
