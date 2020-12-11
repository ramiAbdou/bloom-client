import deepequal from 'fast-deep-equal';
import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import ProfilePicture from '@components/Misc/ProfilePicture';
import { PickerType } from '@constants';
import { IUser } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';

export default () => {
  const {
    type: { name: type },
    role
  } = useStoreState(({ db }) => db.member, deepequal);

  const { firstName, lastName, pictureUrl } = useStoreState(
    ({ db }) => db.user,
    deepequal
  ) as IUser;

  const showPicker = useStoreActions(({ picker }) => picker.showPicker);

  const onClick = () => showPicker(PickerType.PROFILE);

  return (
    <button
      className="s-home-sidebar-profile"
      id={PickerType.PROFILE}
      onClick={onClick}
    >
      <div>
        <ProfilePicture
          circle
          firstName={firstName}
          lastName={lastName}
          pictureUrl={pictureUrl}
          size={48}
        />

        <div>
          <p>{`${firstName} ${lastName}`}</p>
          <p>{role?.toLowerCase() ?? type}</p>
        </div>
      </div>

      <IoChevronForwardOutline />
    </button>
  );
};
