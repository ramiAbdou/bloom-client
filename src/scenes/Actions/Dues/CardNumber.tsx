import React from 'react';

import { CardNumberElement } from '@stripe/react-stripe-js';
import { StripeCardNumberElementOptions } from '@stripe/stripe-js';

const options: StripeCardNumberElementOptions = {
  classes: {
    base: 'c-misc-input',
    empty: 'c-misc-input',
    focus: 'c-misc-input--focus'
  },
  iconStyle: 'solid',
  showIcon: true
};

// const classes = { base: 'c-misc-input' };

export default () => {
  return <CardNumberElement options={options} />;
};
