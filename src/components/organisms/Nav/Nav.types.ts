import { OnClickProps } from '@constants';

export interface LinkOptions extends OnClickProps {
  Icon: React.FC;
  to?: string;
  title: string;
}
