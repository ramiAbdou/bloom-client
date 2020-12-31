import React from 'react';

import FinishButton from '@components/Payment/FinishButton';
import { useStoreState } from '@store/Store';
import ChangePlan from '../../../pages/ChangePlan/ChangePlan.store';

const PayButton = () => {
  const selectedTypeId = ChangePlan.useStoreState(
    (store) => store.selectedTypeId
  );

  const amount: number = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId]?.amount / 100;
  });

  if (amount === null || amount === undefined) return null;

  // Use a traditional checkout form.
  return <FinishButton amount={amount} />;
};

export default PayButton;
