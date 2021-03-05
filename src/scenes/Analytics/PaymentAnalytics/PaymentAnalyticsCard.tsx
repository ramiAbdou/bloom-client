import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import { IMember, MemberStatus } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const PaymentAnalyticsPercentPaidCard: React.FC = () => {
  const numActiveMembers: number = useStoreState(({ db }) => {
    return db.community.members
      ?.map((memberId: string) => db.byMemberId[memberId])
      ?.filter((member: IMember) => member.status === MemberStatus.ACCEPTED)
      ?.filter((member: IMember) => member.isDuesActive)?.length;
  });

  const numTotalMembers: number = useStoreState(({ db }) => {
    return db.community.members
      ?.map((memberId: string) => db.byMemberId[memberId])
      ?.filter((member: IMember) => member.status === MemberStatus.ACCEPTED)
      ?.length;
  });

  // Equivalent of doing a loading check.
  if (!numTotalMembers) return null;

  const ratioOfPaidMembers: string = (
    (numActiveMembers / numTotalMembers) *
    100
  ).toFixed(1);

  return (
    <GrayCard
      label="Percent of Members Paid"
      value={`${ratioOfPaidMembers}%`}
    />
  );
};

export default PaymentAnalyticsPercentPaidCard;
