import React from 'react';
import { IoLockClosed } from 'react-icons/io5';

import Form from '@organisms/Form/Form.store';
import SubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreState } from '@store/Store';
import { useStripe } from '@stripe/react-stripe-js';
import PaymentStore from './Payment.store';

const PaymentFinishButton: React.FC = () => {
  const selectedTypeId = PaymentStore.useStoreState(
    (store) => store.selectedTypeId
  );

  const amount: number = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId]?.amount / 100;
  });

  const isLoading = Form.useStoreState((store) => store.isLoading);
  const stripe = useStripe();

  if (amount === null || amount === undefined) return null;

  const isFree = amount === 0;

  // Use a traditional checkout form.
  return (
    <SubmitButton
      fill
      className="mo-payment-button"
      disabled={!stripe}
      loading={isLoading}
      loadingText="Paying..."
    >
      {!isFree && <IoLockClosed />}
      {isFree ? 'Change Membership' : `Finish and Pay $${amount}`}
    </SubmitButton>
  );
};

export default PaymentFinishButton;
