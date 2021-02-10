import deline from 'deline';
import React from 'react';

import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import FormCreditCard from '@organisms/Form/FormCreditCard';
import PaymentFormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryPage from '@organisms/Story/StoryPage';
import { useStoreState } from '@store/Store';
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

      <Row spaceBetween align="baseline" className="mo-payment-billing-ctr">
        <FormShortText id="CITY" placeholder="Los Angeles" title="City" />
        <FormShortText id="STATE" placeholder="CA" title="State" />
        <FormShortText id="ZIP_CODE" placeholder="00000" title="Zip Code" />
      </Row>

      <PaymentFormErrorMessage />
      <PaymentCardButton />
    </Form>
  );
};

const PaymentCard: React.FC = () => {
  const isCardOnFile = useStoreState(({ db }) => !!db.member.paymentMethod);
  const type = PaymentStore.useStoreState((store) => store.type);

  const description: string = isCardOnFile
    ? deline`
      An update to your current subscription will be reflected on your
      next billing date.
    `
    : deline`
      We don’t have your payment information yet. Please enter your
      information to continue to the next step.
    `;

  return (
    <StoryPage
      description={description}
      id="CARD_FORM"
      show={type === 'UPDATE_PAYMENT_METHOD' || !isCardOnFile}
      title="Update Payment Method"
    >
      <PaymentCardForm />
    </StoryPage>
  );
};

export default PaymentCard;
