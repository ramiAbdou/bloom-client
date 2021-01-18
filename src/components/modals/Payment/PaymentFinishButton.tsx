import React from 'react';
import { IoLockClosed } from 'react-icons/io5';

import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import PaymentStore from './Payment.store';

const PaymentFinishButton: React.FC = () => {
  const type = PaymentStore.useStoreState((store) => store.type);

  const selectedTypeId = PaymentStore.useStoreState(
    (store) => store.selectedTypeId
  );

  const amount: number = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId]?.amount / 100;
  });

  const isLessThanCurrentType = useStoreState(({ db }) => {
    const { byId } = db.entities.types;

    const selectedAmount = byId[selectedTypeId]?.amount;
    const currentAmount = byId[db.member.type]?.amount;

    return (
      db.member.duesStatus === 'Active' &&
      !byId[selectedTypeId]?.isFree &&
      selectedAmount < currentAmount
    );
  });

  const buttonTitle = takeFirst([
    [type === 'UPDATE_PAYMENT_METHOD', 'Update Payment Method'],
    [!amount || isLessThanCurrentType, 'Change Membership'],
    `Finish and Pay $${amount}`
  ]);

  const buttonLoadingText = takeFirst([
    [type === 'UPDATE_PAYMENT_METHOD', 'Saving...'],
    [!amount, 'Changing...'],
    `Paying...`
  ]);

  // Use a traditional checkout form.
  return (
    <FormSubmitButton
      fill
      className="mo-payment-button"
      loadingText={buttonLoadingText}
    >
      {(type === 'UPDATE_PAYMENT_METHOD' || !!amount) && <IoLockClosed />}
      {buttonTitle}
    </FormSubmitButton>
  );
};

export default PaymentFinishButton;
