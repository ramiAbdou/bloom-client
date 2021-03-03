import { IdProps } from '@util/constants';

export interface IndividualEventTableRowProps extends IdProps {
  fullName: string;
  email: string;
  joinedAt?: string;
  rsvpdAt?: string;
  userId?: string;
  watched?: 'Yes' | 'No';
}
