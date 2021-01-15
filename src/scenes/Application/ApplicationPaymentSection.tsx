import React from 'react';

import Separator from '@atoms/Separator';
import Row from '@containers/Row/Row';
import FormItem from '@organisms/Form/FormItem';
import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import PaymentStripeProvider from '../../components/modals/Payment/PaymentStripeProvider';

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
  return (
    <PaymentStripeProvider>
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
    </PaymentStripeProvider>
  );
};

const ApplicationPaymentSection: React.FC = () => {
  return (
    <>
      <Separator margin={24} />

      <h2>Payment</h2>
      <p>
        You selected a paid plan. Please enter your card and billing information
        to continue. You will be able to review this information in the next
        step.
      </p>

      <PaymentCardForm />
    </>
  );
};

export default ApplicationPaymentSection;
