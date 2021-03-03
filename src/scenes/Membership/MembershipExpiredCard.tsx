import day from 'dayjs';
import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import useInitScheduledPayment from './useInitScheduledPayment';

const MembershipExpiredCard: React.FC = () => {
  const { data } = useInitScheduledPayment();

  const date: string = day(data?.nextPaymentDate).format('M/D/YY');

  return (
    <GrayCard
      label="Membership Expired On"
      // show={!!data?.amount}
      value={date}
    />
  );
};

export default MembershipExpiredCard;
