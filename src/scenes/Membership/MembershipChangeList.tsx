import React from 'react';

import { useStoreState } from '@store/Store';
import MembershipChangeCard from './MembershipChangeCard';

const MembershipChangeList: React.FC = () => {
  const planIds: string[] = useStoreState(({ db }) => {
    return db.community.plans;
  });

  return (
    <ul className="s-membership-card-ctr">
      {planIds?.map((planId: string) => {
        return <MembershipChangeCard key={planId} id={planId} />;
      })}
    </ul>
  );
};

export default MembershipChangeList;
