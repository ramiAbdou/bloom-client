import React from 'react';
import { IoLockClosed } from 'react-icons/io5';

import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreState } from '@store/Store';
import PaymentStore from './Payment.store';

const PaymentFinishButton: React.FC = () => {
  const type = PaymentStore.useStoreState((s) => s.type);
  const selectedTypeId = PaymentStore.useStoreState((s) => s.selectedTypeId);
  const changeAmount = PaymentStore.useStoreState((s) => s.changeAmount);

  const amount: number = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return changeAmount ?? byId[selectedTypeId]?.amount / 100;
  });

  const isLessThanCurrentType = useStoreState(({ db }) => {
    const { byId } = db.entities.types;

    const selectedAmount: number = byId[selectedTypeId]?.amount;
    const currentAmount: number = byId[db.member.type]?.amount;

    return (
      db.member.duesStatus === 'Active' &&
      !byId[selectedTypeId]?.isFree &&
      selectedAmount < currentAmount
    );
  });

  const buttonTitle =
    (type === 'UPDATE_PAYMENT_METHOD' && 'Update Payment Method') ||
    (!amount && 'Change Membership') ||
    `Finish and Pay $${amount}`;

  const buttonLoadingText =
    (type === 'UPDATE_PAYMENT_METHOD' && 'Saving...') ||
    ((!amount || isLessThanCurrentType) && 'Changing...') ||
    `Paying...`;

  // Use a traditional checkout form.
  return (
    <FormSubmitButton
      className="mo-payment-button"
      loadingText={buttonLoadingText}
    >
      {(type === 'UPDATE_PAYMENT_METHOD' || !!amount) && <IoLockClosed />}
      {buttonTitle}
    </FormSubmitButton>
  );
};

export default PaymentFinishButton;
