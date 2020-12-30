import React from 'react';

import FormItem from '@components/Form/components/Item';
import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';

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

export default () => (
  <>
    <FormItem required title="Name on Card" type="SHORT_TEXT" />

    <FormItem required title="Credit or Debit Card">
      <CardElement options={options} />
    </FormItem>

    <FormItem required title="Billing Address" type="SHORT_TEXT" />

    <div className="s-actions-dues-billing-ctr">
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
    </div>
  </>
);
