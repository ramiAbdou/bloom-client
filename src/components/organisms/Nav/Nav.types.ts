import { OnClickProps, RouteType } from '@util/constants';

export interface LinkOptions extends OnClickProps {
  Icon: React.FC;
  to?: RouteType;
  title: string;
}
