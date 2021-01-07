import React from 'react';
import { IoLockClosed } from 'react-icons/io5';

import Form from '@organisms/Form/Form.store';
import SubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreState } from '@store/Store';
import { useStripe } from '@stripe/react-stripe-js';
import { takeFirst } from '@util/util';
import PaymentStore from './Payment.store';

const PaymentFinishButton: React.FC = () => {
  const isUpdatingPaymentMethod =
    PaymentStore.useStoreState((store) => store.type) ===
    'UPDATE_PAYMENT_METHOD';

  const selectedTypeId = PaymentStore.useStoreState(
    (store) => store.selectedTypeId
  );

  const amount: number = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId]?.amount / 100;
  });

  const isLoading = Form.useStoreState((store) => store.isLoading);
  const stripe = useStripe();

  if (amount === null || amount === undefined) return null;

  const isFree = amount === 0;

  const buttonTitle = takeFirst([
    [isFree, 'Change Membership'],
    [isUpdatingPaymentMethod, 'Update Payment Method'],
    `Finish and Pay $${amount}`
  ]);

  const buttonLoadingText = takeFirst([
    [isFree, 'Changing...'],
    [isUpdatingPaymentMethod, 'Saving...'],
    `Paying...`
  ]);

  // Use a traditional checkout form.
  return (
    <SubmitButton
      fill
      className="mo-payment-button"
      disabled={!stripe}
      loading={isLoading}
      loadingText={buttonLoadingText}
    >
      {(isUpdatingPaymentMethod || !isFree) && <IoLockClosed />}
      {buttonTitle}
    </SubmitButton>
  );
};

export default PaymentFinishButton;
