import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import { PickerType } from '@constants';
import ProfilePicture from '@molecules/ProfilePicture';
import { useStoreActions, useStoreState } from '@store/Store';

const SideBarProfileContent: React.FC = () => {
  const memberTypeName: string = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return byTypeId[db.member.type]?.name;
  });

  const role = useStoreState(({ db }) => db.member?.role);
  const firstName = useStoreState(({ db }) => db.user?.firstName);
  const lastName = useStoreState(({ db }) => db.user?.lastName);
  const pictureUrl = useStoreState(({ db }) => db.user?.pictureUrl);

  const fullName = `${firstName} ${lastName}`;

  return (
    <div>
      <ProfilePicture
        circle
        firstName={firstName}
        lastName={lastName}
        pictureUrl={pictureUrl}
        size={48}
      />

      <div>
        <p>{fullName}</p>
        <p>{role?.toLowerCase() ?? memberTypeName}</p>
      </div>
    </div>
  );
};

const SideBarProfile: React.FC = () => {
  const showPicker = useStoreActions(({ panel }) => panel.showPicker);
  const onClick = () => showPicker(PickerType.PROFILE);

  return (
    <div>
      <button
        className="o-side-bar-profile"
        id={PickerType.PROFILE}
        onClick={onClick}
      >
        <SideBarProfileContent />
        <IoChevronForwardOutline />
      </button>
    </div>
  );
};

export default SideBarProfile;
