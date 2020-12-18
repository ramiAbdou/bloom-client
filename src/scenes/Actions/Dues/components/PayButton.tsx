import React from 'react';

import PrimaryButton from '@components/Button/PrimaryButton';
import { LoadingProps } from '@constants';
import { useStoreState } from '@store/Store';
import { useStripe } from '@stripe/react-stripe-js';
import Dues from '../Dues.store';

export default (props: LoadingProps) => {
  const memberTypeId = Dues.useStoreState((store) => store.memberTypeId);

  const amount: number = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[memberTypeId]?.amount;
  });

  const stripe = useStripe();

  if (amount === null || amount === undefined) return null;

  // Use a traditional checkout form.
  return (
    <PrimaryButton
      large
      submit
      disabled={!stripe}
      loadingText="Paying..."
      title={`Pay $${amount}`}
      {...props}
    />
  );
};
