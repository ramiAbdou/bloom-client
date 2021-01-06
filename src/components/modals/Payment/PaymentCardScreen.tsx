import deline from 'deline';
import React from 'react';

import { takeFirst } from '@util/util';
import PaymentStore from './Payment.store';

const PaymentCardScreenDescription: React.FC = () => {
  const isUpdatingPaymentMethod =
    PaymentStore.useStoreState((store) => store.type) ===
    'UPDATE_PAYMENT_METHOD';

  const description = isUpdatingPaymentMethod
    ? deline`
      An update to your current subscription will be reflected on your next
      billing date.
    `
    : deline`
      We don’t have your payment information yet. Please enter your information
      to continue to the next step.
    `;

  return <p>{description}</p>;
};

const PaymentCardScreenTitle: React.FC = () => {
  const type = PaymentStore.useStoreState((store) => store.type);

  const title = takeFirst([
    [type === 'CHANGE_PLAN', 'Change Membership Plan'],
    [type === 'PAY_DUES', 'Pay Dues'],
    [type === 'UPDATE_PAYMENT_METHOD', 'Update Payment Method']
  ]);

  return <h1>{title}</h1>;
};

const PaymentCardScreen: React.FC = () => {
  return (
    <div>
      <PaymentCardScreenTitle />
      <PaymentCardScreenDescription />
    </div>
  );
};

export default PaymentCardScreen;
