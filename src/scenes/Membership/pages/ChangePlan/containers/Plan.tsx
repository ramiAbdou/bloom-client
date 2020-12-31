import React from 'react';

import { IMemberType } from '@store/entities';
import { useStoreState } from '@store/Store';
import PlanCard from '../components/Plan';

const PlanContainer = () => {
  const types: IMemberType[] = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return db.community.types.map((typeId: string) => byTypeId[typeId]);
  });

  return (
    <div className="s-membership-plans-card-ctr">
      {types.map((type: IMemberType) => (
        <PlanCard key={type.id} {...type} />
      ))}
    </div>
  );
};

export default PlanContainer;
