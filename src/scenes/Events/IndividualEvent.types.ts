import { IdProps } from '@util/constants';

export interface IndividualEventTableRowProps extends IdProps {
  fullName: string;
  email: string;
  joinedAt?: string;
  rsvpdAt?: string;
  watched?: boolean;
}

export type IndividualEventTableFilter =
  | 'ATTENDED'
  | 'NO_SHOW'
  | 'RSVPD'
  | 'WATCHED';
