import React from 'react';

import FormErrorMessage from '@components/Form/components/ErrorMessage';
import FormItem from '@components/Form/components/Item';
import Form, { FormProps } from '@components/Form/Form';
import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import PayButton from './PayButton';

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

interface PaymentFormProps extends Pick<FormProps, 'onSubmit'> {
  amount: number;
}

const PaymentForm = ({ amount, onSubmit }: PaymentFormProps) => {
  return (
    <Form className="c-payment" onSubmit={onSubmit}>
      {!!amount && (
        <>
          <FormItem required title="Name on Card" type="SHORT_TEXT" />

          <FormItem required title="Credit or Debit Card">
            <CardElement options={options} />
          </FormItem>

          <FormItem required title="Billing Address" type="SHORT_TEXT" />

          <div className="c-payment-billing-ctr">
            <FormItem
              required
              placeholder="Los Angeles"
              title="City"
              type="SHORT_TEXT"
            />

            <FormItem
              required
              placeholder="CA"
              title="State"
              type="SHORT_TEXT"
            />

            <FormItem
              required
              placeholder="00000"
              title="Zip Code"
              type="SHORT_TEXT"
            />
          </div>
        </>
      )}

      <FormErrorMessage />
      <PayButton amount={amount} />
    </Form>
  );
};

export default PaymentForm;
