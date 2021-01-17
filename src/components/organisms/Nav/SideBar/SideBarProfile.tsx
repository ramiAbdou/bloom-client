import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import { PanelType } from '@constants';
import useActiveRoute from '@hooks/useActiveRoute';
import ProfilePicture from '@molecules/ProfilePicture';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';

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
      <ProfilePicture circle href={pictureUrl} size={48} />

      <div className="o-side-bar-profile-info">
        <p>{fullName}</p>
        <p>{role?.toLowerCase() ?? memberTypeName}</p>
      </div>
    </div>
  );
};

const SideBarProfile: React.FC = () => {
  const isDuesMessageShowing: boolean = useStoreState(({ db }) => {
    return db.canCollectDues && db.member?.duesStatus !== 'Active';
  });

  const showPicker = useStoreActions(({ panel }) => panel.showPicker);
  const activeRoute = useActiveRoute();
  const isActive = ['membership', 'profile'].includes(activeRoute);

  const onClick = () => showPicker(PanelType.PROFILE);

  const containerCss = cx('o-side-bar-profile-ctr', {
    'o-side-bar-profile-ctr--no-auto': isDuesMessageShowing
  });

  const buttonCss = cx('o-side-bar-profile', {
    'o-side-bar-profile--active': isActive
  });

  return (
    <div className={containerCss}>
      <button className={buttonCss} id={PanelType.PROFILE} onClick={onClick}>
        <SideBarProfileContent />
        <IoChevronForwardOutline />
      </button>
    </div>
  );
};

export default SideBarProfile;
