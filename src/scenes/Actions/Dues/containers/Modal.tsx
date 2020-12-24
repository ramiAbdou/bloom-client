import React from 'react';

import Form from '@components/Form/Form';
import Modal from '@components/Modal/Modal';
import { ChildrenProps, ModalType } from '@constants';
import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import useCreateSubscription from '../hooks/useCreateSubscription';

const options: StripeCardElementOptions = {
  classes: {
    base: 'c-misc-input',
    empty: 'c-misc-input',
    focus: 'c-misc-input--focus',
    invalid: 'c-misc-input--error'
  },
  iconStyle: 'solid',
  style: { base: { fontFamily: 'Muli', fontSize: '15px', fontWeight: '700' } }
};

export default function ModalContainer({ children }: ChildrenProps) {
  const createSubscription = useCreateSubscription();

  // Will be null if the Stripe object hasn't been loaded yet.
  if (!createSubscription) return null;

  return (
    <Modal locked id={ModalType.PAY_DUES}>
      <Form
        className="s-actions-dues"
        questions={[
          {
            placeholder: 'Name on Card',
            required: true,
            title: 'Name on Card',
            type: 'SHORT_TEXT'
          },
          {
            node: <CardElement options={options} />,
            required: true,
            title: 'Credit or Debit Card'
          }
        ]}
        onSubmit={createSubscription}
      >
        {children}
      </Form>
    </Modal>
  );
}
