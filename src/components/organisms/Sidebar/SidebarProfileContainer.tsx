import React from 'react';

import useTopLevelRoute from '@core/hooks/useTopLevelRoute';
import { useStoreActions } from '@core/store/Store';
import useBreakpoint from '@hooks/useBreakpoint';
import { PanelType, RouteType } from '@util/constants';
import { cx } from '@util/util';

const SidebarProfileContainer: React.FC = ({ children }) => {
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);
  const isTablet: boolean = useBreakpoint() <= 2;
  const activeRoute: RouteType = useTopLevelRoute();

  if (isTablet) return null;

  const isActive: boolean = ['membership', 'profile'].includes(activeRoute);

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
