import deline from 'deline';
import React from 'react';

import ConfirmationScreen from '@containers/ConfirmationScreen/ConfirmationScreen';
import { useStoreActions } from '@store/Store';
import { takeFirst } from '@util/util';
import PaymentStore from './Payment.store';

const PaymentConfirmation: React.FC = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const screen = PaymentStore.useStoreState((store) => store.screen);
  const type = PaymentStore.useStoreState((store) => store.type);

  if (screen !== 'CONFIRMATION') return null;

  const confirmationTitle = takeFirst([
    [type === 'PAY_DUES', 'Dues Payment Successful'],
    [type === 'UPDATE_PAYMENT_METHOD', 'Payment Method Updated'],
    [type === 'CHANGE_MEMBERSHIP', 'Membership Plan Changed']
  ]);

  const confirmationDescription = takeFirst([
    [
      type === 'UPDATE_PAYMENT_METHOD',
      deline`
        Your card on file has been updated, and you may now use this card to pay
        dues. We sent you a confirmation email!
      `
    ],
    [
      type === 'PAY_DUES',
      deline`
        Your dues have been paid successfully! Please check your email
        for a confirmation receipt.
      `
    ],
    [
      type === 'CHANGE_MEMBERSHIP',
      deline`
        Your membership has successfully been changed. Please check your email
        for a confirmation.
      `
    ]
  ]);

  const onClose = () => closeModal();

  return (
    <ConfirmationScreen closeButton title={confirmationTitle} onClose={onClose}>
      <p>{confirmationDescription}</p>
    </ConfirmationScreen>
  );
};

export default PaymentConfirmation;
