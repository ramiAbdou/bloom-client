import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import { PanelType } from '@constants';
import useTopLevelRoute from '@hooks/useTopLevelRoute';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';

const SideBarProfileContent: React.FC = () => {
  const memberTypeName: string = useStoreState(({ db }) => {
    return db.byTypeId[db.member.type]?.name;
  });

  const role = useStoreState(({ db }) => db.member?.role);
  const firstName = useStoreState(({ db }) => db.user?.firstName);
  const lastName = useStoreState(({ db }) => db.user?.lastName);
  const pictureUrl = useStoreState(({ db }) => db.user?.pictureUrl);

  const fullName = `${firstName} ${lastName}`;

  return (
    <div>
      <ProfilePicture circle href={pictureUrl} size={48} />

      <div className="o-nav-profile-info">
        <p>{fullName}</p>
        <p>{role?.toLowerCase() ?? memberTypeName}</p>
      </div>
    </div>
  );
};

const SideBarProfile: React.FC = () => {
  const isDuesMessageShowing: boolean = useStoreState(({ db }) => {
    return db.community.canCollectDues && !db.member?.isDuesActive;
  });

  const showPanel = useStoreActions(({ panel }) => panel.showPanel);
  const activeRoute = useTopLevelRoute();
  const isActive = ['membership', 'profile'].includes(activeRoute);

  const onClick = () => showPanel({ id: PanelType.PROFILE });

  const containerCss = cx('o-nav-profile-ctr', {
    'o-nav-profile-ctr--no-auto': isDuesMessageShowing
  });

  const buttonCss = cx('o-nav-profile', {
    'o-nav-profile--active': isActive
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
