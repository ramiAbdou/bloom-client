import React from 'react';

import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import FormCreditCard from '@organisms/Form/FormCreditCard';
import PaymentFormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryPage from '@organisms/Story/StoryPage';
import { useStripe } from '@stripe/react-stripe-js';
import PaymentStore from './Payment.store';
import PaymentFinishButton from './PaymentFinishButton';
import useUpdatePaymentMethod from './useUpdatePaymentMethod';

const PaymentCardButton: React.FC = () => {
  const type = PaymentStore.useStoreState((store) => store.type);

  const stripe = useStripe();

  if (type === 'UPDATE_PAYMENT_METHOD') return <PaymentFinishButton />;

  return (
    <FormSubmitButton
      className="mo-payment-button mo-payment-button--continue"
      disabled={!stripe}
      loadingText="Continuing..."
    >
      Continue
    </FormSubmitButton>
  );
};

const PaymentCardForm: React.FC = () => {
  const updatePaymentMethod = useUpdatePaymentMethod();

  return (
    <Form onSubmit={updatePaymentMethod}>
      <FormShortText id="NAME_ON_CARD" title="Name on Card" />
      <FormCreditCard />
      <FormShortText id="BILLING_ADDRESS" title="Billing Address" />

      <Row spaceBetween className="mo-payment-billing-ctr">
        <FormShortText id="CITY" placeholder="Los Angeles" title="City" />
        <FormShortText id="STATE" placeholder="CA" title="State" />
        <FormShortText id="ZIP_CODE" placeholder="00000" title="Zip Code" />
      </Row>

      <PaymentFormErrorMessage />
      <PaymentCardButton />
    </Form>
  );
};

const PaymentCardScreen: React.FC = () => (
  <StoryPage id="CARD_FORM">
    <PaymentCardForm />
  </StoryPage>
);

export default PaymentCardScreen;
