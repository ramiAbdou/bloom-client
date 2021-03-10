import { Action } from 'easy-peasy';

import { OnClickProps, RouteType } from '@util/constants';

export interface LinkOptions extends OnClickProps {
  Icon: React.FC;
  to?: RouteType;
  title: string;
}

// ## NAV MODEL

export interface NavModel {
  isOpen: boolean;
  setIsOpen: Action<NavModel, boolean>;
}
