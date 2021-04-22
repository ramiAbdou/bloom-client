import { OnClickProps, RouteType } from '@util/constants';

export interface SidebarLinkOptions extends OnClickProps {
  Icon: React.FC;
  to?: RouteType;
  title: string;
}
