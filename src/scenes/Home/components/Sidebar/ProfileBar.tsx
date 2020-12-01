/**
 * @fileoverview Scene: ProfileBar
 * - Controls the ability to log out, manage membership and go to profile.
 * @author Rami Abdou
 */

import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

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

const PICKER_ID = 'PROFILE_PICKER';

export default () => {
  const showPicker = useStoreActions(({ picker }) => picker.showPicker);
  const type = useStoreState(({ membership }) => membership.type.name);
  const role = useStoreState(({ membership }) => membership.role);
  const fullName = useStoreState(
    ({ user }) => `${user.firstName} ${user.lastName}`
  );

  const onClick = () => showPicker({ align: 4, id: PICKER_ID });

  return (
    <button className="s-home-sidebar-profile" id={PICKER_ID} onClick={onClick}>
      <div>
        <PictureContainer />

        <div>
          <p>{fullName}</p>
          <p>{role?.toLowerCase() ?? type}</p>
        </div>
      </div>

      <IoIosArrowForward color="#000" />
    </button>
  );
};
