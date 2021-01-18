import React from 'react';

import Row from '@containers/Row/Row';
import FormContinueButton from '@organisms/Form/FormContinueButton';
import PaymentFormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormItem from '@organisms/Form/FormItem';
import FormPage from '@organisms/Form/FormPage';
import ModalContentContainer from '@organisms/Modal/ModalContentContainer';
import { useStoreState } from '@store/Store';
import { CardElement, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
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

const PaymentCardForm: React.FC = () => {
  const last4 = useStoreState(({ db }) => db.member.paymentMethod?.last4);
  const type = PaymentStore.useStoreState((store) => store.type);

  // Return null if the card isn't changing AND either the membership is free
  // OR there is already a card on file.
  if (last4 && type !== 'UPDATE_PAYMENT_METHOD') return null;

  return (
    <ModalContentContainer>
      <FormItem
        required
        page="CARD_FORM"
        title="Name on Card"
        type="SHORT_TEXT"
      />

      <FormItem required value page="CARD_FORM" title="Credit or Debit Card">
        <CardElement options={options} />
      </FormItem>

      <FormItem
        required
        page="CARD_FORM"
        title="Billing Address"
        type="SHORT_TEXT"
      />

      <Row spaceBetween className="mo-payment-billing-ctr">
        <FormItem
          required
          page="CARD_FORM"
          placeholder="Los Angeles"
          title="City"
          type="SHORT_TEXT"
        />

        <FormItem
          required
          page="CARD_FORM"
          placeholder="CA"
          title="State"
          type="SHORT_TEXT"
        />

        <FormItem
          required
          page="CARD_FORM"
          placeholder="00000"
          title="Zip Code"
          type="SHORT_TEXT"
        />
      </Row>
    </ModalContentContainer>
  );
};

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
