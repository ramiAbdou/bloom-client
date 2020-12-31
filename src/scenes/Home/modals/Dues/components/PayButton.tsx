import React from 'react';
import { IoLockClosed } from 'react-icons/io5';

import SubmitButton from '@components/Form/components/SubmitButton';
import Form from '@components/Form/Form.store';
import { useStoreState } from '@store/Store';
import { useStripe } from '@stripe/react-stripe-js';
import Dues from '../Dues.store';

const PayButton = () => {
  const isLoading = Form.useStoreState((store) => store.isLoading);
  const selectedTypeId = Dues.useStoreState((store) => store.selectedTypeId);

  const amount: number = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId]?.amount / 100;
  });

  const stripe = useStripe();

  if (amount === null || amount === undefined) return null;

  // Use a traditional checkout form.
  return (
    <SubmitButton
      fill
      disabled={!stripe}
      loading={isLoading}
      loadingText="Paying..."
    >
      <IoLockClosed />
      {amount === 0 ? 'Change Membership' : `Finish and Pay $${amount}`}
    </SubmitButton>
  );
};

export default PayButton;
