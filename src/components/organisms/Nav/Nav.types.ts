import { OnClickProps, RouteType } from '@constants';

export interface LinkOptions extends OnClickProps {
  Icon: React.FC;
  to?: RouteType;
  title: string;
}
