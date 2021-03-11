import React from 'react';
import { IoLockClosed } from 'react-icons/io5';

import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreState } from '@store/Store';
import PaymentStore from './Payment.store';

const PaymentFinishButton: React.FC = () => {
  const type = PaymentStore.useStoreState((state) => state.type);

  const selectedPlanId = PaymentStore.useStoreState(
    (state) => state.selectedPlanId
  );

  const changeAmount = PaymentStore.useStoreState(
    (state) => state.changeAmount
  );

  const amount: number = useStoreState(({ db }) => {
    return changeAmount ?? db.byMemberPlanId[selectedPlanId]?.amount;
  });

  const isLessThanCurrentType = useStoreState(({ db }) => {
    const selectedAmount: number = db.byMemberPlanId[selectedPlanId]?.amount;
    const currentAmount: number = db.byMemberPlanId[db.member.plan]?.amount;

    return (
      db.member.isDuesActive &&
      !db.byMemberPlanId[selectedPlanId]?.isFree &&
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
