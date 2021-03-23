import React from 'react';

import { useStoreState } from '@store/Store';
import MembershipChangeCard from './MembershipChangeCard';

const MembershipChangeList: React.FC = () => {
  const planIds: string[] = useStoreState(({ db }) => db.community.plans);

  return (
    <ul className="s-membership-card-ctr">
      {planIds?.map((planId: string) => (
        <MembershipChangeCard key={planId} id={planId} />
      ))}
    </ul>
  );
};

export default MembershipChangeList;
