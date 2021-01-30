import React from 'react';

import Row from '@containers/Row/Row';
import FormContinueButton from '@organisms/Form/FormContinueButton';
import PaymentFormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormItem from '@organisms/Form/FormItem';
import FormPage from '@organisms/Form/FormPage';
import { CardElement, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import FormShortText from '../../organisms/Form/FormShortText';
import PaymentStore from './Payment.store';
import PaymentFinishButton from './PaymentFinishButton';
import useUpdatePaymentMethod from './useUpdatePaymentMethod';

const options: StripeCardElementOptions = {
  classes: {
    base: 'c-misc-input',
    empty: 'c-misc-input',
    focus: 'c-misc-input--focus',
    invalid: 'c-misc-input--error'
  },
  hidePostalCode: true,
  iconStyle: 'solid',
  style: { base: { fontFamily: 'Muli', fontSize: '15px', fontWeight: '700' } }
};

const PaymentCardForm: React.FC = () => (
  <>
    <FormShortText title="Name on Card" />

    <FormItem value title="Credit or Debit Card">
      <CardElement options={options} />
    </FormItem>

    <FormShortText title="Billing Address" />

    <Row spaceBetween className="mo-payment-billing-ctr">
      <FormShortText placeholder="Los Angeles" title="City" />
      <FormShortText placeholder="CA" title="State" />
      <FormShortText placeholder="00000" title="Zip Code" />
    </Row>
  </>
);

const PaymentCardContinueButton: React.FC = () => {
  const type = PaymentStore.useStoreState((store) => store.type);

  const updatePaymentMethod = useUpdatePaymentMethod();
  const stripe = useStripe();

  if (type === 'UPDATE_PAYMENT_METHOD') return <PaymentFinishButton />;

  return (
    <FormContinueButton
      className="mo-payment-button mo-payment-button--continue"
      disabled={!stripe}
      loadingText="Continuing..."
      onContinue={updatePaymentMethod}
    >
      Continue
    </FormContinueButton>
  );
};

const PaymentCardScreen: React.FC = () => (
  <FormPage id="CARD_FORM">
    <PaymentCardForm />
    <PaymentFormErrorMessage />
    <PaymentCardContinueButton />
  </FormPage>
);

export default PaymentCardScreen;
