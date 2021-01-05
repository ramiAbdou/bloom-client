import React from 'react';

import FormItem from '@organisms/Form/FormItem';
import { useStoreState } from '@store/Store';
import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { IsCardChangingProps } from '../Payment.types';

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

interface CardInfoContainerProps extends IsCardChangingProps {
  isFree?: boolean;
}

const CardInfoContainer = ({
  isCardChanging,
  isFree
}: CardInfoContainerProps) => {
  const last4 = useStoreState(({ db }) => db.member.paymentMethod?.last4);

  // Return null if the card isn't changing AND either the membership is free
  // OR there is already a card on file.
  if (!isCardChanging && (isFree || !!last4)) return null;

  return (
    <>
      <FormItem required title="Name on Card" type="SHORT_TEXT" />

      <FormItem required value title="Credit or Debit Card">
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
};

export default CardInfoContainer;
