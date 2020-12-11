import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import { PickerType } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';

const PictureContainer = () => {
  const pictureUrl = useStoreState(({ db }) => db.user.pictureUrl);

  const initials = useStoreState(
    ({ db }) => `${db.user.firstName[0]}${db.user.lastName[0]}`
  );

  if (pictureUrl) {
    return <img className="s-home-sidebar-profile__picture" src={pictureUrl} />;
  }

  return <h3 className="s-home-sidebar-profile__picture">{initials}</h3>;
};

export default () => {
  const showPicker = useStoreActions(({ picker }) => picker.showPicker);
  const type = useStoreState(({ db }) => db.member.type.name);
  const role = useStoreState(({ db }) => db.member.role);

  const fullName = useStoreState(
    ({ db }) => `${db.user.firstName} ${db.user.lastName}`
  );

  const onClick = () => showPicker(PickerType.PROFILE);

  return (
    <button
      className="s-home-sidebar-profile"
      id={PickerType.PROFILE}
      onClick={onClick}
    >
      <div>
        <PictureContainer />

        <div>
          <p>{fullName}</p>
          <p>{role?.toLowerCase() ?? type}</p>
        </div>
      </div>

      <IoChevronForwardOutline />
    </button>
  );
};
