import React from 'react';

import { useStoreState } from '@store/Store';
import MembershipChangeCard from './MembershipChangeCard';

const MembershipChangeList: React.FC = () => {
  const memberTypeIds: string[] = useStoreState(
    ({ db }) => db.community.memberTypes
  );

  return (
    <ul className="s-membership-card-ctr">
      {memberTypeIds?.map((memberTypeId: string) => (
        <MembershipChangeCard key={memberTypeId} id={memberTypeId} />
      ))}
    </ul>
  );
};

export default MembershipChangeList;
