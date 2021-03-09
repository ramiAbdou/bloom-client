import day from 'dayjs';
import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import { useStoreState } from '@store/Store';
import useInitScheduledPayment from './useInitScheduledPayment';

const MembershipRenewalCard: React.FC = () => {
  const renewalDate: string = useStoreState(({ db }) => {
    return day(db.memberIntegrations?.renewalDate).format('M/D/YY');
  });

  const { loading } = useInitScheduledPayment();

  return (
    <GrayCard
      className="mb-md"
      label="Membership Renews On"
      loading={loading}
      value={renewalDate}
    />
  );
};

export default MembershipRenewalCard;
