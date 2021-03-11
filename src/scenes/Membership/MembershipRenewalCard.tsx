import day from 'dayjs';
import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import { useStoreState } from '@store/Store';
import useInitMembershipRenewal from './useInitMembershipRenewal';

const MembershipRenewalCard: React.FC = () => {
  const renewalDate: string = useStoreState(({ db }) => {
    const date: string = db.memberIntegrations?.renewalDate;
    return date ? day(date).format('M/D/YY') : null;
  });

  const { loading } = useInitMembershipRenewal();

  return (
    <GrayCard
      className="mb-md--nlc"
      label="Membership Renews On"
      loading={loading}
      show={!!renewalDate}
      value={renewalDate}
    />
  );
};

export default MembershipRenewalCard;
