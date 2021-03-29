import React from 'react';

import Row from '@containers/Row/Row';
import { PaymentModalType } from '@modals/Payment/Payment.types';
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
import useUpdateStripePaymentMethodId from './useUpdateStripePaymentMethodId';

const PaymentCardButton: React.FC = () => {
  const modalType = PaymentStore.useStoreState((state) => state.type);
  const stripe = useStripe();

  if (modalType === PaymentModalType.UPDATE_PAYMENT_METHOD) {
    return <PaymentFinishButton />;
  }

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
  const updateStripePaymentMethodId = useUpdateStripePaymentMethodId();

  return (
    <Form onSubmit={updateStripePaymentMethodId}>
      <FormShortText id="NAME_ON_CARD" title="Name on Card" />
      <FormCreditCard />
      <FormShortText id="BILLING_ADDRESS" title="Billing Address" />

      <Row
        align="baseline"
        className="mo-payment-billing-ctr"
        justify="sb"
        spacing="xs"
      >
        <FormShortText id="CITY" placeholder="Los Angeles" title="City" />
        <FormShortText id="STATE" placeholder="CA" title="State" />
        <FormShortText id="ZIP_CODE" placeholder="00000" title="Zip Code" />
      </Row>

      <PaymentFormErrorMessage />
      <PaymentCardButton />
    </Form>
  );
};

const PaymentCardPage: React.FC = () => {
  const isCardOnFile: boolean = useStoreState(
    ({ db }) => !!db.memberIntegrations.paymentMethod
  );

  const modalType = PaymentStore.useStoreState((state) => state.type);

  const description: string = isCardOnFile
    ? 'An update to your current subscription will be reflected on your next billing date.'
    : 'We don’t have your payment information yet. Please enter your information to continue to the next step.';

  return (
    <StoryPage
      description={description}
      id="CARD_FORM"
      show={
        modalType === PaymentModalType.UPDATE_PAYMENT_METHOD || !isCardOnFile
      }
      title="Update Payment Method"
    >
      <PaymentCardForm />
    </StoryPage>
  );
};

export default PaymentCardPage;
