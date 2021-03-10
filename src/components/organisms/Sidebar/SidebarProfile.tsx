import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import useBreakpoint from '@hooks/useBreakpoint';
import useTopLevelRoute from '@hooks/useTopLevelRoute';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import { useStoreActions, useStoreState } from '@store/Store';
import { PanelType, RouteType } from '@util/constants';
import { cx } from '@util/util';

const SidebarProfileContent: React.FC = () => {
  const memberTypeName: string = useStoreState(({ db }) => {
    return db.byMemberPlanId[db.member?.plan]?.name;
  });

  const role = useStoreState(({ db }) => db.member?.role);
  const firstName = useStoreState(({ db }) => db.member?.firstName);
  const lastName = useStoreState(({ db }) => db.member?.lastName);

  const fullName = `${firstName} ${lastName}`;

  return (
    <div>
      <ProfilePicture size={48} />

      <div className="o-nav-profile-info">
        <p>{fullName}</p>
        <p>{role?.toLowerCase() ?? memberTypeName}</p>
      </div>
    </div>
  );
};

const SidebarProfileButton: React.FC = () => {
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);

  const activeRoute: RouteType = useTopLevelRoute();
  const isActive: boolean = ['membership', 'profile'].includes(activeRoute);

  const onClick = () => {
    showPanel({ id: PanelType.PROFILE });
  };

  const css: string = cx('o-nav-profile', {
    'o-nav-profile--active': isActive
  });

  return (
    <button className={css} id={PanelType.PROFILE} onClick={onClick}>
      <SidebarProfileContent />
      <IoChevronForwardOutline />
    </button>
  );
};

const SidebarProfile: React.FC = () => {
  const isDuesMessageShowing: boolean = useStoreState(({ db }) => {
    return db.community?.canCollectDues && !db.member?.isDuesActive;
  });

  const isTablet: boolean = useBreakpoint() <= 2;

  const css: string = cx('o-nav-profile-ctr', {
    'o-nav-profile-ctr--no-auto': isDuesMessageShowing
  });

  if (isTablet) return null;

  return (
    <div className={css}>
      <SidebarProfileButton />
    </div>
  );
};

export default SidebarProfile;
