import React from 'react';

import { IMemberType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import MembershipChangeCard from './MembershipChangeCard';

const MembershipChangeContainer: React.FC = () => {
  const types: IMemberType[] = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return db.community.types.map((typeId: string) => byTypeId[typeId]);
  });

  return (
    <div className="s-membership-card-ctr">
      {types.map((type: IMemberType) => (
        <MembershipChangeCard key={type.id} {...type} />
      ))}
    </div>
  );
};

export default MembershipChangeContainer;
