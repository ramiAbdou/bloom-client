import { Action } from 'easy-peasy';

import { OnClickProps, RouteType } from '@util/constants';

export interface SidebarLinkOptions extends OnClickProps {
  Icon: React.FC;
  to?: RouteType;
  title: string;
}

// ## NAV MODEL

export interface SidebarModel {
  isOpen: boolean;
  setIsOpen: Action<SidebarModel, boolean>;
}
