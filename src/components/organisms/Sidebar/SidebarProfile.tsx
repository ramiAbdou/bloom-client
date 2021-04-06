import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import { IMember } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import useBreakpoint from '@hooks/useBreakpoint';
import useTopLevelRoute from '@hooks/useTopLevelRoute';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import { useStoreActions, useStoreState } from '@store/Store';
import { PanelType, RouteType } from '@util/constants';
import { cx } from '@util/util';

const SidebarProfileContent: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.member?.id);

  const { firstName, lastName, memberType, position, role } = useFindOne(
    IMember,
    {
      fields: [
        'firstName',
        'lastName',
        'memberType.id',
        'memberType.name',
        'position',
        'role'
      ],
      where: { id: memberId }
    }
  );

  const fullName: string = `${firstName} ${lastName}`;

  return (
    <div>
      <ProfilePicture memberId={memberId} size={48} />

      <div className="o-nav-profile-info">
        <p>{fullName}</p>
        <p>{position ?? role ?? memberType.name}</p>
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
    <button
      className={css}
      id={PanelType.PROFILE}
      type="button"
      onClick={onClick}
    >
      <SidebarProfileContent />
      <IoChevronForwardOutline />
    </button>
  );
};

const SidebarProfile: React.FC = () => {
  const isTablet: boolean = useBreakpoint() <= 2;

  if (isTablet) return null;

  return (
    <div className="o-nav-profile-ctr">
      <SidebarProfileButton />
    </div>
  );
};

export default SidebarProfile;
