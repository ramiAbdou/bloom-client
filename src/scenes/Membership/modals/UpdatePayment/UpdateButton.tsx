import React from 'react';
import { IoLockClosed } from 'react-icons/io5';

import SubmitButton from '@organisms/Form/SubmitButton';
import Form from '@organisms/Form/Form.store';
import { useStripe } from '@stripe/react-stripe-js';

const UpdatePaymentButton = () => {
  const isLoading = Form.useStoreState((store) => store.isLoading);
  const stripe = useStripe();

  // Use a traditional checkout form.
  return (
    <SubmitButton
      fill
      className="c-payment-button"
      disabled={!stripe}
      loading={isLoading}
      loadingText="Updating..."
    >
      <IoLockClosed />
      Update Card
    </SubmitButton>
  );
};

export default UpdatePaymentButton;
