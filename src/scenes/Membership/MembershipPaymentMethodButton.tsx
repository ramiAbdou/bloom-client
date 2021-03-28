import React from 'react';

import Button from '@atoms/Button/Button';
import { PaymentModalType } from '@modals/Payment/Payment.types';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';

const MembershipPaymentMethodButton: React.FC = () => {
  const isCardOnFile: boolean = useStoreState(({ db }) => {
    return !!db.memberIntegrations.paymentMethod;
  });

  const showModal = useStoreActions(({ modal }) => {
    return modal.showModal;
  });

  const onClick = () => {
    showModal({
      id: ModalType.UPDATE_PAYMENT_METHOD,
      metadata: { type: PaymentModalType.UPDATE_PAYMENT_METHOD }
    });
  };

  return (
    <Button fill secondary onClick={onClick}>
      {isCardOnFile ? 'Update Payment Method' : 'Add Payment Method'}
    </Button>
  );
};

export default MembershipPaymentMethodButton;
