import React from 'react';

import { IMemberPlan } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import MembershipChangeCard from './MembershipChangeCard';

const MembershipChangeList: React.FC = () => {
  const types: IMemberPlan[] = useStoreState(({ db }) => {
    return db.community.plans.map(
      (planId: string) => db.byMemberPlanId[planId]
    );
  });

  return (
    <ul className="s-membership-card-ctr">
      {types.map((type: IMemberPlan) => (
        <MembershipChangeCard key={type.id} {...type} />
      ))}
    </ul>
  );
};

export default MembershipChangeList;
