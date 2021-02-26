import day from 'dayjs';
import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import useInitScheduledPayment from './useInitScheduledPayment';

const MembershipRenewsCard: React.FC = () => {
  const { data } = useInitScheduledPayment();
  const date: string = day(data?.nextPaymentDate).format('M/D/YY');

  return (
    <GrayCard
      className="mb-md"
      label="Membership Renews On"
      show={!!data?.amount}
      value={date}
    />
  );
};

export default MembershipRenewsCard;
