import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import { IMember } from '@core/db/db.entities';
import { useStoreActions, useStoreState } from '@core/store/Store';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import useBreakpoint from '@hooks/useBreakpoint';
import useTopLevelRoute from '@hooks/useTopLevelRoute';
import { PanelType, RouteType } from '@util/constants';
import { cx } from '@util/util';

const SidebarProfileContent: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { data: member, loading } = useFindOneFull(IMember, {
    fields: [
      'firstName',
      'lastName',
      'memberType.id',
      'memberType.name',
      'position',
      'role'
    ],
    where: { id: memberId }
  });

  if (loading) return null;

  const fullName: string = `${member.firstName} ${member.lastName}`;

  return (
    <div>
      <ProfilePicture memberId={memberId} size={48} />

      <div className="o-nav-profile-info">
        <p>{fullName}</p>
        <p>{member.position ?? member.role ?? member.memberType?.name}</p>
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
