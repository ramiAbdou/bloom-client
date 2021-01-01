import React from 'react';
import { IoLockClosed } from 'react-icons/io5';

import SubmitButton from '@components/Form/components/SubmitButton';
import Form from '@components/Form/Form.store';
import { useStripe } from '@stripe/react-stripe-js';

type PayButtonProps = { amount: number };

const PayButton = ({ amount }: PayButtonProps) => {
  const isLoading = Form.useStoreState((store) => store.isLoading);
  const stripe = useStripe();

  if (amount === null || amount === undefined) return null;

  const isFree = amount === 0;

  // Use a traditional checkout form.
  return (
    <SubmitButton
      fill
      className="c-payment-button"
      disabled={!stripe}
      loading={isLoading}
      loadingText="Paying..."
    >
      {!isFree && <IoLockClosed />}
      {isFree ? 'Change Membership' : `Finish and Pay $${amount}`}
    </SubmitButton>
  );
};

export default PayButton;