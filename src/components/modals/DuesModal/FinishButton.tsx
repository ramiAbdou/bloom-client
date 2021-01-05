import React from 'react';

import FinishButton from '@organisms/Payment/components/FinishButton';
import { useStoreState } from '@store/Store';
import Dues from './Dues.store';

const FinishDuesButton = () => {
  const selectedTypeId = Dues.useStoreState((store) => store.selectedTypeId);

  const amount: number = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId]?.amount / 100;
  });

  if (amount === null || amount === undefined) return null;
  return <FinishButton amount={amount} />;
};

export default FinishDuesButton;
