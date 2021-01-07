import React from 'react';

import { IMemberType } from '@store/entities';
import { useStoreState } from '@store/Store';
import PlanCard from './ChangePlanCard';
import MembershipCardContainer from './MembershipCardContainer';

const PlanContainer = () => {
  const types: IMemberType[] = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return db.community.types.map((typeId: string) => byTypeId[typeId]);
  });

  return (
    <MembershipCardContainer>
      {types.map((type: IMemberType) => (
        <PlanCard key={type.id} {...type} />
      ))}
    </MembershipCardContainer>
  );
};

export default PlanContainer;
