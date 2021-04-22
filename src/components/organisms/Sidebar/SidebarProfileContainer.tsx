import React from 'react';

import useTopLevelRoute from '@core/hooks/useTopLevelRoute';
import { useStoreActions } from '@core/store/Store';
import useBreakpoint from '@hooks/useBreakpoint';
import { ComponentWithData, PanelType, RouteType } from '@util/constants';
import { IMember } from '@util/constants.entities';
import { cx } from '@util/util';

const SidebarProfileContainer: ComponentWithData<IMember> = ({
  children,
  data: member
}) => {
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);
  const isTablet: boolean = useBreakpoint() <= 2;
  const activeRoute: RouteType = useTopLevelRoute(member?.community?.urlName);

  if (isTablet) return null;

  const isActive: boolean =
    activeRoute === 'membership' || activeRoute === 'profile';

  const onClick = (): void => {
    showPanel({ id: PanelType.PROFILE });
  };

  const css: string = cx('o-nav-profile', {
    'o-nav-profile--active': isActive
  });

  return (
    <div className="o-nav-profile-ctr">
      <button
        className={css}
        id={PanelType.PROFILE}
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default SidebarProfileContainer;
