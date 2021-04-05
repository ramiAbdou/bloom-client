import React from 'react';
import { IoLockClosed } from 'react-icons/io5';

import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreState } from '@store/Store';
import { take } from '@util/util';
import PaymentStore from './Payment.store';
import { PaymentModalType } from './Payment.types';

const PaymentFinishButton: React.FC = () => {
  const type: PaymentModalType = PaymentStore.useStoreState(
    (state) => state.type
  );

  const selectedMemberTypeId: string = PaymentStore.useStoreState(
    (state) => state.selectedMemberTypeId
  );

  const changeAmount: number = PaymentStore.useStoreState(
    (state) => state.changeAmount
  );

  const amount: number = useStoreState(
    ({ db }) => changeAmount ?? db.byMemberTypeId[selectedMemberTypeId]?.amount
  );

  const isLessThanCurrentType: boolean = useStoreState(({ db }) => {
    const selectedAmount: number =
      db.byMemberTypeId[selectedMemberTypeId]?.amount;

    const currentAmount: number =
      db.byMemberTypeId[db.member.memberType]?.amount;

    return (
      // db.member.isDuesActive &&
      !!db.byMemberTypeId[selectedMemberTypeId]?.amount &&
      selectedAmount < currentAmount
    );
  });

  const buttonTitle: string = take([
    [type === PaymentModalType.UPDATE_PAYMENT_METHOD, 'Update Payment Method'],
    [!amount, 'Change Membership'],
    [true, `Finish and Pay $${amount}`]
  ]);

  const buttonLoadingText: string = take([
    [type === PaymentModalType.UPDATE_PAYMENT_METHOD, 'Saving...'],
    [!amount || isLessThanCurrentType, 'Changing...'],
    [true, 'Paying...']
  ]);

  // Use a traditional checkout form.
  return (
    <FormSubmitButton
      className="mo-payment-button"
      loadingText={buttonLoadingText}
    >
      {(type === PaymentModalType.UPDATE_PAYMENT_METHOD || !!amount) && (
        <IoLockClosed />
      )}
      {buttonTitle}
    </FormSubmitButton>
  );
};

export default PaymentFinishButton;
