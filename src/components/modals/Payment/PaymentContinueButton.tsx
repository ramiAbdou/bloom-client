import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import Form from '@organisms/Form/Form.store';
import SubmitButton from '@organisms/Form/FormSubmitButton';
import { useStripe } from '@stripe/react-stripe-js';

const PaymentContinueButton: React.FC = () => {
  const isLoading = Form.useStoreState((store) => store.isLoading);
  const stripe = useStripe();

  return (
    <SubmitButton
      fill
      className="mo-payment-button mo-payment-button--continue"
      disabled={!stripe}
      loading={isLoading}
      loadingText="Continuing..."
    >
      Continue
      <IoChevronForwardOutline />
    </SubmitButton>
  );
};

export default PaymentContinueButton;
