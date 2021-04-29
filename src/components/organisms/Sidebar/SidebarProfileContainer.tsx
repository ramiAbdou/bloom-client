import React from 'react';

import { showPanel } from '@components/organisms/Panel/Panel.state';
import useTopLevelRoute from '@core/hooks/useTopLevelRoute';
import useBreakpoint from '@hooks/useBreakpoint';
import { ComponentWithData, RouteType } from '@util/constants';
import { IMember } from '@util/constants.entities';
import { cx } from '@util/util';
import { PanelType } from '../Panel/Panel.types';

const SidebarProfileContainer: ComponentWithData<IMember> = ({
  children,
  data: member
}) => {
  const isTablet: boolean = useBreakpoint() <= 2;
  const activeRoute: RouteType = useTopLevelRoute(member?.community?.urlName);

  if (isTablet) return null;

  const isActive: boolean =
    activeRoute === 'membership' || activeRoute === 'profile';

  const onClick = (): void => {
    showPanel({
      align: 'RIGHT_BOTTOM',
      id: PanelType.NAVIGATE_PROFILE,
      style: { marginLeft: 24, minWidth: 270, padding: 8 }
    });
  };

  const css: string = cx('o-nav-profile', {
    'o-nav-profile--active': isActive
  });

  return (
    <div className="o-nav-profile-ctr">
      <button
        className={css}
        id={PanelType.NAVIGATE_PROFILE}
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default SidebarProfileContainer;
