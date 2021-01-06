import deline from 'deline';
import React from 'react';

import LoadingHeader from '@molecules/LoadingHeader/LoadingHeader';
import Loading from '@store/Loading.store';
import { takeFirst } from '@util/util';
import PaymentStore from './Payment.store';

const PaymentHeaderDescription: React.FC = () => {
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

const PaymentHeader: React.FC = () => {
  const loading = Loading.useStoreState((store) => store.loading);
  const type = PaymentStore.useStoreState((store) => store.type);

  const title = takeFirst([
    [type === 'CHANGE_PLAN', 'Change Membership Plan'],
    [type === 'PAY_DUES', 'Pay Dues'],
    [type === 'UPDATE_PAYMENT_METHOD', 'Update Payment Method']
  ]);

  return (
    <>
      <LoadingHeader loading={loading} title={title} />
      <PaymentHeaderDescription />
    </>
  );
};

export default PaymentHeader;
