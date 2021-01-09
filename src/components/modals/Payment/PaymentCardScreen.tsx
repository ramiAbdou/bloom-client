import React from 'react';

import Row from '@containers/Row';
import Form from '@organisms/Form/Form';
import PaymentFormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormItem from '@organisms/Form/FormItem';
import ModalContentContainer from '@organisms/Modal/ModalContentContainer';
import { useStoreState } from '@store/Store';
import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import PaymentStore from './Payment.store';
import PaymentContinueButton from './PaymentContinueButton';
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
    <>
      <FormItem required title="Name on Card" type="SHORT_TEXT" />

      <FormItem required value title="Credit or Debit Card">
        <CardElement options={options} />
      </FormItem>

      <FormItem required title="Billing Address" type="SHORT_TEXT" />

      <Row spaceBetween className="mo-payment-billing-ctr">
        <FormItem
          required
          placeholder="Los Angeles"
          title="City"
          type="SHORT_TEXT"
        />

        <FormItem required placeholder="CA" title="State" type="SHORT_TEXT" />

        <FormItem
          required
          placeholder="00000"
          title="Zip Code"
          type="SHORT_TEXT"
        />
      </Row>
    </>
  );
};

const PaymentCardSubmitButton: React.FC = () => {
  const isUpdatingPaymentMethod =
    PaymentStore.useStoreState((store) => store.type) ===
    'UPDATE_PAYMENT_METHOD';

  if (isUpdatingPaymentMethod) return <PaymentFinishButton />;
  return <PaymentContinueButton />;
};

const PaymentCardScreen: React.FC = () => {
  const screen = PaymentStore.useStoreState((store) => store.screen);

  const updatePaymentMethod = useUpdatePaymentMethod();

  // Will be null if the Stripe object hasn't been loaded yet.
  if (screen !== 'CARD_FORM' || !updatePaymentMethod) return null;

  return (
    <Form className="mo-payment" onSubmit={updatePaymentMethod}>
      <ModalContentContainer>
        <PaymentCardForm />
      </ModalContentContainer>

      <PaymentFormErrorMessage />
      <PaymentCardSubmitButton />
    </Form>
  );
};

export default PaymentCardScreen;
