import React from 'react';

import { ChildrenProps } from '@constants';
import { useStoreState } from '@store/Store';
import Dues, { duesModel } from '../Dues.store';
import useFetchDuesInformation from '../hooks/useFetchDuesInformation';

export default function DuesContainer({ children }: ChildrenProps) {
  const memberTypeId: string = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[db.member.type]?.id;
  });

  useFetchDuesInformation();

  if (!memberTypeId) return null;

  return (
    <Dues.Provider
      runtimeModel={{ ...duesModel, selectedTypeId: memberTypeId }}
    >
      {children}
    </Dues.Provider>
  );
}
