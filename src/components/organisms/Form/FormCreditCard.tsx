import React from 'react';

import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { FormItemData } from './Form.types';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

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

const FormCreditCard: React.FC<FormItemData> = (args) => {
  useInitFormItem(args);
  return (
    <FormItemContainer
      {...args}
      value
      category="CREDIT_OR_DEBIT_CARD"
      title="Credit or Debit Card"
    >
      <CardElement options={options} />
    </FormItemContainer>
  );
};

export default FormCreditCard;
