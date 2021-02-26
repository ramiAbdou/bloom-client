import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@util/constants';
import { useStoreActions, useStoreState } from '@store/Store';

const MembershipPaymentMethodButton: React.FC = () => {
  const isCardOnFile: boolean = useStoreState(
    ({ db }) => !!db.member.paymentMethod
  );

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => {
    showModal({
      id: ModalType.UPDATE_PAYMENT_METHOD,
      metadata: { type: 'UPDATE_PAYMENT_METHOD' }
    });
  };

  return (
    <Button fill secondary onClick={onClick}>
      {isCardOnFile ? 'Update Payment Method' : 'Add Payment Method'}
    </Button>
  );
};

export default MembershipPaymentMethodButton;
