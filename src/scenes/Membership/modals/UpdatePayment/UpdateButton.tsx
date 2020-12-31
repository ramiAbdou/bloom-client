import React from 'react';
import { IoLockClosed } from 'react-icons/io5';

import SubmitButton from '@components/Form/components/SubmitButton';
import Form from '@components/Form/Form.store';
import { useStripe } from '@stripe/react-stripe-js';

const UpdatePaymentButton = () => {
  const isLoading = Form.useStoreState((store) => store.isLoading);
  const stripe = useStripe();

  // Use a traditional checkout form.
  return (
    <SubmitButton
      fill
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
