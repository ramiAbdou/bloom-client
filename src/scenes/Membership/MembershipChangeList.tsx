import React from 'react';

import { IMemberType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import MembershipChangeCard from './MembershipChangeCard';

const MembershipChangeList: React.FC = () => {
  const types: IMemberType[] = useStoreState(({ db }) => {
    return db.community.types.map((typeId: string) => db.byTypeId[typeId]);
  });

  return (
    <ul className="s-membership-card-ctr">
      {types.map((type: IMemberType) => (
        <MembershipChangeCard key={type.id} {...type} />
      ))}
    </ul>
  );
};

export default MembershipChangeList;
