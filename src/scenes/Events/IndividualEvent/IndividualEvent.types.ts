import { IdProps } from '@constants';

export interface IndividualEventTableRowProps extends IdProps {
  fullName: string;
  email: string;
  joinedAt?: string;
  rsvpdAt?: string;
  userId?: string;
  watched?: string;
}
